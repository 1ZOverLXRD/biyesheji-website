import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/views/ProjectsView.vue'),
    },
    {
      path: '/projects/datacenter',
      name: 'project-datacenter',
      component: () => import('@/views/ProjectDatacenterView.vue'),
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: () => import('@/views/PricingView.vue'),
    },
    {
      path: '/submit',
      name: 'submit',
      component: () => import('@/views/SubmitView.vue'),
    },
    {
      path: '/projects/smartlight',
      name: 'project-smartlight',
      component: () => import('@/views/ProjectSmartlightView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/projects/mlytemp',
      name: 'project-mlytemp',
      component: () => import('@/views/ProjectMlytempView.vue'),
    },
  ],
})

export default router