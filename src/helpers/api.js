import axios from 'axios';
import { Notify } from 'quasar';

async function api(
  url = '',
  body = {},
  callback = (res) => { console.log(res); },
  headers = {},
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
    callback(res);
  } catch (err) {
    if (err && err.response) {
      console.warn(err.response);
      Notify.create({
        message: err.response.data.error_description,
        color: 'red',
        position: 'top-right',
      });
    }
  }
}

export default api;
