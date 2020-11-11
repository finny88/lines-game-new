import {
  put,
  call,
  all,
  takeEvery,
  select,
  PutEffect,
  AllEffect,
  CallEffect,
  SelectEffect,
} from 'redux-saga/effects';
import { nextCirclesNumberSelector } from 'store/fieldCircles';

import { getCircle } from 'utils/nextCircles';
import { GENERATE_NEXT_CIRCLES, NEXT_CIRCLES_GENERATED } from './actionTypes';

export type GenerateNextCirclesEffect = AllEffect<CallEffect> | PutEffect | SelectEffect;

export function* generateNextCircles(): Generator<GenerateNextCirclesEffect> {
  const nextCirclesNumber = (yield select(nextCirclesNumberSelector)) as number;
  const nextCirclesActions: CallEffect[] = [...Array(nextCirclesNumber).fill(call(getCircle))];

  const nextCirclesColors = yield all(nextCirclesActions);

  yield put({ type: NEXT_CIRCLES_GENERATED, payload: nextCirclesColors });
}

export function* watchNextCirclesRequest(): Generator {
  yield takeEvery(GENERATE_NEXT_CIRCLES, generateNextCircles);
}
