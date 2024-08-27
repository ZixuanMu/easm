import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const USER: AppRouteRecordRaw = {
  path: '/user',
  name: 'user',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.user',
    icon: 'icon-user',
    requiresAuth: true,
    order: 6,
  },
  children: [
    {
      path: 'departmentmanager',
      name: 'Departmentmanager',
      component: () => import('@/views/user/departmentmanager/index.vue'),
      meta: {
        locale: 'menu.user.departmentmanager',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'employeemanager',
      name: 'Employeemanager',
      component: () => import('@/views/user/employeemanager/index.vue'),
      meta: {
        locale: 'menu.user.employeemanager',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'rolemanager',
      name: 'Rolemanager',
      component: () => import('@/views/user/rolemanager/index.vue'),
      meta: {
        locale: 'menu.user.rolemanager',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
    path: 'groupmanager',
    name: 'Groupmanager',
    component: () => import('@/views/user/groupmanager/index.vue'),
    meta: {
      locale: 'menu.user.groupmanager',
      requiresAuth: true,
      roles: ['*'],
    },
  },
  {
    path:'loginway',
    name:'Loginway',
    component: () => import('@/views/user/loginway/index.vue'), 
    meta: {
      locale: 'menu.user.loginway',
      requiresAuth: false,
      roles: ['*'],
    },
  }
  ],
};

export default USER;
