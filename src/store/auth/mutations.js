export const AUTH_REQUEST = (state) => {
  state.status = 'loading';
};

export const AUTH_SUCCESS = (state, token) => {
  state.status = 'success';
  state.token = token;
};

export const AUTH_ERROR = (state) => {
  state.status = 'error';
};

export const AUTH_LOGOUT = (state) => {
  state.token = '';
  state.status = '';
};
