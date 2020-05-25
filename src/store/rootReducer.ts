import { combineReducers } from 'redux';

import { IAppState } from './common';

import { nextCirclesReducer } from './newCircles';
import { fieldCirclesReducer } from './fieldCircles';

export const rootReducer = combineReducers<IAppState>({
  nextCircles: nextCirclesReducer,
  fieldCircles: fieldCirclesReducer,
});
