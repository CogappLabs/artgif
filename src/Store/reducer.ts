import { combineReducers } from 'redux';
import { artworkReducer } from './artworks/artworks.reducer';
import { darkModeReducer } from './darkmode';

export const reducers = combineReducers({
  darkmode: darkModeReducer,
  artworks: artworkReducer,
});
