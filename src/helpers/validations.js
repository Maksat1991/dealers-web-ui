<<<<<<< HEAD
import { i18n } from 'src/boot/i18n';

export function required(val) {
  return (val && val.length > 0) || i18n.t('validation.required');
=======
export function required(val) {
  return (val && val.length > 0) || 'Поле обязательно для заполнения!';
>>>>>>> Created catalog import page
}

export function email(val) {
  let valid = true;

  if (val) {
<<<<<<< HEAD
    const regex = new RegExp('^(([^<>()\\[\\]\\.,;:\\s@\\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$', 'i');
    valid = regex.test(val);
  }

  return valid || i18n.t('validation.email');
=======
    const regex = new RegExp('^(([^<>()\\[\\].,;:\\s@"]+(\\.[^<>()\\[\\].,;:\\s@"]+)*)|(".+"))@(([^<>()[\\].,;:\\s@"]+\\.)+[^<>()[\\].,;:\\s@"]{2,})$', 'i');
    valid = regex.test(val);
  }

  return valid || 'E-mail заполнен некорректно!';
>>>>>>> Created catalog import page
}
