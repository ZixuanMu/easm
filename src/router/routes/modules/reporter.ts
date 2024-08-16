import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const REPORTER: AppRouteRecordRaw = {
  path: '/list',
  name: 'list',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.reporter',
    requiresAuth: true,
    icon: 'icon-file',
    order: 3,
  },
  children: [
    {
      path: 'search-table', // The midline path complies with SEO specifications
      name: 'SearchTable',
      component: () => import('@/views/report/index.vue'),
      meta: {
        locale: 'menu.footageList.searchTable',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'card',
      name: 'Card',
      component: () => import('@/views/report/index.vue'),
      meta: {
        locale: 'menu.footageList.cardList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default REPORTER;
