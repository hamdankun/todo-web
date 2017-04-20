import * as types from './auth-const';

export const onDoAuth = () => {
  return { type: types.LOGIN_PROSESSING }
}

export const onErrorAuth = (response) => {
  return { type: types.LOGIN_ERROR, data: response }
}

export const onSuccessAuth = (response) => {
  return { type: types.LOGIN_SUCCESS, data: response }
}
