import { all, fork, AllEffect, ForkEffect } from 'redux-saga/effects';

import { watchInitLines, watchInitNextPosition } from './common';
import { watchMoveCircle } from './circleMoving';
import { watchDetectLines } from './fieldCircles';

type RootSagaEffect = AllEffect<ForkEffect<Generator>>;

export const rootSaga = function* root(): Generator<RootSagaEffect> {
  yield all([
    fork(watchInitLines),
    fork(watchInitNextPosition),
    fork(watchMoveCircle),
    fork(watchDetectLines),
  ]);
};
