import main from './main/index';
import cabinet from './cabinet/index';

const routes = [
  main,
  cabinet,
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('../pages/Error404.vue'),
  });
}

export default routes;
