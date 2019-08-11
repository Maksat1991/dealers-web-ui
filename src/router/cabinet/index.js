import { ifAuth } from '../checkAuth';

export default {
  path: '/cabinet',
  component: () => import('../../layouts/Cabinet.vue'),
  children: [
    {
      path: '',
      component: () => import('../../pages/cabinet/Dashboard.vue'),
      beforeEnter: ifAuth,
    },
    {
      path: 'manager-add',
      component: () => import('../../pages/cabinet/ManagerAdd.vue'),
      beforeEnter: ifAuth,
    },
  ],
};
