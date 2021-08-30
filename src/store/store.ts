import { createStore, applyMiddleware, CombinedState, AnyAction, Reducer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { createEpicMiddleware } from 'redux-observable';
import { enableBatching } from 'redux-batched-actions';

import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import { rootEpic } from './rootEpic';

import type { IAppState, IAction } from './common';

const sagaMiddleware = createSagaMiddleware();
const epicMiddleware = createEpicMiddleware<IAction, IAction, IAppState>();

export const store = createStore(
  enableBatching(rootReducer as Reducer<CombinedState<IAppState>, AnyAction>),
  composeWithDevTools(applyMiddleware(sagaMiddleware, epicMiddleware)),
);

sagaMiddleware.run(rootSaga);
epicMiddleware.run(rootEpic);
