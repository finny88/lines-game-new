import { all, fork } from 'redux-saga/effects';

import { watchNextCirclesRequest } from './newCircles/sagas';
import { watchInitLines } from './common';

export const rootSaga = function* root(): Generator {
  yield all([fork(watchInitLines), fork(watchNextCirclesRequest), fork(watchNextCirclesRequest)]);
};
