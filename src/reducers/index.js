import { combineReducers } from 'redux';
import { auth } from './auth';

const todoApp = combineReducers({
  auth
});

export default todoApp;
