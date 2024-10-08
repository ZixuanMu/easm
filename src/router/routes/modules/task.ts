import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const Task: AppRouteRecordRaw = {
  path: '/task',
  name: 'task',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.task',
    requiresAuth: true,
    icon: 'icon-common',
    order: 1,
  },
  children: [
    {
      path: 'taskmanager',
      name: 'Taskmanager',
      component: () => import('@/views/task/taskmanager/index.vue'),
      meta: {
        locale: 'menu.task.taskmanager',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'taskcreate',
      name: 'Taskcreate',
      component: () => import('@/views/task/taskcreate/index.vue'),
      meta: {
        locale: 'menu.task.taskcreate',
        requiresAuth: true,
        hideInMenu:true,
        roles: ['*'],
      },
    },
  ],
};

export default Task;
