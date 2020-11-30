import { createStore, applyMiddleware, CombinedState, AnyAction, Reducer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { enableBatching } from 'redux-batched-actions';

import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import { IAppState } from './common';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  enableBatching(rootReducer as Reducer<CombinedState<IAppState>, AnyAction>),
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
