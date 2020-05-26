import { takeEvery } from 'redux-saga/effects';

import { generateNextCircles, GenerateNextCirclesEffect } from 'store/newCircles';
import { INIT_LINES } from './actionTypes';
import { generateFieldCircles, GenerateFieldCirclesEffect } from 'store/fieldCircles';

export type InitLinesEffect = GenerateFieldCirclesEffect | GenerateNextCirclesEffect;

function* initLines(): Generator<InitLinesEffect> {
  yield* generateNextCircles();

  yield* generateFieldCircles();

  yield* generateNextCircles();
}

export function* watchInitLines(): Generator {
  yield takeEvery(INIT_LINES, initLines);
}
