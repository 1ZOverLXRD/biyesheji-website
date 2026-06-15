<template>
  <div class="page-home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div ref="heroRef" class="hero-content">
          <h1 class="hero-title">代做毕设 · 专业编程服务</h1>
          <p class="hero-subtext">基于真实项目的交互式演示，涵盖物联网、Web应用与智能系统</p>
          <router-link to="/projects" class="hero-cta">
            浏览项目
            <PhArrowRight :size="18" weight="bold" />
          </router-link>
        </div>
      </div>
    </section>

    <!-- Project Preview Section -->
    <section class="projects-preview">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">精选项目</h2>
          <p class="section-desc">通过交互式Demo查看我们的技术能力</p>
        </div>

        <div ref="cardsRef" class="projects-grid">
          <article
            v-for="project in projects"
            :key="project.id"
            class="project-card"
          >
            <div class="card-screenshot">
              <component :is="project.icon" :size="40" weight="light" />
              <span class="screenshot-label">Demo 预览</span>
            </div>
            <div class="card-body">
              <h3 class="card-title">{{ project.name }}</h3>
              <p class="card-desc">{{ project.description }}</p>
              <div class="card-tech">
                <span
                  v-for="tag in project.tech"
                  :key="tag"
                  class="tech-pill"
                >{{ tag }}</span>
              </div>
              <router-link :to="project.path" class="card-link">
                查看 Demo
                <PhArrowRight :size="14" weight="bold" />
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Features Section: 为什么选择我 -->
    <section ref="featuresRef" class="features">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">为什么选择我</h2>
          <p class="section-desc">专业、高效、可靠的毕业设计代做服务</p>
        </div>
        <div class="features__grid">
          <article class="feature-card">
            <div class="feature-card__icon">
              <PhCode :size="28" weight="duotone" />
            </div>
            <h3 class="feature-card__title">代码质量保证</h3>
            <p class="feature-card__desc">所有项目遵循工程最佳实践，TypeScript 严格模式，完善的错误处理</p>
          </article>
          <article class="feature-card">
            <div class="feature-card__icon">
              <PhLightning :size="28" weight="duotone" />
            </div>
            <h3 class="feature-card__title">快速交付</h3>
            <p class="feature-card__desc">标准项目 7-14 天交付，紧急项目可加急处理</p>
          </article>
          <article class="feature-card">
            <div class="feature-card__icon">
              <PhChatCircleDots :size="28" weight="duotone" />
            </div>
            <h3 class="feature-card__title">沟通透明</h3>
            <p class="feature-card__desc">全程实时沟通，每周进度汇报，不满意可调整</p>
          </article>
          <article class="feature-card">
            <div class="feature-card__icon">
              <PhCoins :size="28" weight="duotone" />
            </div>
            <h3 class="feature-card__title">价格合理</h3>
            <p class="feature-card__desc">学生优惠定价，无隐形消费，先付定金后开发</p>
          </article>
        </div>
      </div>
    </section>

    <!-- How-it-works Section: 服务流程 -->
    <section ref="stepsRef" class="steps">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">服务流程</h2>
          <p class="section-desc">简单四步，轻松完成毕设</p>
        </div>
        <div class="steps__flow">
          <div class="step">
            <div class="step__circle">1</div>
            <div class="step__line" aria-hidden="true"></div>
            <div class="step__content">
              <div class="step__icon-wrap">
                <PhClipboardText :size="24" weight="duotone" />
              </div>
              <h3 class="step__title">提交需求</h3>
              <p class="step__desc">填写需求表单，描述你的毕业设计题目和要求</p>
            </div>
          </div>
          <div class="step">
            <div class="step__circle">2</div>
            <div class="step__line" aria-hidden="true"></div>
            <div class="step__content">
              <div class="step__icon-wrap">
                <PhChatTeardrop :size="24" weight="duotone" />
              </div>
              <h3 class="step__title">沟通确认</h3>
              <p class="step__desc">一对一沟通，确认技术方案、报价和交付时间</p>
            </div>
          </div>
          <div class="step">
            <div class="step__circle">3</div>
            <div class="step__line" aria-hidden="true"></div>
            <div class="step__content">
              <div class="step__icon-wrap">
                <PhRocketLaunch :size="24" weight="duotone" />
              </div>
              <h3 class="step__title">开发交付</h3>
              <p class="step__desc">按照约定时间开发，分阶段交付项目源码</p>
            </div>
          </div>
          <div class="step">
            <div class="step__circle">4</div>
            <div class="step__line step__line--last" aria-hidden="true"></div>
            <div class="step__content">
              <div class="step__icon-wrap">
                <PhShieldCheck :size="24" weight="duotone" />
              </div>
              <h3 class="step__title">售后保障</h3>
              <p class="step__desc">交付后提供 1 个月免费维护，解答答辩相关问题</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section: 立即咨询 -->
    <section ref="ctaRef" class="cta">
      <div class="container">
        <div class="cta__inner">
          <h2 class="cta__heading">准备好了吗？</h2>
          <p class="cta__text">扫码添加微信或直接提交需求表单，我会在 24 小时内回复</p>
          <div class="cta__actions">
            <div class="cta__qr-wrap">
              <div class="cta__qr" aria-label="微信二维码占位">
                <PhWechatLogo :size="28" weight="duotone" />
                <span class="cta__qr-label">扫码添加微信</span>
              </div>
              <p class="cta__qr-id">微信: QZZT0NGW1thme</p>
            </div>
            <router-link to="/submit" class="cta__btn">
              提交需求
              <PhArrowRight :size="18" weight="bold" />
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  PhArrowRight,
  PhThermometer,
  PhLightbulb,
  PhSnowflake,
  PhCode,
  PhLightning,
  PhChatCircleDots,
  PhCoins,
  PhClipboardText,
  PhChatTeardrop,
  PhRocketLaunch,
  PhShieldCheck,
  PhWechatLogo,
} from '@phosphor-icons/vue'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: string
  name: string
  tech: string[]
  description: string
  path: string
  icon: object
}

const projects: Project[] = [
  {
    id: 'datacenter',
    name: '数据中心温度监控',
    tech: ['Vue 3', 'Chart.js', 'IoT', 'Tauri'],
    description: '实时温度监测与数据可视化仪表板，支持多机房温度追踪',
    path: '/projects/datacenter',
    icon: PhThermometer,
  },
  {
    id: 'smartlight',
    name: '智能灯光系统',
    tech: ['Vue 3', 'GSAP', 'IoT', 'Tauri'],
    description: '智能照明控制与场景管理平台，支持调光调色与定时策略',
    path: '/projects/smartlight',
    icon: PhLightbulb,
  },
  {
    id: 'mlytemp',
    name: '冷库温度监控',
    tech: ['Vue 3', 'Chart.js', 'GSAP', 'Tauri'],
    description: '冷链环境监测与报警系统，保障存储物品质量安全',
    path: '/projects/mlytemp',
    icon: PhSnowflake,
  },
]

const heroRef = ref<HTMLElement | null>(null)
const cardsRef = ref<HTMLElement | null>(null)
const featuresRef = ref<HTMLElement | null>(null)
const stepsRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)

let heroTween: ReturnType<typeof gsap.from> | null = null
let cardsCtx: ReturnType<typeof gsap.context> | null = null
let cardTriggers: ScrollTrigger[] = []

onMounted(() => {
  // Hero fade-in-up animation
  if (heroRef.value) {
    heroTween = gsap.from(heroRef.value, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })
  }

  // Cards stagger on scroll
  if (cardsRef.value) {
    const cards = Array.from(cardsRef.value.querySelectorAll<HTMLElement>('.project-card'))
    cardsCtx = gsap.context(() => {
      cardTriggers = cards.map((card: HTMLElement) => {
        const tween = gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
        return tween.scrollTrigger as ScrollTrigger
      })
    })
  }

  // Features stagger reveal
  if (featuresRef.value) {
    const featureCards = featuresRef.value.querySelectorAll<HTMLElement>('.feature-card')
    featureCards.forEach((card, i) => {
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.from(card, {
            y: 40,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out',
          })
        },
        once: true,
      })
      cardTriggers.push(st)
    })
  }

  // Steps stagger reveal
  if (stepsRef.value) {
    const stepEls = stepsRef.value.querySelectorAll<HTMLElement>('.step')
    stepEls.forEach((step, i) => {
      const st = ScrollTrigger.create({
        trigger: step,
        start: 'top 85%',
        onEnter: () => {
          gsap.from(step, {
            y: 30,
            opacity: 0,
            duration: 0.5,
            delay: i * 0.12,
            ease: 'power3.out',
          })
        },
        once: true,
      })
      cardTriggers.push(st)
    })
  }

  // CTA fade-in
  if (ctaRef.value) {
    const st = ScrollTrigger.create({
      trigger: ctaRef.value,
      start: 'top 85%',
      onEnter: () => {
        gsap.from(ctaRef.value!.querySelector('.cta__inner'), {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
      },
      once: true,
    })
    cardTriggers.push(st)
  }
})

onBeforeUnmount(() => {
  heroTween?.kill()
  cardsCtx?.revert()
  cardTriggers.forEach((st) => st.kill())
})
</script>

<style scoped>
/* ========== Hero Section ========== */
.hero {
  min-height: calc(100dvh - var(--nav-height));
  display: flex;
  align-items: center;
  padding: var(--space-20) 0;
  background-color: var(--color-bg);
}

.hero-content {
  max-width: 720px;
}

.hero-title {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-tight);
  line-height: 1.1;
  color: var(--color-text);
  margin-bottom: var(--space-6);
}

.hero-subtext {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
  max-width: 540px;
  margin-bottom: var(--space-8);
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  background-color: var(--color-accent);
  color: var(--color-bg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  transition: background-color var(--transition-base), transform var(--transition-fast);
}

.hero-cta:hover {
  background-color: var(--color-accent-hover);
  transform: translateY(-1px);
}

.hero-cta:active {
  transform: translateY(0);
}

/* ========== Project Preview Section ========== */
.projects-preview {
  padding: var(--space-24) 0;
  background-color: var(--color-surface);
}

.section-header {
  margin-bottom: var(--space-12);
}

.section-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text);
  margin-bottom: var(--space-2);
}

.section-desc {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  max-width: 480px;
}

/* Grid */
.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Card */
.project-card {
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* Screenshot placeholder */
.card-screenshot {
  aspect-ratio: 16 / 10;
  background-color: var(--color-surface-hover);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  color: var(--color-text-tertiary);
  border-bottom: 1px solid var(--color-border);
}

.screenshot-label {
  font-size: var(--font-size-xs);
  font-family: var(--font-mono);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  opacity: 0.6;
}

.card-body {
  padding: var(--space-6);
}

.card-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text);
  margin-bottom: var(--space-2);
}

.card-desc {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-4);
}

/* Tech pills */
.card-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-5);
}

.tech-pill {
  display: inline-block;
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-size-xs);
  font-family: var(--font-mono);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  line-height: 1.3;
}

/* Card link */
.card-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  padding-bottom: 2px;
  border-bottom: 1px solid transparent;
  transition: border-color var(--transition-fast), gap var(--transition-fast);
}

.card-link:hover {
  border-bottom-color: var(--color-text);
  gap: var(--space-2);
}

/* ========== Features Section ========== */
.features {
  padding: var(--space-24) 0;
  background-color: var(--color-bg);
}

.features__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 640px) {
  .features__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .features__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.feature-card {
  padding: var(--space-8);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.feature-card__icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  margin-bottom: var(--space-1);
}

.feature-card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text);
}

.feature-card__desc {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
}

/* ========== Steps Section (How it works) ========== */
.steps {
  padding: var(--space-24) 0;
  background-color: var(--color-surface);
}

.steps__flow {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  position: relative;
}

@media (min-width: 768px) {
  .steps__flow {
    flex-direction: row;
    gap: var(--space-0);
  }
}

.step {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  position: relative;
  flex: 1;
}

@media (min-width: 768px) {
  .step {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-6);
  }
}

.step__circle {
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: var(--radius-full);
  background: var(--color-accent);
  color: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  font-family: var(--font-mono);
  position: relative;
  z-index: 1;
}

.step__line {
  display: none;
}

@media (min-width: 768px) {
  .step__line {
    display: block;
    position: absolute;
    top: 20px;
    left: calc(50% + 28px);
    width: calc(100% - 56px);
    height: 1px;
    background: repeating-linear-gradient(
      to right,
      var(--color-border) 0,
      var(--color-border) 6px,
      transparent 6px,
      transparent 10px
    );
    z-index: 0;
  }

  .step__line--last {
    display: none;
  }
}

.step__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  flex: 1;
}

@media (min-width: 768px) {
  .step__content {
    align-items: center;
  }
}

.step__icon-wrap {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  margin-bottom: var(--space-1);
}

.step__title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  letter-spacing: var(--letter-spacing-tight);
}

.step__desc {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
  max-width: 260px;
}

@media (min-width: 768px) {
  .step__desc {
    max-width: 220px;
  }
}

/* ========== CTA Section ========== */
.cta {
  padding: var(--space-24) 0;
  background-color: var(--color-bg);
}

.cta__inner {
  max-width: 520px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
}

.cta__heading {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text);
}

.cta__text {
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
  max-width: 400px;
}

.cta__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
  margin-top: var(--space-2);
}

@media (min-width: 640px) {
  .cta__actions {
    flex-direction: row;
    gap: var(--space-8);
  }
}

.cta__qr-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.cta__qr {
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  background: var(--color-bg);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-tertiary);
}

.cta__qr-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.cta__qr-id {
  font-size: var(--font-size-xs);
  font-family: var(--font-mono);
  color: var(--color-text-tertiary);
}

.cta__btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  background-color: var(--color-accent);
  color: var(--color-bg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  transition: background-color var(--transition-base), transform var(--transition-fast);
  text-decoration: none;
}

.cta__btn:hover {
  background-color: var(--color-accent-hover);
  transform: translateY(-1px);
}

.cta__btn:active {
  transform: translateY(0);
}

/* ========== Mobile adjustments ========== */
@media (max-width: 767px) {
  .hero {
    padding: var(--space-16) 0;
    text-align: center;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-title {
    font-size: var(--font-size-3xl);
  }

  .hero-subtext {
    font-size: var(--font-size-base);
    max-width: 100%;
  }

  .hero-cta {
    width: 100%;
    justify-content: center;
  }

  .projects-preview {
    padding: var(--space-16) 0;
  }

  .features {
    padding: var(--space-16) 0;
  }

  .feature-card {
    padding: var(--space-6);
  }

  .steps {
    padding: var(--space-16) 0;
  }

  .step__circle {
    width: 32px;
    height: 32px;
    min-width: 32px;
    font-size: var(--font-size-xs);
  }

  .cta {
    padding: var(--space-16) 0;
  }

  .cta__actions {
    width: 100%;
  }

  .cta__btn {
    width: 100%;
    justify-content: center;
  }

  .section-title {
    font-size: var(--font-size-2xl);
  }

  .section-desc {
    max-width: 100%;
  }
}
</style>
