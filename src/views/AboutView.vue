<template>
  <div class="page-about">
    <!-- Profile Section -->
    <section ref="profileRef" class="profile">
      <div class="container">
        <div class="profile__grid">
          <div class="profile__avatar-wrap">
            <div class="profile__avatar" aria-label="头像占位">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="28" cy="20" r="10" stroke="currentColor" stroke-width="1.5" />
                <path d="M12 48c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </div>
          </div>
          <div class="profile__content">
            <h1 class="profile__name">独立开发者</h1>
            <p class="profile__title">全栈开发者 / 独立开发者</p>
            <p class="profile__bio">
              专注于 Web 全栈开发与桌面端应用构建，拥有多年项目开发经验。
              擅长 Vue 3、React、Node.js 等技术栈，熟悉从需求分析到部署上线的完整流程。
              致力于为客户交付高质量、可维护的软件产品。
            </p>
            <div class="profile__meta">
              <div class="profile__meta-item">
              <PhBriefcase :size="16" weight="duotone" />
              <span>独立开发</span>
            </div>
            <div class="profile__meta-item">
              <PhMapPin :size="16" weight="duotone" />
              <span>远程 / 中国</span>
            </div>
            <div class="profile__meta-item">
              <PhClock :size="16" weight="duotone" />
              <span>5+ 年经验</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section ref="statsRef" class="stats">
      <div class="container">
        <div class="stats__grid">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            class="stat-card"
          >
            <span class="stat-card__value">
              {{ stat.displayValue }}<span class="stat-card__suffix">{{ stat.suffix }}</span>
            </span>
            <span class="stat-card__label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section ref="skillsRef" class="skills">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">技术栈</h2>
        </div>
        <div class="skills__groups">
          <div
            v-for="(group, index) in skillGroups"
            :key="group.category"
            ref="skillGroupRefs"
            :data-index="index"
            class="skills__group"
          >
            <h3 class="skills__category">{{ group.category }}</h3>
            <div class="skills__tags">
              <span
                v-for="tech in group.items"
                :key="tech"
                class="skill-pill"
              >{{ tech }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section ref="experienceRef" class="experience">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">相关经验</h2>
          <p class="section-desc">以下为过往完成的项目类型，涵盖多种技术领域</p>
        </div>
        <div ref="cardsRef" class="experience__grid">
          <article
            v-for="(item, index) in experienceItems"
            :key="index"
            class="experience-card"
          >
            <div class="experience-card__icon">
              <component :is="item.icon" :size="28" weight="duotone" />
            </div>
            <h3 class="experience-card__title">{{ item.title }}</h3>
            <p class="experience-card__desc">{{ item.description }}</p>
            <div class="experience-card__tags">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="mini-pill"
              >{{ tag }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Quick Start Section -->
    <section ref="quickstartRef" class="quickstart">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">快速入门</h2>
          <p class="section-desc">简单几步，开始你的毕设之旅</p>
        </div>

        <!-- Steps -->
        <div ref="stepsRef" class="steps">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="step"
          >
            <div class="step__circle">
              <span class="step__number">{{ index + 1 }}</span>
            </div>
            <h3 class="step__title">{{ step.title }}</h3>
            <ul class="step__list">
              <li v-for="item in step.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>

        <!-- FAQ -->
        <div ref="faqRef" class="faq">
          <div class="faq__header">
            <h3 class="faq__title">常见问题</h3>
          </div>
          <div class="faq__items">
            <div
              v-for="(item, index) in faqItems"
              :key="index"
              class="faq-item"
              :class="{ 'faq-item--open': item.open }"
            >
              <button
                class="faq-item__trigger"
                @click="toggleFaq(index)"
                :aria-expanded="item.open"
              >
                <span class="faq-item__q">Q: {{ item.q }}</span>
                <span class="faq-item__icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
              </button>
              <div class="faq-item__content" ref="faqContentRefs">
                <p class="faq-item__a">A: {{ item.a }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Prompt Section -->
    <section ref="contactRef" class="contact">
      <div class="container">
        <div class="contact__card">
          <h2 class="contact__heading">有项目需求？</h2>
          <p class="contact__text">无论是毕设项目、Web 应用还是桌面工具，欢迎联系咨询</p>
          <div class="contact__actions">
            <div class="contact__qr-wrap">
              <div class="contact__qr" aria-label="微信二维码">
                <img src="/wx.jpg" alt="微信二维码" class="contact__qr-img" />
              </div>
              <p class="contact__qr-id">微信: QZZT0NGW1thme</p>
            </div>
            <div class="contact__info-text">
              <p>QQ: 2537785558</p>
              <p>微信: QZZT0NGW1thme</p>
            </div>
            <router-link to="/submit" class="contact__cta">
              <PhPaperPlaneTilt :size="18" weight="bold" />
              提交需求表单
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  PhBriefcase,
  PhMapPin,
  PhClock,
  PhGlobe,
  PhDevices,
  PhCpu,
  PhGitBranch,
  PhPaperPlaneTilt,
} from '@phosphor-icons/vue'

gsap.registerPlugin(ScrollTrigger)

// --- Stats Data ---
interface StatItem {
  label: string
  target: number
  suffix: string
  displayValue: number
}

const stats = reactive<StatItem[]>([
  { label: '已完成项目', target: 30, suffix: '+', displayValue: 0 },
  { label: '开发经验', target: 5, suffix: '年+', displayValue: 0 },
  { label: '满意客户', target: 50, suffix: '+', displayValue: 0 },
])

// --- Skills Data ---
interface SkillGroup {
  category: string
  items: string[]
}

const skillGroups: SkillGroup[] = [
  {
    category: '前端',
    items: ['Vue 3', 'React', 'TypeScript', 'GSAP', 'Tailwind CSS', 'Chart.js'],
  },
  {
    category: '后端',
    items: ['Node.js', 'Express', 'Python', 'MySQL', 'MongoDB'],
  },
  {
    category: '桌面 / 跨端',
    items: ['Tauri', 'Electron'],
  },
  {
    category: '工具',
    items: ['Git', 'Docker', 'Linux'],
  },
]

// --- Experience Data ---
interface ExperienceItem {
  title: string
  description: string
  tags: string[]
  icon: object
}

const experienceItems: ExperienceItem[] = [
  {
    title: '数据可视化仪表板',
    description: '基于 Vue 3 + Chart.js 构建的实时数据监控面板，支持多维度数据展示与交互式图表',
    tags: ['Vue 3', 'Chart.js', '实时数据'],
    icon: PhGlobe,
  },
  {
    title: '跨端桌面应用',
    description: '使用 Tauri 框架开发轻量级桌面应用，兼顾 Web 开发效率与原生性能',
    tags: ['Tauri', 'Rust', 'Vue 3'],
    icon: PhDevices,
  },
  {
    title: 'IoT 设备管理系统',
    description: '物联网设备接入与控制平台，集成传感器数据采集、远程指令下发与告警通知',
    tags: ['MQTT', 'Node.js', 'MySQL'],
    icon: PhCpu,
  },
  {
    title: '版本协作与 CI/CD',
    description: '基于 Git 的团队协作工作流与自动化部署流水线，涵盖代码审查、测试与发布',
    tags: ['Git', 'Docker', 'CI/CD'],
    icon: PhGitBranch,
  },
]

// --- Quick Start Data ---
interface StepItem {
  title: string
  items: string[]
}

const steps: StepItem[] = [
  {
    title: '提交需求',
    items: [
      '填写需求表单，说明毕业设计题目、技术要求、预算范围',
      '可上传参考文档或截图',
    ],
  },
  {
    title: '确认方案',
    items: [
      '我会在24小时内回复',
      '沟通确认技术方案和报价',
      '签订简单确认单',
    ],
  },
  {
    title: '开发交付',
    items: [
      '分阶段交付，每阶段确认后再继续',
      '标准项目7-14天完成',
      '提供完整源码+使用文档',
    ],
  },
  {
    title: '售后支持',
    items: [
      '交付后1个月免费维护',
      '解答答辩相关问题',
      '提供部署指导',
    ],
  },
]

interface FaqItem {
  q: string
  a: string
  open: boolean
}

const faqItems = reactive<FaqItem[]>([
  {
    q: '支持哪些技术栈？',
    a: '前端支持 Vue/React/微信小程序；后端支持 Node.js/Python/Java/PHP；数据库支持 MySQL/PostgreSQL/MongoDB。',
    open: false,
  },
  {
    q: '价格怎么算？',
    a: '基础项目288元起，具体价格根据功能复杂度、紧急程度评估。',
    open: false,
  },
  {
    q: '交付方式？',
    a: '提供完整项目源码、使用文档、部署教程。支持远程协助部署。',
    open: false,
  },
  {
    q: '可以加急吗？',
    a: '可以，加急项目需要额外费用，具体沟通确认。',
    open: false,
  },
  {
    q: '推荐朋友有优惠吗？',
    a: '有！推荐朋友下单，双方各减50元，上不封顶。',
    open: false,
  },
])

function toggleFaq(index: number) {
  faqItems[index].open = !faqItems[index].open
}

// --- Refs ---
const profileRef = ref<HTMLElement | null>(null)
const statsRef = ref<HTMLElement | null>(null)
const skillsRef = ref<HTMLElement | null>(null)
const skillGroupRefs = ref<HTMLElement[]>([])
const cardsRef = ref<HTMLElement | null>(null)
const experienceRef = ref<HTMLElement | null>(null)
const quickstartRef = ref<HTMLElement | null>(null)
const stepsRef = ref<HTMLElement | null>(null)
const faqRef = ref<HTMLElement | null>(null)
const faqContentRefs = ref<HTMLElement[]>([])
const contactRef = ref<HTMLElement | null>(null)

// --- GSAP Cleanup ---
let profileTween: ReturnType<typeof gsap.from> | null = null
let skillsCtx: ReturnType<typeof gsap.context> | null = null
let cardsCtx: ReturnType<typeof gsap.context> | null = null
let contactTween: ReturnType<typeof gsap.from> | null = null
let cardTriggers: ScrollTrigger[] = []

onMounted(() => {
  // Profile fade-in
  if (profileRef.value) {
    profileTween = gsap.from(profileRef.value.querySelector('.profile__grid'), {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })
  }

  // Stats counter animation
  if (statsRef.value) {
    const counters = statsRef.value.querySelectorAll<HTMLElement>('.stat-card')
    const st = ScrollTrigger.create({
      trigger: statsRef.value,
      start: 'top 85%',
      onEnter: () => {
        stats.forEach((stat) => {
          gsap.to(stat, {
            displayValue: stat.target,
            duration: 1.6,
            ease: 'power2.out',
            snap: { displayValue: 1 },
            onUpdate: () => {
              // Ensure reactive update triggers
              stat.displayValue = Math.round(stat.displayValue)
            },
          })
        })
        counters.forEach((card, i) => {
          gsap.from(card, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power3.out',
          })
        })
      },
      once: true,
    })
    cardTriggers.push(st)
  }

  // Skills stagger reveal
  if (skillsRef.value) {
    const groups = skillsRef.value.querySelectorAll<HTMLElement>('.skills__group')
    skillsCtx = gsap.context(() => {
      groups.forEach((group, i) => {
        const st = ScrollTrigger.create({
          trigger: group,
          start: 'top 85%',
          onEnter: () => {
            gsap.from(group, {
              y: 30,
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
    })
  }

  // Quick start steps stagger on scroll
  if (stepsRef.value) {
    const stepElements = stepsRef.value.querySelectorAll<HTMLElement>('.step')
    stepElements.forEach((step, i) => {
      const st = ScrollTrigger.create({
        trigger: step,
        start: 'top 88%',
        onEnter: () => {
          gsap.from(step, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.12,
            ease: 'power3.out',
          })
        },
        once: true,
      })
      cardTriggers.push(st)
    })
  }

  // FAQ items reveal on scroll
  if (faqRef.value) {
    const faqEls = faqRef.value.querySelectorAll<HTMLElement>('.faq-item')
    faqEls.forEach((item, i) => {
      const st = ScrollTrigger.create({
        trigger: item,
        start: 'top 88%',
        onEnter: () => {
          gsap.from(item, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            delay: i * 0.08,
            ease: 'power3.out',
          })
        },
        once: true,
      })
      cardTriggers.push(st)
    })
  }

  // Experience cards stagger on scroll
  if (cardsRef.value) {
    const cards = cardsRef.value.querySelectorAll<HTMLElement>('.experience-card')
    cardsCtx = gsap.context(() => {
      cards.forEach((card, i) => {
        const st = ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => {
            gsap.from(card, {
              y: 40,
              opacity: 0,
              duration: 0.6,
              delay: i * 0.12,
              ease: 'power3.out',
            })
          },
          once: true,
        })
        cardTriggers.push(st)
      })
    })
  }

  // Contact section fade-in
  if (contactRef.value) {
    contactTween = gsap.from(contactRef.value.querySelector('.contact__card'), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: contactRef.value,
        start: 'top 85%',
      },
    })
  }
})

onBeforeUnmount(() => {
  profileTween?.kill()
  skillsCtx?.revert()
  cardsCtx?.revert()
  contactTween?.kill()
  cardTriggers.forEach((st) => st.kill())
})
</script>

<style scoped>
/* ========== Page ========== */
.page-about {
  padding-top: var(--space-8);
}

/* ========== Section Shared ========== */
.section-header {
  margin-bottom: var(--space-10);
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

/* ========== Profile Section ========== */
.profile {
  padding: var(--space-20) 0 var(--space-24);
}

.profile__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
  align-items: center;
}

@media (min-width: 768px) {
  .profile__grid {
    grid-template-columns: auto 1fr;
    gap: var(--space-12);
  }
}

.profile__avatar-wrap {
  display: flex;
  justify-content: center;
}

.profile__avatar {
  width: 128px;
  height: 128px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
  flex-shrink: 0;
}

.profile__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.profile__name {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text);
}

.profile__title {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

.profile__bio {
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
  max-width: 580px;
}

.profile__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
  margin-top: var(--space-2);
}

.profile__meta-item {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
}

/* ========== Skills Section ========== */
.skills {
  padding: var(--space-24) 0;
  background-color: var(--color-surface);
}

.skills__groups {
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
}

.skills__group {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

@media (min-width: 640px) {
  .skills__group {
    flex-direction: row;
    align-items: baseline;
    gap: var(--space-8);
  }
}

.skills__category {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-tertiary);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  min-width: 100px;
  flex-shrink: 0;
}

.skills__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.skill-pill {
  display: inline-flex;
  padding: var(--space-1) var(--space-3);
  font-size: var(--font-size-xs);
  font-family: var(--font-mono);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  line-height: 1.4;
  letter-spacing: var(--letter-spacing-normal);
  background: var(--color-bg);
  transition: border-color var(--transition-fast), color var(--transition-fast);
}

.skill-pill:hover {
  border-color: var(--color-text);
  color: var(--color-text);
}

/* ========== Experience Section ========== */
.experience {
  padding: var(--space-24) 0;
}

.experience__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 640px) {
  .experience__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .experience__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.experience-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.experience-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.experience-card__icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
  margin-bottom: var(--space-1);
}

.experience-card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text);
}

.experience-card__desc {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
  flex: 1;
}

.experience-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  margin-top: var(--space-2);
}

.mini-pill {
  display: inline-flex;
  padding: 2px var(--space-2);
  font-size: 0.6875rem;
  font-family: var(--font-mono);
  color: var(--color-text-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  line-height: 1.3;
}

/* ========== Statistics Section ========== */
.stats {
  padding: var(--space-20) 0;
  background-color: var(--color-bg);
}

.stats__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 640px) {
  .stats__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.stat-card {
  padding: var(--space-8);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  text-align: center;
}

.stat-card__value {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text);
  line-height: 1;
  font-family: var(--font-mono);
}

.stat-card__suffix {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
}

.stat-card__label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
}

/* ========== Quick Start Section ========== */
.quickstart {
  padding: var(--space-24) 0;
  background-color: var(--color-bg);
}

.steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
  margin-bottom: var(--space-20);
  position: relative;
}

@media (min-width: 640px) {
  .steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .steps {
    grid-template-columns: repeat(4, 1fr);
  }
}

.step {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  position: relative;
}

.step__circle {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-2);
  flex-shrink: 0;
}

.step__number {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-bg);
  font-family: var(--font-mono);
  line-height: 1;
}

.step__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text);
}

.step__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.step__list li {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
  padding-left: var(--space-4);
  position: relative;
}

.step__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 4px;
  height: 4px;
  border-radius: var(--radius-full);
  background: var(--color-text-tertiary);
}

/* FAQ */
.faq {
  max-width: 680px;
  margin: 0 auto;
}

.faq__header {
  margin-bottom: var(--space-8);
  text-align: center;
}

.faq__title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text);
}

.faq__items {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.faq-item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  overflow: hidden;
  transition: border-color var(--transition-base);
}

.faq-item--open {
  border-color: var(--color-accent);
}

.faq-item__trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-sans);
  text-align: left;
  color: var(--color-text);
  transition: background-color var(--transition-fast);
}

.faq-item__trigger:hover {
  background: var(--color-surface-hover);
}

.faq-item__q {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  flex: 1;
}

.faq-item__icon {
  flex-shrink: 0;
  color: var(--color-text-tertiary);
  display: flex;
  align-items: center;
  transition: transform var(--transition-base);
}

.faq-item--open .faq-item__icon {
  transform: rotate(-180deg);
}

.faq-item__content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--transition-slow);
}

.faq-item--open .faq-item__content {
  grid-template-rows: 1fr;
}

.faq-item__content > p {
  overflow: hidden;
  padding: 0 var(--space-5);
}

.faq-item--open .faq-item__content > p {
  padding-top: 0;
  padding-bottom: var(--space-4);
}

.faq-item__a {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
}

/* ========== Contact Section ========== */
.contact {
  padding: var(--space-24) 0;
  background-color: var(--color-surface);
}

.contact__card {
  max-width: 520px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
}

.contact__heading {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text);
}

.contact__text {
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
  max-width: 400px;
}

.contact__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
  margin-top: var(--space-2);
  padding-bottom: var(--space-8);
}

.contact__qr-wrap {
  width: 240px;
  height: 240px;
}

.contact__qr {
  width: 100%;
  height: 100%;
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

.contact__qr-img {
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

.contact__qr-id {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-top: var(--space-1);
}

.contact__info-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  text-align: center;
}

.contact__info-text p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.contact__cta {
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

.contact__cta:hover {
  background-color: var(--color-accent-hover);
  transform: translateY(-1px);
}

.contact__cta:active {
  transform: translateY(0);
}

/* ========== Mobile Adjustments ========== */
@media (max-width: 767px) {
  .profile {
    padding: var(--space-12) 0 var(--space-16);
  }

  .profile__name {
    font-size: var(--font-size-2xl);
  }

  .skills,
  .experience,
  .contact {
    padding: var(--space-16) 0;
  }

  .stats {
    padding: var(--space-16) 0;
  }

  .quickstart {
    padding: var(--space-16) 0;
  }

  .steps {
    grid-template-columns: 1fr;
    gap: var(--space-4);
    margin-bottom: var(--space-16);
  }

  .step {
    padding: var(--space-5);
  }

  .faq__title {
    font-size: var(--font-size-xl);
  }

  .faq-item__trigger {
    padding: var(--space-3) var(--space-4);
  }

  .stat-card {
    padding: var(--space-6);
  }

  .stat-card__value {
    font-size: var(--font-size-3xl);
  }

  .stat-card__suffix {
    font-size: var(--font-size-xl);
  }

  .section-title {
    font-size: var(--font-size-2xl);
  }

  .contact__heading {
    font-size: var(--font-size-2xl);
  }

  .contact__actions {
    width: 100%;
  }

  .contact__cta {
    width: 100%;
    justify-content: center;
  }
}
</style>
