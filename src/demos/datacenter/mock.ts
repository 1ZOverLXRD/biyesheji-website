/**
 * DataCenterComputerTEMP 模拟 API 层
 * 替换原有的 Tauri invoke() 调用，提供模拟传感器数据
 */

// ── 类型定义 ──

export interface SensorInfo {
  ApiTag: string
  Name: string
  Value: string
  Unit: string
  OperType: number // 0=传感器, >0=控制器
  DataType: number
}

export interface DeviceStatus {
  fan: boolean
  baojing: boolean
  temp: number
  hum: number
  lastUpdated: string
}

export interface ThresholdConfig {
  enabled: boolean
  tempMax: number
  hysteresis: number
}

export interface HistoryDataPoint {
  time: string
  value: number
}

// ── 模拟初始状态 ──

let currentTemp = 28.3
let currentHum = 62.5
let fanState = false
let alarmState = false
let thresholdEnabled = true
let thresholdTemp = 30.0
const hysteresis = 2.0

const temperatureHistory: HistoryDataPoint[] = []
const humidityHistory: HistoryDataPoint[] = []

// -- 初始化历史数据 --
function initHistory() {
  const now = Date.now()
  temperatureHistory.length = 0
  humidityHistory.length = 0
  let t = currentTemp - 2
  let h = currentHum + 3
  for (let i = 60; i >= 0; i--) {
    t += (Math.random() - 0.5) * 0.6
    h += (Math.random() - 0.5) * 1.2
    t = Math.max(20, Math.min(45, t))
    h = Math.max(30, Math.min(95, h))
    temperatureHistory.push({
      time: new Date(now - i * 5000).toISOString(),
      value: parseFloat(t.toFixed(1)),
    })
    humidityHistory.push({
      time: new Date(now - i * 5000).toISOString(),
      value: parseFloat(h.toFixed(1)),
    })
  }
}
initHistory()

// ── 模拟温度漂移 ──

function simulateDrift() {
  // 温度随机漂移 ±0.3°C
  currentTemp += (Math.random() - 0.5) * 0.6
  currentTemp = Math.max(20, Math.min(45, currentTemp))
  currentTemp = parseFloat(currentTemp.toFixed(1))

  // 湿度随机漂移 ±0.5%RH
  currentHum += (Math.random() - 0.5) * 1.0
  currentHum = Math.max(30, Math.min(95, currentHum))
  currentHum = parseFloat(currentHum.toFixed(1))

  // 阈值自动控制逻辑
  if (thresholdEnabled) {
    if (currentTemp > thresholdTemp && !fanState) {
      fanState = true
      alarmState = true
    } else if (currentTemp < thresholdTemp - hysteresis && fanState) {
      fanState = false
      alarmState = false
    }
  }

  const point: HistoryDataPoint = {
    time: new Date().toISOString(),
    value: currentTemp,
  }
  temperatureHistory.push(point)
  if (temperatureHistory.length > 120) temperatureHistory.shift()

  const humPoint: HistoryDataPoint = {
    time: new Date().toISOString(),
    value: currentHum,
  }
  humidityHistory.push(humPoint)
  if (humidityHistory.length > 120) humidityHistory.shift()
}

// ── Tauri invoke 模拟 ──

export async function mockInvoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T> {
  switch (cmd) {
    case 'get_temperature_data': {
      simulateDrift()
      return {
        temp: currentTemp,
        hum: currentHum,
        fan: fanState,
        baojing: alarmState,
        lastUpdated: new Date().toISOString(),
      } as T
    }

    case 'get_sensor_data': {
      simulateDrift()
      return getMockSensors() as T
    }

    case 'send_command': {
      const apiTag = args?.apiTag as string
      const value = args?.value as string
      if (apiTag === 'fan') {
        fanState = value?.toLowerCase() === 'true'
      } else if (apiTag === 'baojing') {
        alarmState = value?.toLowerCase() === 'true'
      }
      return { success: true } as T
    }

    case 'get_history_data': {
      return {
        temp: [...temperatureHistory],
        hum: [...humidityHistory],
      } as T
    }

    case 'get_device_list':
      return getMockDevices() as T

    default:
      console.warn(`[Mock] 未知 invoke 命令: ${cmd}`)
      return {} as T
  }
}

function getMockSensors(): SensorInfo[] {
  return [
    { ApiTag: 'temp', Name: '温度传感器', Value: String(currentTemp), Unit: '°C', OperType: 0, DataType: 1 },
    { ApiTag: 'hum', Name: '湿度传感器', Value: String(currentHum), Unit: '%RH', OperType: 0, DataType: 1 },
  ]
}

function getMockDevices() {
  return [
    { id: 1, name: '机柜 A-01', temp: currentTemp, hum: currentHum, status: 'online' },
    { id: 2, name: '机柜 B-03', temp: currentTemp + 1.2, hum: currentHum - 3, status: 'online' },
    { id: 3, name: '机柜 C-07', temp: currentTemp - 0.8, hum: currentHum + 5, status: 'online' },
    { id: 4, name: '机柜 D-12', temp: currentTemp + 2.5, hum: currentHum - 2, status: 'warning' },
  ]
}

// ── 暴露响应式状态 ──

export function getCurrentStatus(): DeviceStatus {
  return {
    fan: fanState,
    baojing: alarmState,
    temp: currentTemp,
    hum: currentHum,
    lastUpdated: new Date().toISOString(),
  }
}

export function getTemperatureHistory(): HistoryDataPoint[] {
  return [...temperatureHistory]
}

export function getHumidityHistory(): HistoryDataPoint[] {
  return [...humidityHistory]
}

export function setThreshold(temp: number) {
  thresholdTemp = temp
}

export function setThresholdEnabled(enabled: boolean) {
  thresholdEnabled = enabled
}

export function getThreshold() {
  return { thresholdTemp, thresholdEnabled, hysteresis }
}