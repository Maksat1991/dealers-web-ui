import Vue from 'vue'

Vue.prototype.$validate = {
  required: (value) => !!value || 'Обязательно',
  email: (email) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(email) || 'Невалидный e-mail'
  },
  tel: (tel) => {
    const pattern = /^[0-9]*$/
    return (
      (tel.length > 7 && tel.length < 15 && pattern.test(tel)) ||
      'Некорректный номер телефона'
    )
  },
  min: (min) => (value) => value.length >= min || `Не менее ${min} символов`,
  name: (name) => {
    const pattern = /^[A-zА-яЁё]+$/i
    return pattern.test(name) || 'Имя может содержать только буквы'
  }
}
