import { put, takeEvery, PutEffect } from 'redux-saga/effects';

import { GENERATE_NEXT_CIRCLES } from 'store/newCircles';
import { INIT_LINES, INIT_NEXT_POSITION } from './actionTypes';
import { generateFieldCircles, GenerateFieldCirclesEffect } from 'store/fieldCircles';

export type InitLinesEffect = GenerateFieldCirclesEffect | PutEffect;

function* initLines(): Generator<InitLinesEffect> {
  yield put({ type: GENERATE_NEXT_CIRCLES });

  yield* generateFieldCircles();

  yield put({ type: GENERATE_NEXT_CIRCLES });
}

function* initNextPosition(): Generator<InitLinesEffect> {
  yield* generateFieldCircles();

  yield put({ type: GENERATE_NEXT_CIRCLES });
}

export function* watchInitLines(): Generator {
  yield takeEvery(INIT_LINES, initLines);
}

export function* watchInitNextPosition(): Generator {
  yield takeEvery(INIT_NEXT_POSITION, initNextPosition);
}
