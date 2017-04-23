import { combineReducers } from 'redux';
import { auth } from './auth';
import { todo } from './todo';

const todoApp = combineReducers({
  auth,
  todo
});

export default todoApp;
