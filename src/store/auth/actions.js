import api from 'src/helpers/api';
import axios from 'axios';

export const AUTH_REQUEST = ({ commit }, data) => new Promise((resolve, reject) => {
  commit('AUTH_REQUEST');
  api(
    'http://185.146.3.147:8082/oauth/token',
    data,
    (res) => {
      const { access_token: token } = res.data;
      commit('AUTH_SUCCESS', token);
      localStorage.setItem('token', token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      console.log(res);
      resolve(res);
    },
    {
      Authorization: `Basic ${process.env.AUTH_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    (err) => {
      commit('AUTH_ERROR');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common.Authorization;
      reject(err);
    },
  );
});

export const AUTH_LOGOUT = ({ commit }) => new Promise((resolve) => {
  commit('AUTH_LOGOUT');
  localStorage.removeItem('token');
  delete axios.defaults.headers.common.Authorization;
  resolve();
});
