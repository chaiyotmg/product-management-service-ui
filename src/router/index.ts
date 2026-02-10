import { createRouter, createWebHistory, type Router } from 'vue-router';
import { MainLayout } from '@/components/templates';

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          redirect: '/products',
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('@/pages/ProductPage.vue'),
        },
        {
          path: 'categories',
          name: 'categories',
          component: () => import('@/pages/CategoryPage.vue'),
        },
      ],
    },
  ],
});

export default router;
