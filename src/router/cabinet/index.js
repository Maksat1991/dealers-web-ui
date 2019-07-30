import { ifAuth } from '../checkAuth';

export default {
  path: '/cabinet',
  component: () => import('../../layouts/Cabinet.vue'),
  children: [
    {
      path: '',
      component: () => import('../../pages/Dashboard.vue'),
      beforeEnter: ifAuth,
    },
  ],
};
