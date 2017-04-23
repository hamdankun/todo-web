import * as types from '../constant/auth-const';

export const onDoAuth = () => {
  return { type: types.LOGIN_PROSESSING }
}

export const onErrorAuth = (response) => {
  return { type: types.LOGIN_ERROR, data: response }
}

export const onSuccessAuth = (response) => {
  localStorage.setItem('token', response.data.token);
  return { type: types.LOGIN_SUCCESS, data: response }
}

export const onHideAlert = () => {
  return { type: types.HIDE_ALERT }
}
