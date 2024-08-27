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
      path: 'multi-dimension-data-analysis',
      name: 'MultiDimensionDataAnalysis',
      component: () =>
        import('@/views/phishing/index.vue'),
      meta: {
        locale: 'menu.visualization.multiDimensionDataAnalysis',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default TRAINING;
