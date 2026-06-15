<template>
  <div class="page page-datacenter">
    <div class="container">
      <!-- Back -->
      <div class="dc-back">
        <router-link to="/projects" class="back-link">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>
          返回项目列表
        </router-link>
      </div>

      <div class="dc-heading">
        <div>
          <h1 class="dc-title">数据中心温度监控</h1>
          <p class="dc-subtitle">基于 NleCloud API 的远程机柜环境实时监控系统</p>
        </div>
        <div class="dc-badges">
          <span class="dc-badge dc-badge--primary">Tauri</span>
          <span class="dc-badge dc-badge--alt">Chart.js</span>
          <span class="dc-badge">GSAP</span>
        </div>
      </div>

      <DataCenterDemo />

      <!-- Bottom CTA -->
      <div class="dc-cta">
        <p class="dc-cta-text">对这个项目感兴趣？提交你的需求</p>
        <router-link to="/submit" class="dc-cta-btn">提交需求</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DataCenterDemo from '@/demos/datacenter/index.vue'
</script>

<style scoped>
.page-datacenter {
  padding: var(--space-16) 0 var(--space-24);
}

/* Back */
.dc-back {
  margin-bottom: var(--space-4);
}

.back-link {
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
  text-decoration: none;
}

.back-link:hover {
  color: var(--color-text);
  background: var(--color-surface-hover);
}

/* Heading */
.dc-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-6);
  margin-bottom: var(--space-8);
  flex-wrap: wrap;
}

.dc-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text);
}

.dc-subtitle {
  color: var(--color-text-secondary);
  margin-top: var(--space-1);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
}

.dc-badges {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.dc-badge {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 var(--space-3);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  white-space: nowrap;
}

.dc-badge--primary {
  color: #2563eb;
  background: rgba(59, 130, 246, 0.08);
  border-color: rgba(59, 130, 246, 0.2);
}

.dc-badge--alt {
  color: #06b6d4;
  background: rgba(6, 182, 212, 0.08);
  border-color: rgba(6, 182, 212, 0.2);
}

/* Bottom CTA */
.dc-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  margin-top: var(--space-16);
  padding: var(--space-8);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  text-align: center;
}

.dc-cta-text {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}

.dc-cta-btn {
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

.dc-cta-btn:hover {
  background: var(--color-accent-hover);
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .dc-heading {
    flex-direction: column;
  }
  .dc-title {
    font-size: var(--font-size-3xl);
  }
  .dc-cta {
    padding: var(--space-6) var(--space-4);
    margin-top: var(--space-10);
  }
  .dc-cta-text {
    font-size: var(--font-size-base);
  }
}
</style>