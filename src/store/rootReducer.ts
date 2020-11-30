import { AnyAction, CombinedState, combineReducers, Reducer } from 'redux';

import { IAppState, initialLinesState, RESET_REDUX_STATE } from './common';

import { nextCirclesReducer } from './newCircles';
import { fieldCirclesReducer } from './fieldCircles';
import { isCircleMovingReducer } from './circleMoving';
import { scoresCounterReducer } from './scoresCounter';
import { inaccessibleDestinationReducer } from './inaccessibleDestination';
import { increasingInfoReducer } from './increasingInfo';

const combinedReducers: Reducer<CombinedState<IAppState>, AnyAction> = combineReducers<IAppState>({
  nextCircles: nextCirclesReducer,
  fieldCircles: fieldCirclesReducer,
  isCircleMoving: isCircleMovingReducer,
  scoresCounter: scoresCounterReducer,
  inaccessibleDestination: inaccessibleDestinationReducer,
  increasingInfo: increasingInfoReducer,
});

export const rootReducer = (state: IAppState, action: AnyAction): CombinedState<IAppState> =>
  combinedReducers(action.type === RESET_REDUX_STATE ? initialLinesState : state, action);
