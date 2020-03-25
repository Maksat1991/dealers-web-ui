import api from 'src/helpers/api';
import axios from 'axios';

export const AUTH_REQUEST = ({ commit }, data) => new Promise((resolve, reject) => {
  commit('AUTH_REQUEST');
  api(
<<<<<<< HEAD
    'http://185.146.3.147:8081/oauth/token',
    data,
    (res) => {
      console.log('Data: ', res.data);
=======
    'http://185.146.3.147:8082/oauth/token',
    data,
    (res) => {
>>>>>>> Created catalog import page
      const { access_token: token } = res.data;
      commit('AUTH_SUCCESS', token);
      localStorage.setItem('token', token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
<<<<<<< HEAD
      resolve(res);
    },
    {
      Authorization: 'Basic ZnJvbnRlbmQ6c2VjcmV0',
=======
      console.log(res);
      resolve(res);
    },
    {
      Authorization: `Basic ${process.env.AUTH_TOKEN}`,
>>>>>>> Created catalog import page
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
