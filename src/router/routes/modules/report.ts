import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const REPORTER: AppRouteRecordRaw = {
  path: '/list',
  name: 'list',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.report',
    requiresAuth: true,
    icon: 'icon-file',
    order: 3,
  },
  children: [
    {
      path:'reportmanage',
      name: 'ReportManage',
      component: () => import('@/views/report/reportmanage/index.vue'),
      meta: {
        locale: 'menu.report.reportmanage',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path:'remarkreport',
      name: 'RemarkReport',
      component: () => import('@/views/report/remarkreport/index.vue'),
      meta: {
        locale: 'menu.report.remarkreport',
        requiresAuth: true,
        roles: ['admin'],
      }
    }
  ],
};

export default REPORTER;
