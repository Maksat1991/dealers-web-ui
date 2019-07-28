import axios from 'axios';

export default async ({ Vue }) => {
  axios.defaults.headers.common = {

  };
  Vue.prototype.$axios = axios;
};
