import { all, fork, AllEffect, ForkEffect } from 'redux-saga/effects';

import { watchNextCirclesRequest } from './newCircles/sagas';
import { watchInitLines } from './common';

type RootSagaEffect = AllEffect<ForkEffect<Generator>>;

export const rootSaga = function* root(): Generator<RootSagaEffect> {
  yield all([fork(watchInitLines), fork(watchNextCirclesRequest), fork(watchNextCirclesRequest)]);
};
