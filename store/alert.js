export const state = () => ({
  alert: { result: '', text: '' }
})

export const getters = {
  alert(state) {
    return state.alert
  }
}

export const mutations = {
  updateAlert(state, alert) {
    state.alert = alert
  }
}

export const actions = {
  updateAlert({ state, commit }, alert) {
    commit('updateAlert', alert)
    setTimeout(() => {
      commit('updateAlert', { result: '', text: '' })
    }, 2000)
  }
}
