export const state = () => ({
  table: []
})

export const getters = {
  getTable(state) {
    return state.table
  }
}

export const mutations = {
  updateTable(state, table) {
    state.table = table
  }
}
