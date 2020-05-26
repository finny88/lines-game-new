import { put, call, all, takeEvery, PutEffect, AllEffect, CallEffect } from 'redux-saga/effects';

import { NEXT_CIRCLES_NUMBER } from 'constants/gameCharacteristics';
import { getCircle } from 'utils/nextCircles';
import { GENERATE_NEXT_CIRCLES, NEXT_CIRCLES_GENERATED } from './actionTypes';

export type GenerateNextCirclesEffect = AllEffect<CallEffect> | PutEffect;

export function* generateNextCircles(): Generator<GenerateNextCirclesEffect> {
  const nextCirclesActions: CallEffect[] = [...Array(NEXT_CIRCLES_NUMBER).fill(call(getCircle))];

  const nextCirclesColors = yield all(nextCirclesActions);

  yield put({ type: NEXT_CIRCLES_GENERATED, payload: nextCirclesColors });
}

export function* watchNextCirclesRequest(): Generator {
  yield takeEvery(GENERATE_NEXT_CIRCLES, generateNextCircles);
}
