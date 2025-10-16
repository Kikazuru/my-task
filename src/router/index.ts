import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: () => ({ name: 'projects' }),
      children: [
        {
          path: 'projects',
          name: 'projects',
          component: () => import('@/pages/ProjectView.vue'),
        },
      ],
    },
  ],
})

export default router
