import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '@/views/HomeView.vue';

// Vue module augmentation moved to global declaration file
// See: https://vuejs.org/guide/typescript/overview.html#general-usage-notes

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '数据看板',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard.vue'),
    },
    {
      path: '/analysis',
      name: 'analysis',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Analysis.vue'),
    },
    {
      path: '/issues',
      name: '问题管理',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Issues.vue'),
    },
  ],
})

export default router
