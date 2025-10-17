import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: () => ({ name: 'project' }),
      children: [
        {
          path: 'projects',
          children: [
            {
              path: '',
              name: 'project',
              component: () => import('@/pages/projects/ProjectList.vue'),
            },
            {
              path: ':id',
              name: 'project-detail',
              component: () => import('@/pages/projects/ProjectDetail.vue'),
              props: true,
            },
          ],
        },
      ],
    },
  ],
})

export default router
