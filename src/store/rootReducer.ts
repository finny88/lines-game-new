import { combineReducers } from 'redux';

import { IAppState } from './common';

import { nextCirclesReducer } from './newCircles';
import { fieldCirclesReducer } from './fieldCircles';
import { isCircleMovingReducer } from './circleMoving';
import { scoresCounterReducer } from './scoresCounter';
import { inaccessibleDestinationReducer } from './inaccessibleDestination';

export const rootReducer = combineReducers<IAppState>({
  nextCircles: nextCirclesReducer,
  fieldCircles: fieldCirclesReducer,
  isCircleMoving: isCircleMovingReducer,
  scoresCounter: scoresCounterReducer,
  inaccessibleDestination: inaccessibleDestinationReducer,
});
