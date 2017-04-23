import * as types from '../constant/auth-const';

export const auth = (state = {
  isLoading: false,
  data: []
}, action) => {
  switch (action.type) {
    case types.LOGIN_PROSESSING:
      state = {...state, isLoading: true};
      break;
    case types.LOGIN_ERROR:
      state = {...state, isLoading: false, data: action.data};
      break;
    case types.LOGIN_SUCCESS:
      state = {...state, isLoading: false, data: action.data};
      break;
    case types.HIDE_ALERT:
      state = {...state, isLoading: false, data: []};
      break;
    default:
      state = {...state};
  }

  return state;
}
