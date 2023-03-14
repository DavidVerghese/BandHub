import loggedReducer from './isLoggedIn';
import usersReducer from './users.js';
import instrumentsReducer from './instruments.js';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  isLoggedIn: loggedReducer,
  users: usersReducer,
  instruments: instrumentsReducer
});

export default allReducers;
