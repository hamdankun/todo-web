import * as types from '../constant/todo-const';

export const onProsessingData = (action_type) => {
  return { type: types.PROSESSING_DATA, action_type: action_type }
}

export const onProsessedData = (response) => {
  return { type: types.PROCESSED_DATA, action_type: 'fetched-data', data: response.data, status: response.status, code: response.code }
}
