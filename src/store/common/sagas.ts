import { takeEvery } from 'redux-saga/effects';

import { generateNextCircles } from 'store/newCircles';
import { INIT_LINES } from './actionTypes';

function* initLines(): Generator {
  yield* generateNextCircles();
}

export function* watchInitLines(): Generator {
  yield takeEvery(INIT_LINES, initLines);
}
