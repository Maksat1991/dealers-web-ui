import { ifAuth } from '../checkAuth';

export default {
  path: '/cabinet',
  component: () => import('../../layouts/Cabinet.vue'),
  children: [
    {
      path: '',
<<<<<<< HEAD
      component: () => import('../../pages/cabinet/Dashboard.vue'),
      beforeEnter: ifAuth,
    },
    {
      path: 'manager-add',
      component: () => import('../../pages/cabinet/ManagerAdd.vue'),
=======
      component: () => import('../../pages/cabinet/Index.vue'),
      beforeEnter: ifAuth,
    },
    {
      path: 'register',
      component: () => import('../../pages/cabinet/Register.vue'),
      beforeEnter: ifAuth,
    },
    {
      path: 'import',
      component: () => import('../../pages/cabinet/Import.vue'),
      beforeEnter: ifAuth,
    },
    {
      path: 'catalogs',
      component: () => import('../../pages/cabinet/Catalogs.vue'),
>>>>>>> Created catalog import page
      beforeEnter: ifAuth,
    },
  ],
};
