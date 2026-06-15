/**
 * MLY_TEMP 冷库监控模拟 API 层
 * 模拟 4 个冷库分区的传感器数据，替换原有 Tauri invoke + NleCloud API 调用
 */

// ── 冷库分区定义 ──

export interface ColdZoneConfig {
  id: string
  name: string
  /** 目标温度（℃） */
  targetTemp: number
  /** 报警阈值（超过此值的偏差报警） */
  alarmThreshold: number
  /** 温度范围 [min, max] */
  tempRange: [number, number]
  /** 目标湿度（%RH） */
  targetHum: number
}

export interface ZoneStatus {
  id: string
  name: string
  temp: number
  hum: number
  targetTemp: number
  /** 设备在线状态 */
  online: boolean
  /** 状态: safe / warning / alarm */
  status: 'safe' | 'warning' | 'alarm'
  lastUpdate: string
}

export interface HistoryPoint {
  time: string
  temp: number
  hum: number
}

export interface DashboardData {
  zones: ZoneStatus[]
  history: HistoryPoint[]
  systemAlarm: boolean
  systemAlarmCount: number
  avgTemp: number
  avgHum: number
}

// ── 分区配置 ──

export const ZONE_CONFIGS: ColdZoneConfig[] = [
  {
    id: 'freezer',
    name: '冷冻库',
    targetTemp: -18,
    alarmThreshold: 3,
    tempRange: [-25, -5],
    targetHum: 60,
  },
  {
    id: 'chiller',
    name: '冷藏库',
    targetTemp: 4,
    alarmThreshold: 3,
    tempRange: [-2, 12],
    targetHum: 75,
  },
  {
    id: 'fresh',
    name: '保鲜库',
    targetTemp: 10,
    alarmThreshold: 4,
    tempRange: [4, 18],
    targetHum: 85,
  },
  {
    id: 'deep-freeze',
    name: '深冷库',
    targetTemp: -35,
    alarmThreshold: 5,
    tempRange: [-45, -20],
    targetHum: 50,
  },
]

// ── 模拟状态 ──

interface ZoneMutableState {
  temp: number
  hum: number
  online: boolean
  driftPhase: number // 用于产生周期性波动
}

const zoneStates: ZoneMutableState[] = ZONE_CONFIGS.map((cfg) => {
  // 初始温度围绕目标值轻微波动
  const initTemp = cfg.targetTemp + (Math.random() - 0.5) * cfg.alarmThreshold
  return {
    temp: parseFloat(initTemp.toFixed(1)),
    hum: cfg.targetHum + (Math.random() - 0.5) * 10,
    online: true,
    driftPhase: Math.random() * Math.PI * 2,
  }
})

const historyData: HistoryPoint[] = []

// ── 初始化历史数据（最近60个时间点，间隔10秒）──

function initHistory(): void {
  historyData.length = 0
  const now = Date.now()
  // 用当前各分区均温作为全局历史
  let avgT = zoneStates.reduce((s, z) => s + z.temp, 0) / zoneStates.length
  let avgH = zoneStates.reduce((s, z) => s + z.hum, 0) / zoneStates.length

  for (let i = 60; i >= 0; i--) {
    avgT += (Math.random() - 0.5) * 0.8
    avgH += (Math.random() - 0.5) * 2
    avgT = Math.max(-30, Math.min(20, avgT))
    avgH = Math.max(30, Math.min(95, avgH))

    historyData.push({
      time: new Date(now - i * 10000).toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      temp: parseFloat(avgT.toFixed(1)),
      hum: parseFloat(avgH.toFixed(1)),
    })
  }
}
initHistory()

// ── 模拟温湿度漂移 ──

function simulateDrift(): void {
  const now = new Date().toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  })

  let sumTemp = 0
  let sumHum = 0

  for (let i = 0; i < ZONE_CONFIGS.length; i++) {
    const cfg = ZONE_CONFIGS[i]
    const state = zoneStates[i]

    // 偶尔模拟离线（5%概率）
    if (Math.random() < 0.02) {
      state.online = !state.online
    }

    // 周期性波动 + 随机漂移
    state.driftPhase += 0.1 + Math.random() * 0.15
    const wave = Math.sin(state.driftPhase) * (cfg.alarmThreshold * 0.3)
    const noise = (Math.random() - 0.5) * 1.2

    let newTemp = state.temp + wave * 0.05 + noise * 0.1
    // 偶尔模拟报警事件：温度向目标外漂移（8%概率）
    if (Math.random() < 0.08) {
      const direction = newTemp > cfg.targetTemp ? 1 : -1
      newTemp += direction * 1.5
    }

    // 限幅在范围内
    newTemp = Math.max(cfg.tempRange[0], Math.min(cfg.tempRange[1], newTemp))
    state.temp = parseFloat(newTemp.toFixed(1))

    // 湿度跟随温度变化（反相关）
    let newHum = state.hum + (Math.random() - 0.5) * 2 - (newTemp - state.temp) * 0.3
    newHum = Math.max(20, Math.min(100, newHum))
    state.hum = parseFloat(newHum.toFixed(1))

    sumTemp += state.temp
    sumHum += state.hum
  }

  // 添加全局历史点（各分区平均）
  const avgTemp = parseFloat((sumTemp / ZONE_CONFIGS.length).toFixed(1))
  const avgHum = parseFloat((sumHum / ZONE_CONFIGS.length).toFixed(1))
  historyData.push({ time: now, temp: avgTemp, hum: avgHum })
  if (historyData.length > 120) historyData.splice(0, historyData.length - 120)
}

// ── 判断分区状态 ──

function calcZoneStatus(zoneIdx: number): 'safe' | 'warning' | 'alarm' {
  const cfg = ZONE_CONFIGS[zoneIdx]
  const state = zoneStates[zoneIdx]
  const deviation = Math.abs(state.temp - cfg.targetTemp)

  if (deviation >= cfg.alarmThreshold) return 'alarm'
  if (deviation >= cfg.alarmThreshold * 0.6) return 'warning'
  return 'safe'
}

// ── 公开 API ──

export function getDashboardData(): DashboardData {
  simulateDrift()

  const zones: ZoneStatus[] = ZONE_CONFIGS.map((cfg, i) => {
    const state = zoneStates[i]
    return {
      id: cfg.id,
      name: cfg.name,
      temp: state.temp,
      hum: state.hum,
      targetTemp: cfg.targetTemp,
      online: state.online,
      status: state.online ? calcZoneStatus(i) : 'alarm',
      lastUpdate: new Date().toISOString(),
    }
  })

  const systemAlarmCount = zones.filter(
    (z) => z.status === 'alarm' || !z.online,
  ).length

  const avgTemp = parseFloat(
    (zones.reduce((s, z) => s + z.temp, 0) / zones.length).toFixed(1),
  )
  const avgHum = parseFloat(
    (zones.reduce((s, z) => s + z.hum, 0) / zones.length).toFixed(1),
  )

  return {
    zones,
    history: [...historyData],
    systemAlarm: systemAlarmCount > 0,
    systemAlarmCount,
    avgTemp,
    avgHum,
  }
}

export function getZoneHistory(zoneId: string): HistoryPoint[] {
  // 简化：返回全局历史（实际 Demo 中按分区展示）
  return [...historyData]
}