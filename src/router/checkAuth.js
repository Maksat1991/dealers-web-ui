import { store } from '../store';

// const store = getStore();

export const ifNotAuth = (to, from, next) => {
<<<<<<< HEAD
  console.log('asdasd: ', store.getters);
=======
>>>>>>> Created catalog import page
  if (!store.getters['auth/isAuth']) {
    next();
    return;
  }
  next('/');
};

export const ifAuth = (to, from, next) => {
  if (store.getters['auth/isAuth']) {
    next();
    return;
  }
  next('/login');
};
