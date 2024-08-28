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
      path:'/phishing/emailsetting',
      name: 'emailsetting',
      component: () => import('@/views/phishing/emailsetting/index.vue'),
      meta: {
        locale: 'menu.phishing.emailsetting',
        requiresAuth: true,
      },
    },
    {
      path:'/phishing/phishingactive',
      name: 'phishingactive',
      component: () => import('@/views/phishing/phishingactive/index.vue'),
      meta: {
        locale: 'menu.phishing.phishingactive',
        requiresAuth: true,
      },
    },{
      path:'/phishing/socialengineering',
      name:'socialengineering',
      component: () => import('@/views/phishing/socialengineering/index.vue'),
      meta: {
        locale: 'menu.phishing.socialengineering',
        requiresAuth: true,
      }
    }
    
  ],
};

export default PHISHING;
