<template>
  <div class="page-projects">
    <div class="container">
      <!-- Hero -->
      <div ref="heroRef" class="projects-hero">
        <h1 class="hero-title">项目展示</h1>
        <p class="hero-subtitle">浏览我的作品集，查看交互式在线演示</p>
      </div>

      <!-- Cards Grid -->
      <div ref="gridRef" class="projects-grid">
        <router-link
          v-for="(project, idx) in projects"
          :key="project.path"
          :to="project.path"
          class="project-card"
          :style="{ '--card-delay': idx * 0.12 + 's' }"
        >
          <div class="card-icon" :class="`card-icon--${project.theme}`">
            <span v-html="project.icon"></span>
          </div>
          <div class="card-body">
            <div class="card-heading">
              <h3 class="card-title">{{ project.title }}</h3>
              <span class="card-label">{{ project.label }}</span>
            </div>
            <div class="card-tags">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="card-tag"
              >{{ tag }}</span>
            </div>
            <p class="card-desc">{{ project.desc }}</p>
            <div class="card-cta">
              <span class="cta-link">查看演示</span>
              <svg
                class="cta-arrow"
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

interface Project {
  title: string
  label: string
  path: string
  icon: string
  theme: string
  tags: string[]
  desc: string
}

const heroRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)
let heroTween: ReturnType<typeof gsap.fromTo> | null = null
let cardsTween: ReturnType<typeof gsap.fromTo> | null = null

const projects: Project[] = [
  {
    title: '数据中心温度监控',
    label: 'Server IoT',
    path: '/projects/datacenter',
    theme: 'blue',
    icon: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 14.76a3.5 3.5 0 1 0-4 0"/>
      <path d="M12 12v4"/>
      <path d="M6 12.5A5.5 5.5 0 0 0 6 3a5.5 5.5 0 0 0 0 9.5"/>
      <path d="M18 12.5A5.5 5.5 0 0 0 18 3a5.5 5.5 0 0 0 0 9.5"/>
      <path d="M12 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>`,
    tags: ['Tauri', 'Chart.js', 'GSAP'],
    desc: '远程机柜环境实时监控，基于 NleCloud API 采集温湿度数据并可视化展示。',
  },
  {
    title: '智能灯光系统',
    label: 'Smart Home',
    path: '/projects/smartlight',
    theme: 'amber',
    icon: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5a4.5 4.5 0 1 0-7.5-3.5"/>
      <path d="M14 17c0 1.1-.9 2-2 2s-2-.9-2-2"/>
      <path d="M12 2v1"/>
      <path d="M12 19v3"/>
      <path d="M4.22 4.22l.7.7"/>
      <path d="M19.08 4.92l-.7.7"/>
      <path d="M1 12h1"/>
      <path d="M22 12h1"/>
    </svg>`,
    tags: ['Tauri', 'Chart.js', 'GSAP', 'MQTT'],
    desc: '交互式智能照明模拟器，支持多设备独立控制、亮度色温调节与场景模式切换。',
  },
  {
    title: '冷库温度监控',
    label: 'Food IoT',
    path: '/projects/mlytemp',
    theme: 'cyan',
    icon: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2v18"/>
      <path d="M8 16l4 4 4-4"/>
      <path d="M8 8l4-4 4 4"/>
      <path d="M4 6v12"/>
      <path d="M20 6v12"/>
      <path d="M16 18h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2"/>
      <path d="M8 18H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"/>
    </svg>`,
    tags: ['Tauri', 'Chart.js', 'GSAP', 'IoT'],
    desc: '食品冷库多分区温湿度实时监控与报警系统，确保冷链存储安全合规。',
  },
]

onMounted(() => {
  if (heroRef.value) {
    heroTween = gsap.fromTo(
      heroRef.value,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
    )
  }

  if (gridRef.value) {
    const cards = gridRef.value.querySelectorAll<HTMLElement>('.project-card')
    if (cards.length) {
      cardsTween = gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.2,
        },
      )
    }
  }
})

onBeforeUnmount(() => {
  heroTween?.kill()
  cardsTween?.kill()
})
</script>

<style scoped>
.page-projects {
  padding: var(--space-20) 0 var(--space-24);
  min-height: calc(100dvh - var(--nav-height));
}

/* Hero */
.projects-hero {
  margin-bottom: var(--space-12);
}

.hero-title {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-tight);
  line-height: var(--line-height-tight);
  color: var(--color-text);
  margin-bottom: var(--space-3);
}

.hero-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  max-width: 480px;
}

/* Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

/* Card */
.project-card {
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base),
    border-color var(--transition-base);
  text-decoration: none;
  color: inherit;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-text-tertiary);
}

/* Icon area */
.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 108px;
  flex-shrink: 0;
}

.card-icon svg {
  width: 36px;
  height: 36px;
}

.card-icon--blue {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  color: #2563eb;
}

.card-icon--amber {
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  color: #d97706;
}

.card-icon--cyan {
  background: linear-gradient(135deg, #ecfeff 0%, #cffafe 100%);
  color: #0891b2;
}

/* Body */
.card-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-6);
  flex: 1;
}

.card-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-2);
}

.card-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  line-height: var(--line-height-tight);
}

.card-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-tertiary);
  white-space: nowrap;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

/* Tags */
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.card-tag {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 var(--space-2);
  font-size: 11px;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  white-space: nowrap;
}

/* Description */
.card-desc {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
  flex: 1;
}

/* CTA */
.card-cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-accent);
  transition: gap var(--transition-fast);
  align-self: flex-start;
  margin-top: var(--space-1);
}

.project-card:hover .card-cta {
  gap: var(--space-2);
}

.cta-arrow {
  transition: transform var(--transition-fast);
}

.project-card:hover .cta-arrow {
  transform: translateX(2px);
}

/* Responsive */
@media (max-width: 1023px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .page-projects {
    padding: var(--space-12) 0 var(--space-16);
  }

  .projects-hero {
    margin-bottom: var(--space-8);
  }

  .hero-title {
    font-size: var(--font-size-3xl);
  }

  .hero-subtitle {
    font-size: var(--font-size-base);
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .card-icon {
    height: 88px;
  }

  .card-icon svg {
    width: 28px;
    height: 28px;
  }
}
</style>