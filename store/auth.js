export const state = () => ({
  token: localStorage.getItem('token') || ''
})

export const getters = {
  isAuth(state) {
    return !!state.token
  }
}

export const mutations = {
  updateToken(state, token) {
    state.token = token
  }
}

export const actions = {
  async login(state, [username, password]) {
    const body = new FormData()
    body.append('grant_type', 'password')
    body.append('username', username)
    body.append('password', password)
    let succeed
    await fetch(`${process.env.API}oauth/token`, {
      headers: {
        authorization: `Basic ${process.env.AUTH_TOKEN}`
      },
      body,
      method: 'POST'
    })
      .then((response) => {
        if (!response.ok) throw response
        return response.json()
      })
      .then((response) => {
        localStorage.setItem('token', response.access_token)
        state.commit('updateToken', response.access_token)
        return response
      })
      .then((response) => {
        localStorage.setItem('username', username)
        localStorage.setItem('password', password)
        succeed = true
        return response
      })
      .catch((error) => {
        error.text().then((errorMessage) => {
          succeed = false
          console.log(errorMessage)
        })
      })
    return succeed
  }
}
