import { ifNotAuth } from '../checkAuth';

export default {
  path: '/',
  component: () => import('../../layouts/Main.vue'),
  children: [
    {
      path: '',
<<<<<<< HEAD
      component: () => import('../../pages/Welcome.vue'),
=======
      component: () => import('../../pages/Index.vue'),
>>>>>>> Created catalog import page
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
