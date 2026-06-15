<template>
  <div class="page-demo">
    <section class="demo-hero">
      <div class="container">
        <div ref="heroRef" class="hero-body">
          <div class="breadcrumb">
            <router-link to="/projects">项目展示</router-link>
            <span class="sep">/</span>
            <span>智能灯光系统</span>
          </div>
          <h1 class="demo-title">智能灯光系统</h1>
          <p class="demo-desc">
            基于 Vue 3 + GSAP 构建的交互式智能照明模拟器。支持多设备独立控制、亮度/色温调节、场景模式一键切换及实时动画反馈。
          </p>
          <div class="tech-tags">
            <span class="tag">Vue 3</span>
            <span class="tag">TypeScript</span>
            <span class="tag">GSAP</span>
            <span class="tag">Pinia</span>
            <span class="tag">Phosphor Icons</span>
          </div>
        </div>
      </div>
    </section>

    <section class="demo-main">
      <div class="container">
        <SmartLightDemo />
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="demo-cta">
      <div class="container">
        <div class="cta-box">
          <p class="cta-box-text">对这个项目感兴趣？提交你的需求</p>
          <router-link to="/submit" class="cta-box-btn">提交需求</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import SmartLightDemo from '@/demos/smartlight/index.vue'

const heroRef = ref<HTMLElement | null>(null)
let heroTween: ReturnType<typeof gsap.from> | null = null

onMounted(() => {
  if (heroRef.value) {
    heroTween = gsap.from(heroRef.value, {
      y: 32,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
  }
})

onBeforeUnmount(() => {
  heroTween?.kill()
})
</script>

<style scoped>
.page-demo {
  display: flex;
  flex-direction: column;
}

/* Hero */
.demo-hero {
  padding: var(--space-16) 0 var(--space-8);
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}

.hero-body {
  max-width: 640px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
}

.breadcrumb a {
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
  padding: var(--space-1) 0;
}

.breadcrumb a:hover {
  color: var(--color-text);
}

.sep {
  color: var(--color-border);
}

.demo-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text);
  margin-bottom: var(--space-4);
}

.demo-desc {
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-6);
  max-width: 540px;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.tag {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  font-size: var(--font-size-xs);
  font-family: var(--font-mono);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  line-height: 1.4;
}

/* Demo main */
.demo-main {
  padding: var(--space-8) 0 var(--space-16);
  background-color: var(--color-surface);
  flex: 1;
}

/* Bottom CTA */
.demo-cta {
  padding: 0 0 var(--space-24);
  background-color: var(--color-surface);
}

.cta-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-8);
  background: var(--color-bg);
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

@media (max-width: 767px) {
  .demo-hero {
    padding: var(--space-12) 0 var(--space-6);
  }

  .demo-title {
    font-size: var(--font-size-3xl);
  }

  .demo-desc {
    font-size: var(--font-size-sm);
  }

  .demo-main {
    padding: var(--space-6) 0 var(--space-12);
  }

  .cta-box {
    padding: var(--space-6) var(--space-4);
  }

  .cta-box-text {
    font-size: var(--font-size-base);
  }

  .cta-box-btn {
    width: 100%;
  }
}
</style>