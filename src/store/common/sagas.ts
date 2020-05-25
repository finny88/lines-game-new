import { takeEvery, Effect } from 'redux-saga/effects';

import { generateNextCircles } from 'store/newCircles';
import { INIT_LINES } from './actionTypes';
import { generateFieldCircles } from 'store/fieldCircles';
import { CircleColor } from 'constants/circleColor';

function* initLines(): Generator<Effect, void, CircleColor[]> {
  yield* generateNextCircles();

  yield* generateFieldCircles();
}

export function* watchInitLines(): Generator {
  yield takeEvery(INIT_LINES, initLines);
}
