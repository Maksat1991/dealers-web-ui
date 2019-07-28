import {
  required,
  email,
} from 'src/helpers/validations';

export default async ({ Vue }) => {
  Vue.prototype.$valid = {
    required,
    email,
  };
};
