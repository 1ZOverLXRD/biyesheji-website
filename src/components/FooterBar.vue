<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__section">
          <h3 class="footer__heading">联系方式</h3>
          <ul class="footer__list">
            <li>
              <a href="mailto:2537785558@qq.com" class="footer__link">
                2537785558@qq.com
              </a>
            </li>
            <li>
              <span class="footer__text">QQ: 2537785558</span>
            </li>
            <li>
              <span class="footer__text">微信: QZZT0NGW1thme</span>
            </li>
          </ul>
        </div>

        <div class="footer__section">
          <h3 class="footer__heading">导航</h3>
          <ul class="footer__list">
            <li v-for="link in footerLinks" :key="link.path">
              <router-link :to="link.path" class="footer__link">
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <div class="footer__section">
          <h3 class="footer__heading">微信</h3>
          <div class="footer__qr" aria-label="微信二维码">
            <img src="/wx.jpg" alt="微信二维码" class="footer__qr-img" />
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copyright">&copy; 2026 coldFish</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const footerLinks = [
  { path: '/', label: '首页' },
  { path: '/projects', label: '项目展示' },
  { path: '/pricing', label: '服务与定价' },
  { path: '/submit', label: '提交需求' },
  { path: '/about', label: '关于我' },
]
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: var(--space-16) 0 var(--space-8);
  margin-top: auto;
}

.footer__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
}

@media (min-width: 768px) {
  .footer__grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.footer__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.footer__heading {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
}

.footer__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.footer__link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: var(--space-2) 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
  text-decoration: none;
}

.footer__link:hover {
  color: var(--color-text);
}

.footer__text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.footer__qr {
  width: 200px;
  height: 200px;
}

.footer__qr-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

.footer__bottom {
  margin-top: var(--space-12);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border);
  text-align: center;
}

.footer__copyright {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
}
</style>