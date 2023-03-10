import loggedReducer from './isLoggedIn';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  isLoggedIn: loggedReducer
});

export default allReducers;
