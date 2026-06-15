<script setup lang="ts">
/**
 * MlyTempDashboard.vue — 冷库监控仪表盘 Demo
 *
 * 模拟 4 分区冷库环境监控，展示：
 * - 分区温度/湿度状态卡片
 * - 温湿度历史折线图（Chart.js）
 * - 系统报警状态
 * - 3 秒轮询实时数据刷新
 */
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { getDashboardData, type DashboardData } from './mock'
import gsap from 'gsap'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

// ── 响应式状态 ──

const data = ref<DashboardData>(getDashboardData())
const autoRefresh = ref(true)
let refreshTimer: ReturnType<typeof setInterval> | null = null

// ── 计算属性 ──

const chartLabels = computed(() => data.value.history.map((d) => d.time))

const chartData = computed(() => ({
  labels: chartLabels.value,
  datasets: [
    {
      label: '平均温度 (°C)',
      data: data.value.history.map((d) => d.temp),
      borderColor: '#06b6d4',
      backgroundColor: 'rgba(6, 182, 212, 0.08)',
      pointBackgroundColor: '#06b6d4',
      pointBorderColor: '#06b6d4',
      pointRadius: 2,
      pointHoverRadius: 5,
      borderWidth: 2,
      tension: 0.3,
      fill: true,
      yAxisID: 'y',
    },
    {
      label: '平均湿度 (%)',
      data: data.value.history.map((d) => d.hum),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.08)',
      pointBackgroundColor: '#3b82f6',
      pointBorderColor: '#3b82f6',
      pointRadius: 2,
      pointHoverRadius: 5,
      borderWidth: 2,
      tension: 0.3,
      fill: true,
      yAxisID: 'y1',
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 400 },
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      labels: {
        color: '#52525b',
        font: { size: 12 },
        usePointStyle: true,
        padding: 16,
      },
    },
    tooltip: {
      backgroundColor: '#18181b',
      titleColor: '#fafafa',
      bodyColor: '#a1a1aa',
      borderColor: '#27272a',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#a1a1aa',
        maxTicksLimit: 8,
        maxRotation: 30,
        font: { size: 11 },
      },
      grid: { color: 'rgba(228, 228, 231, 0.6)' },
    },
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      title: {
        display: true,
        text: '温度 (°C)',
        color: '#06b6d4',
        font: { size: 11 },
      },
      ticks: { color: '#06b6d4', font: { size: 11 } },
      grid: { color: 'rgba(228, 228, 231, 0.4)' },
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      title: {
        display: true,
        text: '湿度 (%)',
        color: '#3b82f6',
        font: { size: 11 },
      },
      ticks: { color: '#3b82f6', font: { size: 11 } },
      grid: { drawOnChartArea: false },
    },
  },
}

const zoneCards = computed(() => data.value.zones)

const statusText = computed(() => {
  if (data.value.systemAlarm) {
    return `${data.value.systemAlarmCount} 个分区异常`
  }
  return '所有分区运行正常'
})

const statusClass = computed(() => {
  if (data.value.systemAlarm) return 'status-bar--alarm'
  return 'status-bar--safe'
})

// ── 刷新数据 ──

function refreshData(): void {
  data.value = getDashboardData()
}

function toggleRefresh(): void {
  autoRefresh.value = !autoRefresh.value
  if (autoRefresh.value) {
    startRefresh()
  } else {
    stopRefresh()
  }
}

function startRefresh(): void {
  stopRefresh()
  refreshTimer = setInterval(refreshData, 3000)
}

function stopRefresh(): void {
  if (refreshTimer !== null) {
    clearInterval(refreshTimer)
    refreshTimer = null
  }
}

// ── 生命周期 ──

onMounted(() => {
  if (autoRefresh.value) startRefresh()
  nextTick(() => {
    gsap.fromTo(
      '.mly-demo',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    )
  })
})

onBeforeUnmount(() => {
  stopRefresh()
})

// ── 工具 ──

function formatTemp(val: number): string {
  return val.toFixed(1)
}

function statusLabel(status: string): string {
  switch (status) {
    case 'safe':
      return '正常'
    case 'warning':
      return '预警'
    case 'alarm':
      return '异常'
    default:
      return '未知'
  }
}
</script>

<template>
  <div class="mly-demo">
    <!-- 系统状态栏 -->
    <div class="status-bar" :class="statusClass">
      <div class="status-bar__left">
        <span class="status-dot" :class="data.systemAlarm ? 'status-dot--alarm' : 'status-dot--safe'" />
        <span class="status-bar__text">{{ statusText }}</span>
      </div>
      <div class="status-bar__right">
        <span class="status-bar__time">{{ new Date().toLocaleTimeString('zh-CN') }}</span>
        <button
          class="refresh-toggle"
          :class="{ 'refresh-toggle--active': autoRefresh }"
          @click="toggleRefresh"
          :title="autoRefresh ? '暂停刷新' : '恢复刷新'"
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- 概览指标行 -->
    <div class="metrics-row">
      <div class="metric-card">
        <span class="metric-card__label">平均温度</span>
        <span class="metric-card__value metric-card__value--temp">{{ formatTemp(data.avgTemp) }}°C</span>
      </div>
      <div class="metric-card">
        <span class="metric-card__label">平均湿度</span>
        <span class="metric-card__value metric-card__value--hum">{{ data.avgHum.toFixed(0) }}%</span>
      </div>
      <div class="metric-card">
        <span class="metric-card__label">分区总数</span>
        <span class="metric-card__value">{{ data.zones.length }}</span>
      </div>
      <div class="metric-card">
        <span class="metric-card__label">异常分区</span>
        <span
          class="metric-card__value"
          :class="data.systemAlarmCount > 0 ? 'metric-card__value--alarm' : ''"
        >
          {{ data.systemAlarmCount }}
        </span>
      </div>
    </div>

    <!-- 分区卡片网格 -->
    <div class="zones-grid">
      <div
        v-for="zone in zoneCards"
        :key="zone.id"
        class="zone-card"
        :class="`zone-card--${zone.status}`"
      >
        <div class="zone-card__header">
          <span class="zone-card__name">{{ zone.name }}</span>
          <span class="zone-card__badge" :data-status="zone.status">
            {{ statusLabel(zone.status) }}
          </span>
        </div>
        <div class="zone-card__body">
          <div class="zone-card__temp">
            <span class="zone-card__temp-value">{{ formatTemp(zone.temp) }}</span>
            <span class="zone-card__temp-unit">°C</span>
          </div>
          <div class="zone-card__target">
            目标 {{ zone.targetTemp }}°C
          </div>
          <div class="zone-card__hum">
            <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" opacity="0.5">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7.346 5.295a1 1 0 011.41-.048l4 3.5a1 1 0 010 1.506l-4 3.5a1 1 0 01-1.41-1.41L9.586 10 7.348 7.705a1 1 0 01-.002-1.41z"
                clip-rule="evenodd"
              />
            </svg>
            {{ zone.hum.toFixed(0) }}%
          </div>
        </div>
        <div class="zone-card__status">
          <span
            class="zone-indicator"
            :class="zone.online ? 'zone-indicator--online' : 'zone-indicator--offline'"
          />
          <span class="zone-card__status-text">{{ zone.online ? '在线' : '离线' }}</span>
        </div>
      </div>
    </div>

    <!-- 温湿度历史图表 -->
    <div class="chart-card">
      <div class="chart-card__header">
        <span class="chart-card__title">温湿度历史趋势</span>
        <span class="chart-card__badge">实时</span>
      </div>
      <div class="chart-card__body">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </div>

    <!-- 系统信息 -->
    <div class="info-card">
      <div class="info-card__row">
        <span class="info-card__label">监控系统</span>
        <span class="info-card__value">MLY_TEMP 冷库环境监控 v1.0</span>
      </div>
      <div class="info-card__row">
        <span class="info-card__label">数据源</span>
        <span class="info-card__value">模拟传感器（4 分区）</span>
      </div>
      <div class="info-card__row">
        <span class="info-card__label">刷新间隔</span>
        <span class="info-card__value">3 秒</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ════════════════════════════════════════════════════════════
   MLY_TEMP 冷库监控仪表盘 — 白色极简主题
   适配 showcase 的 design-tokens
   ════════════════════════════════════════════════════════════ */

.mly-demo {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  opacity: 0;
}

/* ── 系统状态栏 ── */

.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-base);
}

.status-bar--safe {
  border-left: 3px solid var(--color-success);
}

.status-bar--alarm {
  border-left: 3px solid var(--color-error);
}

.status-bar__left,
.status-bar__right {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.status-dot--safe {
  background: var(--color-success);
  box-shadow: 0 0 6px rgba(34, 197, 94, 0.4);
}

.status-dot--alarm {
  background: var(--color-error);
  box-shadow: 0 0 6px rgba(239, 68, 68, 0.4);
  animation: dot-pulse 1.5s ease-in-out infinite;
}

@keyframes dot-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.status-bar__text {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
}

.status-bar__time {
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.refresh-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  color: var(--color-text-tertiary);
  transition: color var(--transition-fast), background var(--transition-fast);
}

.refresh-toggle:hover {
  background: var(--color-surface-hover);
  color: var(--color-text-secondary);
}

.refresh-toggle--active {
  color: var(--color-accent-alt);
}

/* ── 概览指标行 ── */

.metrics-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
}

@media (max-width: 640px) {
  .metrics-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

.metric-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-3) var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.metric-card__label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-card__value {
  font-family: var(--font-mono);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  line-height: 1;
}

.metric-card__value--temp {
  color: #06b6d4;
}

.metric-card__value--hum {
  color: #3b82f6;
}

.metric-card__value--alarm {
  color: var(--color-error);
}

/* ── 分区卡片网格 ── */

.zones-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}

@media (max-width: 640px) {
  .zones-grid {
    grid-template-columns: 1fr;
  }
}

.zone-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
}

.zone-card--safe {
  border-left: 3px solid var(--color-success);
}

.zone-card--warning {
  border-left: 3px solid #f59e0b;
}

.zone-card--alarm {
  border-left: 3px solid var(--color-error);
  box-shadow: 0 0 0 1px rgba(239, 68, 68, 0.15);
}

.zone-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.zone-card__name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.zone-card__badge {
  font-size: 10px;
  font-weight: var(--font-weight-semibold);
  padding: 2px var(--space-2);
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.zone-card__badge[data-status='safe'] {
  background: rgba(34, 197, 94, 0.1);
  color: #16a34a;
}

.zone-card__badge[data-status='warning'] {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
}

.zone-card__badge[data-status='alarm'] {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  animation: badge-pulse 2s ease-in-out infinite;
}

@keyframes badge-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.zone-card__body {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
}

.zone-card__temp {
  display: flex;
  align-items: baseline;
  gap: 1px;
}

.zone-card__temp-value {
  font-family: var(--font-mono);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  line-height: 1;
}

.zone-card__temp-unit {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  margin-left: 1px;
}

.zone-card__target {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.zone-card__hum {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin-left: auto;
}

.zone-card__status {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.zone-indicator {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
}

.zone-indicator--online {
  background: var(--color-success);
}

.zone-indicator--offline {
  background: var(--color-error);
}

.zone-card__status-text {
  font-size: 10px;
  color: var(--color-text-tertiary);
}

/* ── 图表卡片 ── */

.chart-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.chart-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.chart-card__title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.chart-card__badge {
  font-size: 10px;
  font-weight: var(--font-weight-medium);
  color: var(--color-accent-alt);
  background: rgba(59, 130, 246, 0.1);
  padding: 2px var(--space-2);
  border-radius: var(--radius-sm);
}

.chart-card__body {
  position: relative;
  width: 100%;
  height: 300px;
  padding: var(--space-4);
}

@media (max-width: 640px) {
  .chart-card__body {
    height: 220px;
    padding: var(--space-3);
  }
}

/* ── 系统信息卡片 ── */

.info-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.info-card__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.info-card__label {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
}

.info-card__value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}
</style>