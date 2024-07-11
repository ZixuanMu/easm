import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const RISK: AppRouteRecordRaw = {
  path: '/result',
  name: 'result',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.risk',
    icon: 'icon-exclamation-circle-fill',
    requiresAuth: true,
    order: 7,
  },
  children: [
    {
      path: 'success',
      name: 'Success',
      component: () => import('@/views/risk/index.vue'),
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

export default RISK;
