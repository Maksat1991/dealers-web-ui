export const state = () => ({
  catalogs: [],
  selectedCatalog: null
})

export const getters = {
  getCatalogs(state) {
    return state.catalogs
  },
  getSelectedCatalog(state) {
    return state.selectedCatalog || state.catalogs[0]
  }
}

export const mutations = {
  updateSelectedCatalog(state, catalog) {
    state.selectedCatalog = catalog
  },
  updateCatalogs(state, catalogs) {
    state.catalogs = catalogs
  }
}

export const actions = {
  async fetchCatalogs({ commit }) {
    // update catalogs
    const token = localStorage.getItem('token')
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${token}`)

    await fetch('http://185.146.3.147:8082/api/catalog', {
      method: 'GET',
      headers
    })
      .then((response) => response.text())
      .then((catalogs) => commit('updateCatalogs', JSON.parse(catalogs)))
  }
}
