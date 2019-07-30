import axios from 'axios';

export default () => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  }
};
