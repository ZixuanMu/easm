import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const TRAINING: AppRouteRecordRaw = {
  path: '/training',
  name: 'training',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.training',
    requiresAuth: true,
    icon: 'icon-apps',
    order: 2,
  },
  children: [
    {
      path: 'trainingmanager',
      name: 'trainingmanager',
      component: () => import('@/views/training/trainingmanager/index.vue'),
      meta: {
        locale: 'menu.training.trainingmanager',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'industrystandards',
      name: 'industrystandards',
      component: () => import('@/views/training/industrystandards/index.vue'),
      meta: {
        locale: 'menu.training.industrystandards',
        requiresAuth: true,
        roles: ['admin'],
      }
    },
    {
      path: 'trainingnotify',
      name: 'trainingnotify',
      component: () => import('@/views/training/trainingnotify/index.vue'),
      meta:{
        locale: 'menu.training.trainingnotify',
        requiresAuth: true,
        roles: ['admin'],
        
      }
    },
  ],
};

export default TRAINING;
