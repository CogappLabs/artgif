import { combineReducers } from 'redux';
import { darkModeReducer } from './darkmode';

export const reducers = combineReducers({
  darkMode: darkModeReducer,
});
