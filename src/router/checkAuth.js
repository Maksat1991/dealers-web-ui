import getStore from '../store';

const store = getStore();

export const ifNotAuth = (to, from, next) => {
  console.log('asdasd: ', store.getters);
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
