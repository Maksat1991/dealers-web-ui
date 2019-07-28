export function SET_AUTH(state, payload) {
  state.auth = {
    ...payload,
    loggedIn: true,
  };
}

export function SET_USER(state, payload) {
  state.user = payload;
}
