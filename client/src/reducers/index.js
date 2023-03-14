import loggedReducer from './isLoggedIn';
import usersReducer from './users.js';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  isLoggedIn: loggedReducer,
  users: usersReducer
});

export default allReducers;
