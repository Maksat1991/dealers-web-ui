export const state = () => ({
  catalogs: [],
  selectedCatalog: null,
  categoryToView: null
})

export const getters = {
  getCatalogs(state) {
    return state.catalogs
  },
  getSelectedCatalog(state) {
    return state.selectedCatalog || state.catalogs[0]
  },
  categoryToView(state) {
    return state.categoryToView
  }
}

export const mutations = {
  updateSelectedCatalog(state, catalog) {
    state.selectedCatalog = catalog
  },
  updateCatalogs(state, catalogs) {
    state.catalogs = catalogs
  },
  updateCategoryToView(state, category) {
    state.categoryToView = category
  },
  addItemToCategoryToView(state, item) {
    state.categoryToView.items.push(item)
  },
  replaceItemToCategoryToView(state, newItem) {
    state.categoryToView.items.forEach((item, itemIndex, category) => {
      if (item.id === newItem.id) category[itemIndex] = newItem
    })
    // trigger catalog table update
    state.categoryToView.items.push('')
    state.categoryToView.items.pop()
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
