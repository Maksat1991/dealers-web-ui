import { ifNotAuth } from '../checkAuth';

export default {
  path: '/',
  component: () => import('../../layouts/Main.vue'),
  children: [
    {
      path: '',
      component: () => import('../../pages/Index.vue'),
    },
    {
      path: 'login',
      component: () => import('../../pages/Login.vue'),
      beforeEnter: ifNotAuth,
    },
    {
      path: 'register',
      component: () => import('../../pages/Register.vue'),
      beforeEnter: ifNotAuth,
    },
  ],
};
