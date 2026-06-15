<template>
  <nav class="navbar" :class="{ 'navbar--open': menuOpen }">
    <div class="navbar__inner container">
      <router-link to="/" class="navbar__logo" aria-label="首页">
        <span class="navbar__logo-icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="24" height="24" rx="6" stroke="currentColor" stroke-width="1.5" />
            <path d="M9 14L12.5 17.5L19 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <span class="navbar__logo-text">代做毕设</span>
      </router-link>

      <button
        class="navbar__toggle"
        @click="menuOpen = !menuOpen"
        :aria-label="menuOpen ? '关闭菜单' : '打开菜单'"
        :aria-expanded="menuOpen"
      >
        <span class="navbar__toggle-bar" />
        <span class="navbar__toggle-bar" />
        <span class="navbar__toggle-bar" />
      </button>

      <ul class="navbar__links">
        <li v-for="link in links" :key="link.path">
          <router-link
            :to="link.path"
            class="navbar__link"
            :class="{ 'navbar__link--active': isActive(link.path) }"
            @click="menuOpen = false"
          >
            {{ link.label }}
          </router-link>
        </li>
      </ul>
    </div>

    <transition name="menu-fade">
      <div v-if="menuOpen" class="navbar__overlay" @click="menuOpen = false" />
    </transition>

    <transition name="menu-slide">
      <div v-if="menuOpen" class="navbar__mobile-menu">
        <ul class="navbar__mobile-links">
          <li v-for="link in links" :key="link.path">
            <router-link
              :to="link.path"
              class="navbar__mobile-link"
              :class="{ 'navbar__link--active': isActive(link.path) }"
              @click="menuOpen = false"
            >
              {{ link.label }}
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const menuOpen = ref(false)

const links = [
  { path: '/', label: '首页' },
  { path: '/projects', label: '项目展示' },
  { path: '/pricing', label: '服务与定价' },
  { path: '/submit', label: '提交需求' },
  { path: '/about', label: '关于我' },
]

function isActive(path: string): boolean {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  height: var(--nav-height);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

@media (prefers-color-scheme: dark) {
  .navbar {
    background: rgba(9, 9, 11, 0.8);
  }
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

/* Logo */
.navbar__logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-lg);
  color: var(--color-text);
  transition: opacity var(--transition-fast);
  text-decoration: none;
}

.navbar__logo:hover {
  opacity: 0.7;
}

.navbar__logo-icon {
  color: var(--color-accent-alt);
  display: flex;
  align-items: center;
}

/* Desktop links */
.navbar__links {
  display: none;
  align-items: center;
  gap: var(--space-1);
}

@media (min-width: 768px) {
  .navbar__links {
    display: flex;
  }
}

.navbar__link {
  display: inline-flex;
  align-items: center;
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
  transition: color var(--transition-fast), background-color var(--transition-fast);
  text-decoration: none;
  min-height: 44px;
}

.navbar__link:hover {
  color: var(--color-text);
  background-color: var(--color-surface-hover);
}

.navbar__link--active {
  color: var(--color-text);
}

/* Hamburger toggle */
.navbar__toggle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-fast);
}

.navbar__toggle:hover {
  background-color: var(--color-surface-hover);
}

@media (min-width: 768px) {
  .navbar__toggle {
    display: none;
  }
}

.navbar__toggle-bar {
  display: block;
  width: 20px;
  height: 2px;
  background-color: var(--color-text);
  border-radius: 2px;
  transition: transform var(--transition-base), opacity var(--transition-base);
}

.navbar--open .navbar__toggle-bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.navbar--open .navbar__toggle-bar:nth-child(2) {
  opacity: 0;
}

.navbar--open .navbar__toggle-bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Overlay */
.navbar__overlay {
  position: fixed;
  inset: 0;
  z-index: 40;
  background: rgba(0, 0, 0, 0.3);
}

@media (prefers-color-scheme: dark) {
  .navbar__overlay {
    background: rgba(0, 0, 0, 0.6);
  }
}

/* Mobile menu */
.navbar__mobile-menu {
  position: fixed;
  top: var(--nav-height);
  left: 0;
  right: 0;
  z-index: 45;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-4);
}

.navbar__mobile-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.navbar__mobile-link {
  display: block;
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
  transition: color var(--transition-fast), background-color var(--transition-fast);
  text-decoration: none;
  min-height: 44px;
  line-height: 1;
}

.navbar__mobile-link:hover {
  color: var(--color-text);
  background-color: var(--color-surface-hover);
}

.navbar__mobile-link.navbar__link--active {
  color: var(--color-text);
  background-color: var(--color-surface-hover);
}

/* Transitions */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 200ms var(--ease-spring);
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}

.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: transform 250ms var(--ease-spring), opacity 200ms var(--ease-spring);
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}
</style>