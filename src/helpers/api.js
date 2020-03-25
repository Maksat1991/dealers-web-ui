import axios from 'axios';
import { Notify } from 'quasar';
<<<<<<< HEAD
import { i18n } from '../boot/i18n';
=======
>>>>>>> Created catalog import page

async function api(
  url = '',
  body = {},
  success = (res) => { console.log(res); },
  headers = {},
  reject = (err) => { console.log(err); },
  method = 'post',
) {
  let requestBodyName = 'data';

  if (method === 'get') {
    requestBodyName = 'params';
  } else if (method === 'post') {
    requestBodyName = 'data';
  }

  try {
    const res = await axios({
      method,
      url,
      headers,
      [requestBodyName]: body,
    });
    Notify.create({
<<<<<<< HEAD
      message: i18n.t('notification.loggedIn'),
=======
      message: 'Вы успешно авторизовались',
>>>>>>> Created catalog import page
      color: 'green',
      position: 'top-right',
    });
    success(res);
  } catch (err) {
    if (err && err.response) {
      console.warn(err.response);
      Notify.create({
<<<<<<< HEAD
        message: (err.response.data && err.response.data.error_description) || i18n.t('notification.error'),
=======
        message: (err.response.data && err.response.data.error_description) || 'Произошла ошибка, попробуйте ещё раз',
>>>>>>> Created catalog import page
        color: 'red',
        position: 'top-right',
      });
      reject(err.response || err);
    }
  }
}

export default api;
