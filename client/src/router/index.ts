import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'test'
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestView.vue')
    }
  ]
})

export default router
