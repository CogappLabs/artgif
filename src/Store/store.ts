import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers } from './reducer';

const composedEnhancer = composeWithDevTools(applyMiddleware());

export const store = createStore(reducers, composedEnhancer);
