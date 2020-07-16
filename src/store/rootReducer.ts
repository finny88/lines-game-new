import { combineReducers } from 'redux';

import { IAppState } from './common';

import { nextCirclesReducer } from './newCircles';
import { fieldCirclesReducer } from './fieldCircles';
import { isCircleMovingReducer } from './circleMoving';
import { scoresCounterReducer } from './scoresCounter';

export const rootReducer = combineReducers<IAppState>({
  nextCircles: nextCirclesReducer,
  fieldCircles: fieldCirclesReducer,
  isCircleMoving: isCircleMovingReducer,
  scoresCounter: scoresCounterReducer,
});
