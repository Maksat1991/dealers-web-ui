import axios from 'axios';
import { Notify } from 'quasar';

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
      message: 'Вы успешно авторизовались',
      color: 'green',
      position: 'top-right',
    });
    success(res);
  } catch (err) {
    if (err && err.response) {
      console.warn(err.response);
      Notify.create({
        message: (err.response.data && err.response.data.error_description) || 'Произошла ошибка, попробуйте ещё раз',
        color: 'red',
        position: 'top-right',
      });
      reject(err.response || err);
    }
  }
}

export default api;
