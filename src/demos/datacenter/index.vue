<template>
  <div ref="dashboardRef" class="dc-dashboard">
    <!-- 顶栏：实时时钟 + 连接状态 -->
    <header class="dc-topbar">
      <div class="dc-clock">{{ clock }}</div>
      <div class="dc-connection">
        <span ref="statusDotRef" class="dc-status-dot" :class="{ alive: isPolling }" />
        <span class="dc-status-label">{{ isPolling ? '在线' : '离线' }}</span>
      </div>
    </header>

    <!-- KPI 卡片 -->
    <section class="dc-kpi-grid">
      <!-- 温度卡片 -->
      <div ref="tempCardRef" class="dc-kpi dc-kpi-temp">
        <div class="dc-kpi-header">
          <svg class="dc-kpi-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
          </svg>
          <span class="dc-kpi-label">温度</span>
        </div>
        <div class="dc-kpi-body">
          <span class="dc-kpi-value" :style="{ color: tempColor }">{{ displayTemp }}</span>
          <span class="dc-kpi-unit">°C</span>
        </div>
        <div class="dc-kpi-footer">
          阈值 {{ thresholdTemp }}°C
          <span v-if="temp !== null && temp > thresholdTemp" class="dc-over">· 超标</span>
        </div>
      </div>

      <!-- 湿度卡片 -->
      <div ref="humCardRef" class="dc-kpi dc-kpi-hum">
        <div class="dc-kpi-header">
          <svg class="dc-kpi-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
          <span class="dc-kpi-label">湿度</span>
        </div>
        <div class="dc-kpi-body">
          <span class="dc-kpi-value dc-kpi-value--hum">{{ displayHum }}</span>
          <span class="dc-kpi-unit">%RH</span>
        </div>
        <div class="dc-kpi-footer">
          最后更新：{{ lastUpdatedDisplay }}
        </div>
      </div>
    </section>

    <!-- 设备状态 -->
    <section class="dc-devices">
      <div class="dc-device" :class="{ active: fan }">
        <div class="dc-device-icon" :class="{ spinning: fan }">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M12.5 2c-2.5 0-4.5 2-4.5 4.5 0 1.2.5 2.3 1.3 3.1C7.5 10.3 6 12 6 14c0 2.2 1.8 4 4 4 1.2 0 2.3-.5 3.1-1.3.8.8 1.9 1.3 3.1 1.3 2.2 0 4-1.8 4-4 0-1.6-.9-3-2.3-3.7.5-.7.8-1.6.8-2.5C18.7 4 16.7 2 14.2 2h-1.7z" />
            <circle cx="12" cy="15" r="1" fill="currentColor" />
          </svg>
        </div>
        <div class="dc-device-info">
          <span class="dc-device-label">风扇</span>
          <span class="dc-device-state" :class="{ on: fan }">{{ fan ? '运行中' : '已关闭' }}</span>
        </div>
      </div>

      <div class="dc-device" :class="{ active: baojing }">
        <div ref="alarmIconRef" class="dc-device-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </div>
        <div class="dc-device-info">
          <span class="dc-device-label">警报</span>
          <span class="dc-device-state" :class="{ on: baojing }">{{ baojing ? '触发中' : '正常' }}</span>
        </div>
      </div>
    </section>

    <!-- 温度走势图 -->
    <section class="dc-chart-section">
      <div class="dc-chart-header">
        <h3 class="dc-chart-title">温度走势</h3>
        <span class="dc-chart-badge">最近 5 分钟</span>
      </div>
      <div class="dc-chart-wrap">
        <canvas ref="chartCanvasRef" />
      </div>
    </section>

    <!-- 阈值滑块 -->
    <section class="dc-threshold">
      <div class="dc-threshold-header">
        <span class="dc-threshold-title">温度阈值</span>
        <label class="dc-toggle">
          <span class="dc-toggle-label">自动控制</span>
          <button class="dc-toggle-btn" :class="{ active: thresholdEnabled }" @click="thresholdEnabled = !thresholdEnabled">
            <span class="dc-toggle-knob" />
          </button>
        </label>
      </div>

      <div
        ref="sliderTrackRef"
        class="dc-slider-track"
        :class="{ disabled: !thresholdEnabled }"
        @pointerdown="onSliderDown"
      >
        <div class="dc-slider-ticks">
          <span v-for="t in ticks" :key="t" class="dc-tick-label" :style="{ left: tickPct(t) + '%' }">{{ t }}°</span>
        </div>
        <div class="dc-hysteresis" :style="{ left: hystLeft + '%', width: hystWidth + '%' }" />
        <div v-if="temp !== null" class="dc-temp-marker" :style="{ left: clamp(tempPct, 0, 100) + '%' }">
          <div class="dc-temp-line" />
          <div class="dc-temp-label" :style="{ color: tempColor }">{{ temp.toFixed(1) }}°</div>
        </div>
        <div ref="sliderThumbRef" class="dc-slider-thumb" :style="{ left: thumbPct + '%' }">
          <div class="dc-thumb-value">{{ thresholdTemp.toFixed(1) }}°</div>
        </div>
      </div>

      <div class="dc-threshold-info">
        阈值：<strong>{{ thresholdTemp.toFixed(1) }}°C</strong>
        <span class="dc-hyst-info">死区：2.0°C</span>
      </div>
    </section>

    <!-- 快速操作 -->
    <section class="dc-actions">
      <button class="dc-action dc-action--fan" :class="{ active: fan }" @click="toggleFan(true)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12.5 2c-2.5 0-4.5 2-4.5 4.5 0 1.2.5 2.3 1.3 3.1C7.5 10.3 6 12 6 14c0 2.2 1.8 4 4 4 1.2 0 2.3-.5 3.1-1.3.8.8 1.9 1.3 3.1 1.3 2.2 0 4-1.8 4-4 0-1.6-.9-3-2.3-3.7.5-.7.8-1.6.8-2.5C18.7 4 16.7 2 14.2 2h-1.7z" />
          <circle cx="12" cy="15" r="1" fill="currentColor" />
        </svg>
        <span>开风扇</span>
      </button>
      <button class="dc-action dc-action--fan-off" :class="{ active: !fan }" @click="toggleFan(false)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12.5 2c-2.5 0-4.5 2-4.5 4.5 0 1.2.5 2.3 1.3 3.1C7.5 10.3 6 12 6 14c0 2.2 1.8 4 4 4 1.2 0 2.3-.5 3.1-1.3.8.8 1.9 1.3 3.1 1.3 2.2 0 4-1.8 4-4 0-1.6-.9-3-2.3-3.7.5-.7.8-1.6.8-2.5C18.7 4 16.7 2 14.2 2h-1.7z" />
          <circle cx="12" cy="15" r="1" fill="currentColor" />
          <line x1="3" y1="3" x2="21" y2="21" />
        </svg>
        <span>关风扇</span>
      </button>
      <button class="dc-action dc-action--alarm" :class="{ active: baojing }" @click="testAlarm">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        <span>测试警报</span>
      </button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import gsap from 'gsap'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Filler,
  Tooltip,
  type ChartConfiguration,
} from 'chart.js'
import {
  mockInvoke,
  getCurrentStatus,
  getTemperatureHistory,
  getHumidityHistory,
  setThreshold,
  setThresholdEnabled,
} from './mock'

Chart.register(LineController, LineElement, PointElement, LinearScale, TimeScale, Filler, Tooltip)

// ── 响应式状态 ──
const temp = ref<number | null>(null)
const hum = ref<number | null>(null)
const fan = ref(false)
const baojing = ref(false)
const lastUpdated = ref<string | null>(null)
const thresholdTemp = ref(30.0)
const thresholdEnabled = ref(true)
const isPolling = ref(false)
const displayTemp = ref('--.-')
const displayHum = ref('--.-')

// ── 时钟 ──
const clock = ref('')
let clockTimer: ReturnType<typeof setInterval> | null = null
function updateClock() {
  const n = new Date()
  clock.value = `${String(n.getHours()).padStart(2, '0')}:${String(n.getMinutes()).padStart(2, '0')}:${String(n.getSeconds()).padStart(2, '0')}`
}

// ── 最后更新时间 ──
const lastUpdatedDisplay = computed(() => {
  if (!lastUpdated.value) return '暂无数据'
  const d = new Date(lastUpdated.value)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
})

// ── 温度颜色 ──
const tempColor = computed(() => {
  if (temp.value === null) return 'var(--color-text-tertiary)'
  if (temp.value >= 35) return 'var(--color-error)'
  if (temp.value >= 30) return '#d97706'
  return 'var(--color-accent-alt)'
})

// ── 滑块 ──
const MIN_TEMP = 20, MAX_TEMP = 40, STEP = 0.5
const ticks = [20, 25, 30, 35, 40]
function tickPct(t: number) { return ((t - MIN_TEMP) / (MAX_TEMP - MIN_TEMP)) * 100 }
const thumbPct = computed(() => tickPct(thresholdTemp.value))
const tempPct = computed(() => temp.value !== null ? tickPct(Math.max(MIN_TEMP, Math.min(MAX_TEMP, temp.value))) : 50)
const hystLeft = computed(() => tickPct(Math.max(MIN_TEMP, thresholdTemp.value - 2.0)))
const hystWidth = computed(() => thumbPct.value - hystLeft.value)
function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)) }

function onSliderDown(e: PointerEvent) {
  if (!thresholdEnabled.value) return
  const track = sliderTrackRef.value
  if (!track) return
  track.setPointerCapture(e.pointerId)
  const update = (ev: PointerEvent) => {
    const rect = track.getBoundingClientRect()
    const x = clamp((ev.clientX - rect.left) / rect.width, 0, 1)
    const val = Math.round((MIN_TEMP + x * (MAX_TEMP - MIN_TEMP)) / STEP) * STEP
    const clamped = clamp(val, MIN_TEMP, MAX_TEMP)
    thresholdTemp.value = clamped
    setThreshold(clamped)
  }
  update(e)
  const onMove = (ev: PointerEvent) => update(ev)
  const onUp = (ev: PointerEvent) => {
    track.releasePointerCapture(ev.pointerId)
    track.removeEventListener('pointermove', onMove)
    track.removeEventListener('pointerup', onUp)
  }
  track.addEventListener('pointermove', onMove)
  track.addEventListener('pointerup', onUp)
}

// ── 按钮操作 ──
async function toggleFan(state: boolean) {
  await mockInvoke('send_command', { apiTag: 'fan', value: String(state) })
  fan.value = state
}

async function testAlarm() {
  await mockInvoke('send_command', { apiTag: 'baojing', value: 'true' })
  baojing.value = true
  setTimeout(async () => {
    await mockInvoke('send_command', { apiTag: 'baojing', value: 'false' })
    baojing.value = false
  }, 2000)
}

// ── Chart.js ──
const chartCanvasRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

function initChart() {
  const canvas = chartCanvasRef.value
  if (!canvas) return
  if (chartInstance) chartInstance.destroy()

  const labels = getTemperatureHistory().map(p => new Date(p.time))
  const data = getTemperatureHistory().map(p => p.value)

  const config: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: '温度',
          data,
          borderColor: '#3b82f6',
          backgroundColor: (ctx) => {
            if (!ctx.chart.chartArea) return 'rgba(59, 130, 246, 0.08)'
            const grad = ctx.chart.ctx.createLinearGradient(0, ctx.chart.chartArea.top, 0, ctx.chart.chartArea.bottom)
            grad.addColorStop(0, 'rgba(59, 130, 246, 0.2)')
            grad.addColorStop(1, 'rgba(59, 130, 246, 0.01)')
            return grad
          },
          borderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 8,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: '#3b82f6',
          fill: true,
          tension: 0.35,
        },
        {
          label: '阈值',
          data: data.map(() => thresholdTemp.value),
          borderColor: 'rgba(239, 68, 68, 0.4)',
          borderDash: [5, 4],
          borderWidth: 1,
          pointRadius: 0,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: '#ffffff',
          titleFont: { size: 12, family: 'Inter, system-ui, sans-serif' },
          bodyFont: { size: 13, family: 'Inter, system-ui, sans-serif' },
          padding: 10,
          cornerRadius: 8,
          borderColor: '#e4e4e7',
          borderWidth: 1,
          titleColor: '#18181b',
          bodyColor: '#52525b',
          boxPadding: 4,
        },
      },
      scales: {
        x: {
          display: true,
          grid: { display: false },
          ticks: {
            color: '#a1a1aa',
            font: { size: 10, family: 'Inter, system-ui, sans-serif' },
            maxTicksLimit: 5,
            maxRotation: 0,
            callback(v) {
              const d = typeof v === 'string' ? new Date(v) : new Date(v)
              return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
            },
          },
        },
        y: {
          display: true,
          grid: { color: 'rgba(228, 228, 231, 0.5)' },
          border: { display: false },
          ticks: {
            color: '#a1a1aa',
            font: { size: 11, family: 'Inter, system-ui, sans-serif' },
            maxTicksLimit: 5,
            callback(v) { return `${v}°C` },
          },
          min: 20,
          max: 40,
        },
      },
    },
  }

  chartInstance = new Chart(canvas, config)
}

function updateChart() {
  if (!chartInstance) return
  const history = getTemperatureHistory()
  chartInstance.data.labels = history.map(p => new Date(p.time))
  chartInstance.data.datasets[0].data = history.map(p => p.value)
  chartInstance.data.datasets[1].data = history.map(p => thresholdTemp.value)
  chartInstance.update('none')
}

// ── 轮询 ──
let pollTimer: ReturnType<typeof setInterval> | null = null

async function fetchData() {
  try {
    const status = getCurrentStatus()
    temp.value = status.temp
    hum.value = status.hum
    fan.value = status.fan
    baojing.value = status.baojing
    lastUpdated.value = status.lastUpdated
    isPolling.value = true
    updateChart()
  } catch {
    isPolling.value = false
  }
}

function startPolling() {
  fetchData()
  pollTimer = setInterval(fetchData, 5000)
}

function stopPolling() {
  if (pollTimer !== null) {
    clearInterval(pollTimer)
    pollTimer = null
  }
}

// ── GSAP 动画 ──
const dashboardRef = ref<HTMLElement | null>(null)
const statusDotRef = ref<HTMLElement | null>(null)
const tempCardRef = ref<HTMLElement | null>(null)
const humCardRef = ref<HTMLElement | null>(null)
const alarmIconRef = ref<HTMLElement | null>(null)
const sliderTrackRef = ref<HTMLElement | null>(null)
const sliderThumbRef = ref<HTMLElement | null>(null)

let gsapCtx: gsap.Context | null = null

function setupAnimations() {
  const root = dashboardRef.value
  if (!root) return
  gsapCtx = gsap.context(() => {
    if (statusDotRef.value) {
      gsap.to(statusDotRef.value, { scale: 1.5, opacity: 0.3, duration: 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    }
    if (tempCardRef.value) {
      gsap.to(tempCardRef.value, {
        boxShadow: '0 0 24px rgba(59, 130, 246, 0.12), 0 0 48px rgba(59, 130, 246, 0.04)',
        duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
      })
    }
    if (humCardRef.value) {
      gsap.to(humCardRef.value, {
        backgroundPosition: '200% 0%', duration: 6, repeat: -1, ease: 'none',
      })
    }
  }, root)
}

let alarmTween: gsap.core.Tween | null = null

watch(baojing, (val) => {
  if (alarmTween) { alarmTween.kill(); alarmTween = null }
  if (val && alarmIconRef.value) {
    gsap.set(alarmIconRef.value, { opacity: 0.3 })
    alarmTween = gsap.to(alarmIconRef.value, { opacity: 1, duration: 0.8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  } else if (alarmIconRef.value) {
    gsap.set(alarmIconRef.value, { opacity: 1 })
  }
})

watch(thresholdEnabled, (val) => {
  setThresholdEnabled(val)
})

// ── 生命周期 ──
onMounted(() => {
  updateClock()
  clockTimer = setInterval(updateClock, 1000)
  startPolling()
  setupAnimations()
  initChart()
})

onUnmounted(() => {
  if (clockTimer) clearInterval(clockTimer)
  stopPolling()
  if (chartInstance) chartInstance.destroy()
  gsapCtx?.revert()
  if (alarmTween) alarmTween.kill()
})
</script>

<style scoped>
/* ── 仪表盘容器 ── */
.dc-dashboard {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* ── 顶栏 ── */
.dc-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-1) 0;
}
.dc-clock {
  font-family: var(--font-mono);
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-text);
}
.dc-connection {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.dc-status-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--color-text-tertiary);
  transition: background 0.2s;
}
.dc-status-dot.alive { background: var(--color-success); }
.dc-status-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

/* ── KPI 网格 ── */
.dc-kpi-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}
.dc-kpi {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  position: relative;
  overflow: hidden;
}
.dc-kpi-temp { border-left: 3px solid var(--color-accent-alt); }
.dc-kpi-hum {
  border-left: 3px solid #06b6d4;
  background: linear-gradient(90deg, var(--color-surface) 0%, rgba(6, 182, 212, 0.03) 25%, var(--color-surface) 50%, rgba(6, 182, 212, 0.03) 75%, var(--color-surface) 100%);
  background-size: 200% 100%;
}
.dc-kpi-header {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}
.dc-kpi-icon {
  color: var(--color-text-tertiary);
  flex-shrink: 0;
}
.dc-kpi-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.dc-kpi-body {
  display: flex;
  align-items: baseline;
  gap: 2px;
}
.dc-kpi-value {
  font-family: var(--font-mono);
  font-size: 2.25rem;
  font-weight: 800;
  line-height: 1.1;
}
.dc-kpi-value--hum { color: #06b6d4; }
.dc-kpi-unit {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  margin-left: 2px;
}
.dc-kpi-footer {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  display: flex;
  gap: 4px;
}
.dc-over { color: var(--color-error); }

/* ── 设备状态 ── */
.dc-devices {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}
.dc-device {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  padding: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  transition: border-color 0.2s;
}
.dc-device.active {
  border-color: var(--color-success);
}
.dc-device.active:has(.on) {
  border-color: var(--color-error);
}
.dc-device-icon {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--color-surface-hover);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
  flex-shrink: 0;
  transition: color 0.2s, background 0.2s;
}
.dc-device.active .dc-device-icon {
  color: var(--color-success);
  background: rgba(34, 197, 94, 0.1);
}
.dc-device.active:has(.on) .dc-device-icon {
  color: var(--color-error);
  background: rgba(239, 68, 68, 0.1);
}
.dc-device-icon.spinning svg {
  animation: fan-spin 2s linear infinite;
}
@keyframes fan-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.dc-device-info { display: flex; flex-direction: column; gap: 2px; }
.dc-device-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}
.dc-device-state {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-tertiary);
}
.dc-device-state.on { color: var(--color-success); }
.dc-device:has(.on) .dc-device-state { color: var(--color-error); }

/* ── 图表 ── */
.dc-chart-section {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  padding: var(--space-4);
}
.dc-chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-3);
}
.dc-chart-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text);
}
.dc-chart-badge {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  background: var(--color-surface-hover);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: var(--font-mono);
}
.dc-chart-wrap {
  height: 200px;
  width: 100%;
}

/* ── 阈值 ── */
.dc-threshold {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.dc-threshold-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dc-threshold-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text);
}
.dc-toggle {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.dc-toggle-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}
.dc-toggle-btn {
  position: relative;
  width: 48px; height: 28px;
  border-radius: 14px;
  border: 1px solid var(--color-border);
  background: var(--color-surface-hover);
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
  padding: 0;
  outline: none;
  display: flex;
  align-items: center;
}
.dc-toggle-btn.active {
  background: var(--color-accent-alt);
  border-color: var(--color-accent-alt);
}
.dc-toggle-knob {
  position: absolute;
  top: 3px; left: 3px;
  width: 20px; height: 20px;
  border-radius: 50%;
  background: var(--color-text);
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.15);
}
.dc-toggle-btn.active .dc-toggle-knob {
  transform: translateX(20px);
}
.dc-slider-track {
  position: relative;
  height: 56px;
  touch-action: none;
  cursor: pointer;
}
.dc-slider-track.disabled {
  opacity: 0.4;
  pointer-events: none;
}
.dc-slider-track::before {
  content: '';
  position: absolute;
  top: 12px; left: 0; right: 0;
  height: 4px;
  background: var(--color-surface-hover);
  border-radius: 2px;
  border: 1px solid var(--color-border);
}
.dc-slider-ticks {
  position: absolute; top: 0; left: 0; right: 0; height: 100%;
  pointer-events: none;
}
.dc-tick-label {
  position: absolute;
  top: 34px;
  transform: translateX(-50%);
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  font-family: var(--font-mono);
}
.dc-hysteresis {
  position: absolute;
  top: 8px;
  height: 12px;
  background: rgba(234, 179, 8, 0.12);
  border-radius: 2px;
  pointer-events: none;
}
.dc-temp-marker {
  position: absolute;
  top: 4px;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 2;
}
.dc-temp-line {
  width: 2px; height: 20px;
  background: var(--color-text);
  border-radius: 1px; margin: 0 auto;
  opacity: 0.25;
}
.dc-temp-label {
  font-family: var(--font-mono);
  font-size: 10px; font-weight: 700;
  text-align: center; margin-top: 2px;
  white-space: nowrap;
}
.dc-slider-thumb {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  z-index: 3;
  pointer-events: none;
}
.dc-thumb-value {
  background: var(--color-accent-alt);
  color: #fff;
  font-family: var(--font-mono);
  font-size: 11px; font-weight: 700;
  padding: 2px 8px;
  border-radius: 6px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.25);
}
.dc-thumb-value::after {
  content: '';
  display: block;
  margin: 3px auto 0;
  width: 16px; height: 16px;
  border-radius: 50%;
  background: var(--color-accent-alt);
  border: 3px solid #fff;
  box-shadow: 0 0 0 2px var(--color-accent-alt);
}
.dc-threshold-info {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
.dc-threshold-info strong {
  color: var(--color-text);
  font-family: var(--font-mono);
}
.dc-hyst-info {
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
}

/* ── 快速操作 ── */
.dc-actions {
  display: flex;
  gap: var(--space-2);
}
.dc-action {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: var(--space-3) var(--space-2);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, color 0.2s;
  -webkit-tap-highlight-color: transparent;
  outline: none;
}
.dc-action:active { transform: scale(0.95); }
.dc-action--fan.active {
  border-color: var(--color-success);
  color: var(--color-success);
  background: rgba(34, 197, 94, 0.06);
}
.dc-action--fan-off.active {
  border-color: var(--color-border);
  color: var(--color-text-tertiary);
}
.dc-action--alarm.active {
  border-color: var(--color-error);
  color: var(--color-error);
  background: rgba(239, 68, 68, 0.06);
}
</style>
