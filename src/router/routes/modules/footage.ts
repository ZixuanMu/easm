import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const FOOTAGE: AppRouteRecordRaw = {
  path: '/profile',
  name: 'profile',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.footage',
    requiresAuth: true,
    icon: 'icon-common',
    order: 4,
  },
  children: [
    {
      path: 'basic',
      name: 'Basic',
      component: () => import('@/views/profile/basic/index.vue'),
      meta: {
        locale: 'menu.profile.basic',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default FOOTAGE;
