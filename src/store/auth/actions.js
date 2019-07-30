import api from 'src/helpers/api';

export function AUTH_REQUEST({ commit }, payload) {
  return new Promise((resolve, reject) => {
    commit('AUTH_REQUEST');
    api(
      'http://185.146.3.147:8081/oauth/token',
      payload,
      (res) => {
        console.log('Data: ', res.data);
        commit('AUTH_SUCCESS', res.data.access_token);
        localStorage.setItem('token', res.data.access_token);
        resolve(res);
      },
      {
        Authorization: 'Basic ZnJvbnRlbmQ6c2VjcmV0',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      (err) => {
        commit('AUTH_ERROR', err);
        localStorage.removeItem('token');
        reject(err);
      },
    );
  });
}
