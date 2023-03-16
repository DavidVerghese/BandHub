import loggedReducer from './isLoggedIn';
import usersReducer from './users.js';
import instrumentsReducer from './instruments.js';
import genresReducer from './genresReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  isLoggedIn: loggedReducer,
  users: usersReducer,
  instruments: instrumentsReducer,
  genres: genresReducer
});

export default allReducers;
