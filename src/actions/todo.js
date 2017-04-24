import * as types from '../constant/todo-const';

export const onProsessingData = (action_type) => {
  return { type: types.PROSESSING_DATA, action_type: action_type }
}

export const onProsessedData = (response, action_type: 'fetched-data') => {
  return { type: types.PROCESSED_DATA, action_type: action_type, data: response.data, status: response.status, code: response.code }
}
