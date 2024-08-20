import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const FOOTAGE: AppRouteRecordRaw = {
  path: '/footage',
  name: 'Footage',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.footage',
    requiresAuth: true,
    icon: 'icon-storage',
    order: 4,
  },
  children: [
    {
      path: '/footage/footagemanager',
      name: 'Footagemanager',
      component: () => import('@/views/footage/footagemanager/index.vue'),
      meta: {
        locale: 'menu.footageList.footagemanager',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
     {
      path: '/footage/labelmanager',
      name: 'Labelmanager',
      component: () => import('@/views/footage/labelmanager/index.vue'),
      meta: {
        locale: 'menu.footageList.labelmanager',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: '/footage/footagecreate',
      name: 'Footagercreate',
      component: () => import('@/views/footage/footagecreate/index.vue'),
      meta: {
        locale: 'menu.footageList',
        requiresAuth: true,
        hideInMenu:true,
        roles: ['admin'],
      },
    },
  ],
};

export default FOOTAGE;
