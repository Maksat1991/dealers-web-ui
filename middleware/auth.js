export default function({ store, error }) {
  if (!store.getters['auth/isAuth']) {
    error({
      message: 'Необходимо войти в аккаунт',
      statusCode: 403
    })
  }
}
