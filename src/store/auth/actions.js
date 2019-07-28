import { Notify } from 'quasar';
import api from 'src/helpers/api';
import { i18n } from 'src/boot/i18n';

export async function AUTH({ commit }, payload) {
  await api(
    'http://185.146.3.147:8081/oauth/token',
    payload,
    (res) => {
      Notify.create({
        message: i18n.t('notification.loggedIn'),
        color: 'green',
        position: 'top-right',
      });
      console.log('Data: ', res.data);
      commit('SET_AUTH', res.data);
      localStorage.setItem('auth', JSON.stringify(res.data));
    },
    {
      Authorization: 'Basic ZnJvbnRlbmQ6c2VjcmV0',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  );
}
