<script setup lang="ts">
/**
 * ProjectMlytempView.vue — MLY_TEMP 冷库监控 Demo 页面
 */
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import MlyTempDashboard from '@/demos/mlytemp/index.vue'

const router = useRouter()
const pageRef = ref<HTMLElement | null>(null)

function goBack(): void {
  router.push('/projects')
}

onMounted(() => {
  nextTick(() => {
    gsap.fromTo(
      pageRef.value,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' },
    )
  })
})
</script>

<template>
  <div ref="pageRef" class="project-mlytemp">
    <!-- 页面头部 -->
    <div class="page-header">
      <button class="back-btn" @click="goBack">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
        返回
      </button>
      <div class="page-header__info">
        <h1 class="page-header__title">冷库环境监控系统</h1>
        <p class="page-header__desc">
          基于 Android 的食品冷库监控与报警系统 — 实时监测 4 个冷库分区的温度与湿度
        </p>
      </div>
    </div>

    <!-- Demo 内容 -->
    <div class="page-body">
      <MlyTempDashboard />
    </div>

    <!-- Bottom CTA -->
    <div class="page-cta">
      <div class="cta-box">
        <p class="cta-box-text">对这个项目感兴趣？提交你的需求</p>
        <router-link to="/submit" class="cta-box-btn">提交需求</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-mlytemp {
  opacity: 0;
  min-height: calc(100dvh - var(--nav-height, 64px));
  padding: var(--space-12) var(--page-padding, 1.5rem) var(--space-24);
  max-width: var(--max-width, 1280px);
  margin: 0 auto;
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-tertiary);
  padding: var(--space-2) var(--space-3);
  min-height: 44px;
  border-radius: var(--radius-sm);
  transition: color var(--transition-fast), background var(--transition-fast);
  align-self: flex-start;
}

.back-btn:hover {
  color: var(--color-text);
  background: var(--color-surface-hover);
}

.page-header__info {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.page-header__title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  letter-spacing: var(--letter-spacing-tight);
}

.page-header__desc {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  max-width: 560px;
}

.page-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* Bottom CTA */
.page-cta {
  margin-top: var(--space-12);
}

.cta-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-8);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  text-align: center;
}

.cta-box-text {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}

.cta-box-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 var(--space-8);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: #fff;
  background: var(--color-accent);
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: background var(--transition-fast), transform var(--transition-fast);
}

.cta-box-btn:hover {
  background: var(--color-accent-hover);
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .project-mlytemp {
    padding-top: var(--space-8);
  }

  .page-header__title {
    font-size: var(--font-size-2xl);
  }

  .page-header__desc {
    font-size: var(--font-size-sm);
  }

  .cta-box {
    padding: var(--space-6) var(--space-4);
  }

  .cta-box-text {
    font-size: var(--font-size-base);
  }
}
</style>