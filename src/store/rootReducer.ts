import { combineReducers } from 'redux';
import { ICounterState, counterReducer } from './counter';

export interface IAppState {
  counter: ICounterState;
}

export const rootReducer = combineReducers<IAppState>({
  counter: counterReducer,
});
