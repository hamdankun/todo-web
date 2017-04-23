import * as types from '../constant/todo-const';

export const todo = (state = {
  isLoading: false,
  data: [],
  action_type: 'fetch',
  status: false,
  code: 400
}, action) => {
  switch (action.type) {
    case types.PROSESSING_DATA:
      state = { ...state, isLoading: true, data: [], action_type: action.action_type };
      break;
    case types.PROCESSED_DATA:
        state = { ...state, isLoading: false, data: action.data, action_type: action.action_type ,status: action.status, code: action.code };
      break;
    default:
      return state;
  }

  return state;
}
