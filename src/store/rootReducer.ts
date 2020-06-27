import { combineReducers } from 'redux';

import { IAppState } from './common';

import { nextCirclesReducer } from './newCircles';
import { fieldCirclesReducer, isCircleMovingReducer } from './fieldCircles';

export const rootReducer = combineReducers<IAppState>({
  nextCircles: nextCirclesReducer,
  fieldCircles: fieldCirclesReducer,
  isCircleMoving: isCircleMovingReducer,
});
