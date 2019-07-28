import api from 'src/helpers/api';

export default async ({ Vue }) => {
  Vue.prototype.$api = api;
};
