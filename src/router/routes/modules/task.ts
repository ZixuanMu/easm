import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const Task: AppRouteRecordRaw = {
  path: '/task',
  name: 'task',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.task',
    requiresAuth: true,
    icon: 'icon-archive',
    order: 2,
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
  ],
};

export default Task;
