import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const PHISHING: AppRouteRecordRaw = {
  path: '/phishing',
  name: 'phishing',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.phishing',
    icon: 'icon-email',
    requiresAuth: true,
    order: 7,
  },
  children: [
    {
      path: 'success',
      name: 'Success',
      component: () => import('@/views/phishing/index.vue'),
      meta: {
        locale: 'menu.result.success',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'error',
      name: 'Error',
      component: () => import('@/views/risk/index.vue'),
      meta: {
        locale: 'menu.result.error',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default PHISHING;
