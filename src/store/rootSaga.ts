import { all, fork } from 'redux-saga/effects';
import { watchIncrementAsync } from './counter';

export const rootSaga = function* root(): Generator {
  yield all([fork(watchIncrementAsync)]);
};
