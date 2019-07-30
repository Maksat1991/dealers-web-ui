export const AUTH_REQUEST = (state) => {
  state.auth.status = 'loading';
};

export const AUTH_SUCCESS = (state, token) => {
  state.auth.status = 'success';
  state.auth.token = token;
};

export const AUTH_ERROR = (state) => {
  state.auth.status = 'error';
};
