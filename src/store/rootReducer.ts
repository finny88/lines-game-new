import { combineReducers } from 'redux';

import { IAppState } from './common';

import { nextCirclesReducer } from './newCircles';

export const rootReducer = combineReducers<IAppState>({
  nextCircles: nextCirclesReducer,
});
