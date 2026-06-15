<template>
  <div ref="rootRef" class="smartlight-demo">
    <!-- Room Preview -->
    <section class="room-preview" ref="roomRef">
      <div class="room-ambient" :style="ambientStyle" ref="ambientRef" />
      <div class="room-glow" ref="glowRef" />
      <svg class="room-svg" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Floor -->
        <rect x="0" y="220" width="500" height="80" fill="var(--color-surface-hover)" rx="4" />
        <!-- Walls -->
        <rect x="0" y="20" width="500" height="200" fill="var(--color-surface)" rx="4" />
        <!-- Ceiling Light 1 (客厅) -->
        <g class="light-fixture" :class="{ active: devices[0].on }" @click="toggleDevice(0)">
          <line x1="125" y1="20" x2="125" y2="45" stroke="var(--color-border)" stroke-width="2" />
          <rect x="95" y="45" width="60" height="12" rx="6" :fill="devices[0].on ? deviceColor(0) : 'var(--color-border)'" />
          <circle v-if="devices[0].on" cx="125" cy="60" r="24" :fill="deviceColor(0)" opacity="0.35" class="light-pulse" />
          <circle v-if="devices[0].on" cx="125" cy="60" r="16" :fill="deviceColor(0)" opacity="0.18" class="light-pulse delay" />
          <text x="125" y="85" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="9">客厅</text>
        </g>
        <!-- Ceiling Light 2 (卧室) -->
        <g class="light-fixture" :class="{ active: devices[1].on }" @click="toggleDevice(1)">
          <line x1="375" y1="20" x2="375" y2="45" stroke="var(--color-border)" stroke-width="2" />
          <rect x="345" y="45" width="60" height="12" rx="6" :fill="devices[1].on ? deviceColor(1) : 'var(--color-border)'" />
          <circle v-if="devices[1].on" cx="375" cy="60" r="24" :fill="deviceColor(1)" opacity="0.35" class="light-pulse" />
          <circle v-if="devices[1].on" cx="375" cy="60" r="16" :fill="deviceColor(1)" opacity="0.18" class="light-pulse delay" />
          <text x="375" y="85" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="9">卧室</text>
        </g>
        <!-- Desk Light (书房) -->
        <g class="light-fixture desk" :class="{ active: devices[2].on }" @click="toggleDevice(2)">
          <rect x="235" y="172" width="30" height="8" rx="2" fill="var(--color-border)" />
          <line x1="250" y1="180" x2="250" y2="130" stroke="var(--color-border)" stroke-width="2" />
          <line x1="250" y1="130" x2="265" y2="115" stroke="var(--color-border)" stroke-width="2" />
          <path d="M258 115 L272 115 L278 128 L264 128 Z" :fill="devices[2].on ? deviceColor(2) : '#e4e4e7'" />
          <circle v-if="devices[2].on" cx="268" cy="128" r="20" :fill="deviceColor(2)" opacity="0.25" class="light-pulse" />
          <text x="265" y="170" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="9">书房</text>
        </g>
        <!-- Window -->
        <rect x="200" y="50" width="100" height="90" rx="4" fill="var(--color-bg)" stroke="var(--color-border)" stroke-width="1.5" />
        <line x1="250" y1="50" x2="250" y2="140" stroke="var(--color-border)" stroke-width="1" />
        <line x1="200" y1="95" x2="300" y2="95" stroke="var(--color-border)" stroke-width="1" />
      </svg>
    </section>

    <!-- Control Panel -->
    <section class="control-panel">
      <!-- Device List -->
      <div class="control-section">
        <h3 class="section-label">设备列表</h3>
        <div class="device-list">
          <div v-for="(device, idx) in devices" :key="device.id"
            class="device-card"
            :class="{ active: device.on }"
            @click="toggleDevice(idx)"
          >
            <div class="device-icon-wrap">
              <div class="device-icon" :style="{ background: device.on ? deviceColor(idx) : 'var(--color-surface-hover)' }">
                <PhLightbulb :size="20" weight="fill" :color="device.on ? '#fff' : 'var(--color-text-tertiary)'" />
              </div>
            </div>
            <div class="device-info">
              <span class="device-name">{{ device.name }}</span>
              <span class="device-status" :class="{ on: device.on }">{{ device.on ? '已开启' : '已关闭' }}</span>
            </div>
            <div class="device-toggle" :class="{ on: device.on }">
              <div class="toggle-knob" />
            </div>
          </div>
        </div>
      </div>

      <!-- Brightness Slider -->
      <div class="control-section">
        <div class="slider-header">
          <h3 class="section-label">亮度</h3>
          <span class="slider-value">{{ brightness }}%</span>
        </div>
        <div ref="brightnessTrackRef" class="slider-track"
          role="slider" tabindex="0"
          :aria-valuemin="0" :aria-valuemax="100" :aria-valuenow="brightness"
          @pointerdown="onBrightnessPointerDown"
          @pointermove="onBrightnessPointerMove"
          @pointerup="onBrightnessPointerUp"
          @pointercancel="onBrightnessPointerUp"
        >
          <div class="slider-fill" ref="brightnessFillRef" />
          <div class="slider-thumb" ref="brightnessThumbRef" :style="{ left: brightness + '%' }" />
        </div>
        <div class="slider-marks">
          <span>0%</span><span>50%</span><span>100%</span>
        </div>
      </div>

      <!-- Color Temperature -->
      <div class="control-section">
        <div class="slider-header">
          <h3 class="section-label">色温</h3>
          <span class="slider-value">{{ colorTemp }}K</span>
        </div>
        <div class="temp-bar">
          <div class="temp-gradient" />
          <div class="temp-thumb" :style="{ left: ((colorTemp - 2700) / (6500 - 2700)) * 100 + '%' }" />
          <input type="range" min="2700" max="6500" step="100" v-model.number="colorTemp" class="temp-range" />
        </div>
        <div class="slider-marks">
          <span>暖光 2700K</span><span>白光 4500K</span><span>冷光 6500K</span>
        </div>
      </div>

      <!-- Scene Selection -->
      <div class="control-section">
        <h3 class="section-label">场景模式</h3>
        <div class="scene-grid">
          <button v-for="scene in scenes" :key="scene.id"
            class="scene-btn"
            :class="{ active: activeScene === scene.id }"
            @click="applyScene(scene.id)"
          >
            <component :is="scene.icon" :size="22" />
            <span>{{ scene.name }}</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, reactive } from 'vue'
import { gsap } from 'gsap'
import { PhLightbulb, PhBook, PhMoonStars, PhConfetti, PhGear } from '@phosphor-icons/vue'

// ── Types ────────────────────────────────────────────
interface LightDevice {
  id: number
  name: string
  on: boolean
  brightness: number
  colorTemp: number
}

interface Scene {
  id: string
  name: string
  icon: object
  brightness: number
  colorTemp: number
  deviceMask: boolean[] // which devices turn on
}

// ── Mock Data ─────────────────────────────────────────
const devices = reactive<LightDevice[]>([
  { id: 1, name: '客厅灯', on: true, brightness: 80, colorTemp: 3500 },
  { id: 2, name: '卧室灯', on: false, brightness: 30, colorTemp: 3000 },
  { id: 3, name: '书房灯', on: true, brightness: 100, colorTemp: 5000 },
])

const scenes: Scene[] = [
{ id: 'read', name: '阅读', icon: PhBook, brightness: 90, colorTemp: 4000, deviceMask: [true, false, true] },
    { id: 'sleep', name: '睡眠', icon: PhMoonStars, brightness: 15, colorTemp: 2700, deviceMask: [false, true, false] },
    { id: 'party', name: '聚会', icon: PhConfetti, brightness: 100, colorTemp: 3500, deviceMask: [true, false, true] },
    { id: 'custom', name: '自定义', icon: PhGear, brightness: 60, colorTemp: 4500, deviceMask: [true, true, true] },
]

const activeScene = ref<string>('custom')

// ── Global Controls ───────────────────────────────────
const brightness = ref(70)
const colorTemp = ref(3800)

// Sync brightness/colorTemp to all active devices
watch(brightness, (val) => {
  devices.forEach((d) => { if (d.on) d.brightness = val })
})
watch(colorTemp, (val) => {
  devices.forEach((d) => { if (d.on) d.colorTemp = val })
})

// ── Derived ────────────────────────────────────────────
function kelvinToRGB(k: number): string {
  // Approximate black-body color temperature to RGB
  let r: number, g: number, b: number
  const temp = k / 100
  // Red
  if (temp <= 66) r = 255
  else r = 329.698727446 * Math.pow(temp - 60, -0.1332047592)
  // Green
  if (temp <= 66) g = 99.4708025861 * Math.log(temp) - 161.1195681661
  else g = 288.1221695283 * Math.pow(temp - 60, -0.0755148492)
  // Blue
  if (temp >= 66) b = 255
  else if (temp <= 19) b = 0
  else b = 138.5177312231 * Math.log(temp - 10) - 305.0447927307
  return `rgb(${Math.min(255, Math.max(0, Math.round(r)))}, ${Math.min(255, Math.max(0, Math.round(g)))}, ${Math.min(255, Math.max(0, Math.round(b)))})`
}

function deviceColor(idx: number): string {
  const d = devices[idx]
  if (!d.on) return 'var(--color-border)'
  return kelvinToRGB(d.colorTemp)
}

// ── Room Ambient ──────────────────────────────────────
const ambientStyle = computed(() => {
  const onDevices = devices.filter(d => d.on)
  if (onDevices.length === 0) return { opacity: 0 }

  // Average color temp of active devices
  const avgTemp = onDevices.reduce((s, d) => s + d.colorTemp, 0) / onDevices.length
  const avgBri = onDevices.reduce((s, d) => s + d.brightness, 0) / onDevices.length
  const color = kelvinToRGB(Math.round(avgTemp))
  const opacity = (avgBri / 100) * 0.6

  return {
    background: `radial-gradient(circle at 50% 40%, ${color} 0%, transparent 70%)`,
    opacity,
  }
})

// ── Toggle Device ─────────────────────────────────────
function toggleDevice(idx: number) {
  const d = devices[idx]
  d.on = !d.on
  // Update brightness/colorTemp to reflect current active device
  syncGlobalFromActive()
  // Update activeScene
  updateActiveScene()
}

function toggleAll(on: boolean) {
  devices.forEach((d) => { d.on = on })
  syncGlobalFromActive()
  updateActiveScene()
}

function syncGlobalFromActive() {
  const active = devices.filter(d => d.on)
  if (active.length > 0) {
    brightness.value = Math.round(active.reduce((s, d) => s + d.brightness, 0) / active.length)
    colorTemp.value = Math.round(active.reduce((s, d) => s + d.colorTemp, 0) / active.length)
  }
}

function updateActiveScene() {
  const mask = devices.map(d => d.on)
  const match = scenes.find(s =>
    s.deviceMask.every((v, i) => v === mask[i])
  )
  activeScene.value = match?.id ?? 'custom'
}

// ── Apply Scene ───────────────────────────────────────
function applyScene(id: string) {
  const scene = scenes.find(s => s.id === id)
  if (!scene) return
  activeScene.value = id
  devices.forEach((d, i) => {
    d.on = scene.deviceMask[i]
    d.brightness = scene.brightness
    d.colorTemp = scene.colorTemp
  })
  brightness.value = scene.brightness
  colorTemp.value = scene.colorTemp
  animateTransition()
}

// ── GSAP Animations ───────────────────────────────────
const rootRef = ref<HTMLElement | null>(null)
const roomRef = ref<HTMLElement | null>(null)
const glowRef = ref<HTMLElement | null>(null)
const ambientRef = ref<HTMLElement | null>(null)

let entranceCtx: gsap.Context | null = null

function animateTransition() {
  if (!glowRef.value) return
  gsap.fromTo(glowRef.value,
    { scale: 1.08, opacity: 0.8 },
    { scale: 1, opacity: 0, duration: 0.6, ease: 'power2.out' }
  )
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

onMounted(() => {
  if (!rootRef.value) return

  if (prefersReducedMotion()) {
    gsap.set(rootRef.value, { opacity: 1 })
    return
  }

  entranceCtx = gsap.context(() => {
    // Entrance animation
    const sections = rootRef.value!.querySelectorAll<HTMLElement>('.room-preview, .control-section')
    gsap.from(sections, {
      y: 24,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'transform',
    })
  }, rootRef.value)

  // Initial glow
  gsap.set(glowRef.value, { scale: 1, opacity: 0 })
})

onBeforeUnmount(() => {
  entranceCtx?.revert()
})

// ── Brightness Slider ─────────────────────────────────
const brightnessTrackRef = ref<HTMLElement | null>(null)
const brightnessFillRef = ref<HTMLElement | null>(null)
const brightnessThumbRef = ref<HTMLElement | null>(null)
const isBrightnessDragging = ref(false)

function brightnessPointerToValue(clientX: number): number {
  const track = brightnessTrackRef.value
  if (!track) return brightness.value
  const rect = track.getBoundingClientRect()
  const t = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
  return Math.round(t * 100)
}

function onBrightnessPointerDown(e: PointerEvent) {
  if (e.button !== 0) return
  isBrightnessDragging.value = true
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  const val = brightnessPointerToValue(e.clientX)
  brightness.value = val
  // Update all active devices
  devices.forEach((d) => { if (d.on) d.brightness = val })
  e.preventDefault()
}

function onBrightnessPointerMove(e: PointerEvent) {
  if (!isBrightnessDragging.value) return
  const val = brightnessPointerToValue(e.clientX)
  brightness.value = val
  devices.forEach((d) => { if (d.on) d.brightness = val })
}

function onBrightnessPointerUp() {
  isBrightnessDragging.value = false
  updateActiveScene()
}
</script>

<style scoped>
.smartlight-demo {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  padding: var(--space-8) 0;
  max-width: 780px;
  margin: 0 auto;
}

/* ── Room Preview ─────────────────────────────────── */
.room-preview {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  isolation: isolate;
}

.room-ambient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  transition: opacity 0.5s ease;
}

.room-glow {
  position: absolute;
  inset: -40px;
  pointer-events: none;
  z-index: 2;
  background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 60%);
  border-radius: 50%;
  opacity: 0;
}

.room-svg {
  position: relative;
  z-index: 3;
  width: 100%;
  height: auto;
  display: block;
}

.light-fixture {
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.light-fixture:hover {
  opacity: 0.8;
}

.light-fixture.desk {
  cursor: pointer;
}

.light-pulse {
  animation: pulse 2s ease-in-out infinite;
}

.light-pulse.delay {
  animation-delay: 0.6s;
}

@keyframes pulse {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.55; }
}

/* ── Control Panel ─────────────────────────────────── */
.control-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.control-section {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.section-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-4);
}

/* ── Device List ───────────────────────────────────── */
.device-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.device-card {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background var(--transition-fast), border-color var(--transition-fast);
  border: 1px solid transparent;
}

.device-card:hover {
  background: var(--color-surface);
}

.device-card.active {
  background: var(--color-surface);
  border-color: var(--color-border);
}

.device-icon-wrap {
  flex-shrink: 0;
}

.device-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition-base);
}

.device-info {
  flex: 1;
  min-width: 0;
}

.device-name {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  margin-bottom: 2px;
}

.device-status {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.device-status.on {
  color: var(--color-success);
}

.device-toggle {
  width: 42px;
  height: 24px;
  border-radius: var(--radius-full);
  background: var(--color-surface-hover);
  border: 1px solid var(--color-border);
  padding: 2px;
  transition: background var(--transition-fast), border-color var(--transition-fast);
  flex-shrink: 0;
}

.device-toggle.on {
  background: var(--color-accent);
  border-color: var(--color-accent);
}

.toggle-knob {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast);
}

.device-toggle.on .toggle-knob {
  transform: translateX(18px);
}

/* ── Slider ─────────────────────────────────────────── */
.slider-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.slider-header .section-label {
  margin-bottom: 0;
}

.slider-value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  font-variant-numeric: tabular-nums;
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
}

.slider-track {
  position: relative;
  height: 24px;
  cursor: pointer;
  touch-action: pan-y;
}

.slider-track::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 6px;
  background: var(--color-surface-hover);
  border-radius: var(--radius-full);
  pointer-events: none;
}

.slider-fill {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 6px;
  background: var(--color-accent);
  border-radius: var(--radius-full) 0 0 var(--radius-full);
  pointer-events: none;
  transition: width 0.05s;
  width: v-bind(brightness + '%');
}

.slider-thumb {
  position: absolute;
  top: 50%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--color-accent);
  transform: translate(-50%, -50%);
  box-shadow: var(--shadow-md);
  pointer-events: none;
  transition: left 0.05s;
}

.slider-marks {
  display: flex;
  justify-content: space-between;
  padding: 0 2px;
  margin-top: var(--space-2);
}

.slider-marks span {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

/* ── Color Temperature ──────────────────────────────── */
.temp-bar {
  position: relative;
  height: 32px;
  display: flex;
  align-items: center;
}

.temp-gradient {
  width: 100%;
  height: 10px;
  border-radius: var(--radius-full);
  background: linear-gradient(to right, #ff8c42, #fff5b0, #c9e2ff);
  pointer-events: none;
}

.temp-thumb {
  position: absolute;
  top: 50%;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--color-accent);
  transform: translate(-50%, -50%);
  box-shadow: var(--shadow-md);
  pointer-events: none;
  z-index: 2;
}

.temp-range {
  position: absolute;
  inset: 0;
  width: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
}

/* ── Scene Selection ────────────────────────────────── */
.scene-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
}

.scene-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-2);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.scene-btn:hover {
  border-color: var(--color-accent-alt);
  color: var(--color-accent-alt);
}

.scene-btn.active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
}

/* ── Responsive ─────────────────────────────────────── */
@media (max-width: 600px) {
  .smartlight-demo {
    padding: var(--space-4) 0;
    gap: var(--space-6);
  }

  .control-section {
    padding: var(--space-4);
  }

  .scene-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>