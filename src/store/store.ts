import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { enableBatching } from 'redux-batched-actions';
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  enableBatching(rootReducer),
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
