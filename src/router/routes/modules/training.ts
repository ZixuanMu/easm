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
    order: 1,
  },
  children: [
    {
      path: 'traningmanager',
      name: 'traningmanager',
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
        import('@/views/visualization/multi-dimension-data-analysis/index.vue'),
      meta: {
        locale: 'menu.visualization.multiDimensionDataAnalysis',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default TRAINING;
