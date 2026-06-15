<template>
  <div class="page page-pricing">
    <!-- Intro Section -->
    <section class="pricing-intro">
      <div class="container">
        <div class="pricing-intro__content">
          <span class="pricing-intro__label">服务方案</span>
          <h1 class="pricing-intro__title">服务与定价</h1>
          <p class="pricing-intro__desc">
            专注于计算机相关专业毕业设计、课程项目、程序定制开发服务。
            无论是简单的课程作业还是复杂的全栈系统，我们都能提供专业、高效的解决方案。
          </p>
          <p class="pricing-intro__note">
            所有项目严格保密，代码原创可查，交付后提供必要技术支持。
          </p>
        </div>
      </div>
    </section>

    <!-- Pricing Cards Section -->
    <section class="pricing-cards" ref="cardsSection">
      <div class="container">
        <div class="pricing-cards__wrap">
          <div class="pricing-card pricing-card--single" ref="singleCard">
            <div class="pricing-card__header">
              <h3 class="pricing-card__name">毕设代做服务</h3>
              <div class="pricing-card__price">
                <span class="pricing-card__amount">288</span>
                <span class="pricing-card__currency">元起</span>
              </div>
            </div>
            <p class="pricing-card__desc">
              基础方案即涵盖核心需求，具体价格根据项目复杂度评估确定。
            </p>
            <ul class="pricing-card__features">
              <li class="pricing-card__feature">
                <svg class="pricing-card__check" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8.5L6 11.5L13 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span>不限技术栈（Vue / React / Node.js / Python / Java）</span>
              </li>
              <li class="pricing-card__feature">
                <svg class="pricing-card__check" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8.5L6 11.5L13 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span>源码交付 + 文档说明</span>
              </li>
              <li class="pricing-card__feature">
                <svg class="pricing-card__check" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8.5L6 11.5L13 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span>30天售后保障</span>
              </li>
              <li class="pricing-card__feature">
                <svg class="pricing-card__check" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8.5L6 11.5L13 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span>免费部署指导</span>
              </li>
            </ul>
            <router-link to="/submit" class="pricing-card__action pricing-card__action--primary">提交需求获取报价</router-link>
          </div>
        </div>
        <p class="pricing-cards__footnote">
          起步价288元，具体价格根据项目复杂度评估确定。
        </p>
      </div>
    </section>

    <!-- Referral Discount Section -->
    <section class="pricing-referral">
      <div class="container">
        <div class="pricing-referral__card">
          <div class="pricing-referral__icon-row">
            <svg class="pricing-referral__icon" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle cx="12" cy="10" r="5" stroke="currentColor" stroke-width="2"/>
              <path d="M4 28c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <circle cx="22" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
              <path d="M14 22c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <svg class="pricing-referral__arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg class="pricing-referral__icon" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle cx="20" cy="10" r="5" stroke="currentColor" stroke-width="2"/>
              <path d="M12 28c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <circle cx="10" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
              <path d="M18 22c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <h3 class="pricing-referral__title">推荐有礼</h3>
          <p class="pricing-referral__subtitle">拉一人互减50元</p>
          <p class="pricing-referral__desc">
            推荐朋友下单，双方各减50元。朋友通过你的推荐链接或告知你的微信ID下单即可。
          </p>
          <p class="pricing-referral__note">优惠无上限，多推多减</p>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="pricing-faq" ref="faqSection">
      <div class="container">
        <div class="pricing-faq__content">
          <h2 class="pricing-faq__title">常见问题</h2>
          <div class="pricing-faq__list">
            <div
              v-for="(item, index) in faqItems"
              :key="index"
              class="pricing-faq__item"
              :class="{ 'pricing-faq__item--open': item.open }"
            >
              <button
                class="pricing-faq__question"
                @click="toggleFaq(index)"
                :aria-expanded="item.open"
              >
                <span>{{ item.question }}</span>
                <svg
                  class="pricing-faq__arrow"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M6 8L10 12L14 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
              <transition name="faq-fade">
                <div v-if="item.open" class="pricing-faq__answer">
                  <p>{{ item.answer }}</p>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="pricing-cta" ref="ctaSection">
      <div class="container">
        <div class="pricing-cta__content">
          <h2 class="pricing-cta__title">准备好开始了吗？</h2>
          <p class="pricing-cta__desc">
            告诉我你的项目需求，我将为你提供专业的解决方案和准确的报价。
          </p>
          <router-link to="/submit" class="pricing-cta__action">
            提交需求
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// GSAP scroll animations
const cardsSection = ref<HTMLElement | null>(null)
const singleCard = ref<HTMLElement | null>(null)
const faqSection = ref<HTMLElement | null>(null)
const ctaSection = ref<HTMLElement | null>(null)

onMounted(() => {
  // Dynamically import GSAP for scroll animations
  import('gsap').then(({ default: gsap }) => {
    import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger)

      // Animate single pricing card
      if (singleCard.value) {
        gsap.from(singleCard.value, {
          y: 48,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsSection.value,
            start: 'top 80%',
          },
        })
      }

      // Animate FAQ section
      if (faqSection.value) {
        gsap.from(faqSection.value, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: faqSection.value,
            start: 'top 80%',
          },
        })
      }

      // Animate CTA section
      if (ctaSection.value) {
        gsap.from(ctaSection.value.querySelector('.pricing-cta__content'), {
          y: 32,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaSection.value,
            start: 'top 80%',
          },
        })
      }
    })
  })
})

// FAQ accordion
interface FaqItem {
  question: string
  answer: string
  open: boolean
}

const faqItems = reactive<FaqItem[]>([
  {
    question: '交付周期多长？',
    answer: '根据项目复杂程度，交付时间通常在1-4周范围内。简单课程设计约1周，全栈毕设约3-4周。具体交付时间会在确认需求后给出准确预估。',
    open: false,
  },
  {
    question: '我可以提修改需求吗？',
    answer: '当然可以。需求确认阶段我们会充分沟通确保方向正确。交付后包含合理的修改次数，确保最终成果符合你的预期。',
    open: false,
  },
  {
    question: '源码是否包含文档？',
    answer: '所有项目均包含完整源码和必要的项目文档，涵盖系统架构说明、数据库设计文档、接口文档以及部署指南等，方便你后续维护和答辩使用。',
    open: false,
  },
  {
    question: '如何保证代码质量？',
    answer: '我们遵循规范的开发流程：需求分析 -> 架构设计 -> 编码实现 -> 功能测试 -> 交付验收。代码结构清晰、注释完整，确保可读性和可维护性。',
    open: false,
  },
  {
    question: '支持哪些技术栈？',
    answer: '前端支持 Vue / React / 微信小程序等；后端支持 Node.js / Python / Java / PHP 等；数据库支持 MySQL / PostgreSQL / MongoDB 等。具体技术选型可根据项目需求确定。',
    open: false,
  },
])

function toggleFaq(index: number) {
  faqItems[index].open = !faqItems[index].open
}
</script>

<style scoped>
/* ============================================
   Pricing Page
   ============================================ */
.page-pricing {
  padding-top: var(--space-24);
}

/* ============================================
   Intro Section
   ============================================ */
.pricing-intro {
  padding: var(--space-16) 0 var(--space-20);
}

.pricing-intro__content {
  max-width: 640px;
}

.pricing-intro__label {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-4);
}

.pricing-intro__title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-tight);
  line-height: var(--line-height-tight);
  color: var(--color-text);
  margin-bottom: var(--space-6);
}

@media (min-width: 768px) {
  .pricing-intro__title {
    font-size: var(--font-size-5xl);
  }
}

.pricing-intro__desc {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-4);
  max-width: 55ch;
}

.pricing-intro__note {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  padding: var(--space-3) var(--space-4);
  background: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  max-width: 55ch;
}

/* ============================================
   Pricing Cards Section
   ============================================ */
.pricing-cards {
  padding: var(--space-16) 0;
}

.pricing-cards__wrap {
  display: flex;
  justify-content: center;
}

.pricing-cards__footnote {
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  margin-top: var(--space-8);
}

/* ============================================
   Pricing Card
   ============================================ */
.pricing-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-10);
  transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
}

.pricing-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* Single featured card */
.pricing-card--single {
  max-width: 480px;
  width: 100%;
  border-color: var(--color-text);
  border-width: 2px;
  box-shadow: var(--shadow-lg);
}

.pricing-card--single:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.pricing-card__header {
  text-align: center;
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--space-6);
}

.pricing-card__name {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--space-3);
}

.pricing-card__price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: var(--space-1);
}

.pricing-card__amount {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text);
  line-height: 1;
}

.pricing-card__currency {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

.pricing-card__desc {
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-6);
  max-width: 36ch;
  margin-left: auto;
  margin-right: auto;
}

.pricing-card__features {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  flex: 1;
  margin-bottom: var(--space-8);
}

.pricing-card__feature {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
}

.pricing-card__feature--highlight {
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
}

.pricing-card__check {
  flex-shrink: 0;
  color: var(--color-success);
}

.pricing-card__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
  text-decoration: none;
  text-align: center;
  min-height: 44px;
}

.pricing-card__action:hover {
  background: var(--color-surface-hover);
  border-color: var(--color-text);
}

.pricing-card__action--primary {
  color: var(--color-bg);
  background: var(--color-text);
  border-color: var(--color-text);
}

.pricing-card__action--primary:hover {
  background: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
}

/* ============================================
   FAQ Section
   ============================================ */
.pricing-faq {
  padding: var(--space-16) 0;
  background: var(--color-surface);
}

.pricing-faq__content {
  max-width: 720px;
  margin: 0 auto;
}

.pricing-faq__title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text);
  margin-bottom: var(--space-12);
  text-align: center;
}

.pricing-faq__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.pricing-faq__item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg);
  overflow: hidden;
  transition: border-color var(--transition-fast);
}

.pricing-faq__item--open {
  border-color: var(--color-text);
}

.pricing-faq__question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-5) var(--space-6);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  text-align: left;
  cursor: pointer;
  min-height: 56px;
  gap: var(--space-4);
}

.pricing-faq__question:hover {
  background: var(--color-surface);
}

.pricing-faq__arrow {
  flex-shrink: 0;
  color: var(--color-text-secondary);
  transition: transform var(--transition-base);
}

.pricing-faq__item--open .pricing-faq__arrow {
  transform: rotate(180deg);
}

.pricing-faq__answer {
  padding: 0 var(--space-6) var(--space-5);
}

.pricing-faq__answer p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  max-width: 60ch;
}

/* FAQ transitions */
.faq-fade-enter-active {
  transition: opacity 250ms var(--ease-spring), max-height 350ms var(--ease-spring);
}

.faq-fade-leave-active {
  transition: opacity 200ms var(--ease-spring), max-height 250ms var(--ease-spring);
}

.faq-fade-enter-from,
.faq-fade-leave-to {
  opacity: 0;
  max-height: 0;
}

/* ============================================
   CTA Section
   ============================================ */
.pricing-cta {
  padding: var(--space-20) 0;
}

.pricing-cta__content {
  text-align: center;
  max-width: 560px;
  margin: 0 auto;
}

.pricing-cta__title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text);
  margin-bottom: var(--space-4);
}

.pricing-cta__desc {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-8);
}

.pricing-cta__action {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-8);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-bg);
  background: var(--color-text);
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);
  text-decoration: none;
  min-height: 48px;
}

  .pricing-cta__action:hover {
    background: var(--color-accent-hover);
  }

  /* ============================================
     Referral Discount Section
     ============================================ */
  .pricing-referral {
    padding: var(--space-16) 0;
  }

  .pricing-referral__card {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    padding: var(--space-10) var(--space-8);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
  }

  .pricing-referral__icon-row {
    display: inline-flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
    color: var(--color-text);
  }

  .pricing-referral__icon {
    color: var(--color-text-secondary);
  }

  .pricing-referral__arrow {
    color: var(--color-text);
  }

  .pricing-referral__title {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--letter-spacing-tight);
    color: var(--color-text);
    margin-bottom: var(--space-2);
  }

  .pricing-referral__subtitle {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-4);
  }

  .pricing-referral__desc {
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
    max-width: 480px;
    margin: 0 auto var(--space-4);
  }

  .pricing-referral__note {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-tertiary);
    letter-spacing: var(--letter-spacing-wide);
  }

/* ============================================
   Dark Mode
   ============================================ */
@media (prefers-color-scheme: dark) {
  .pricing-card--single {
    border-color: var(--color-text);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .pricing-card__action--primary {
    color: var(--color-bg);
  }

  .pricing-cta__action {
    color: var(--color-bg);
  }

  .pricing-referral__card {
    border-color: var(--color-border);
  }
}
</style>