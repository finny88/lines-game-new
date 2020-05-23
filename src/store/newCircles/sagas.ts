import { put, call, all, takeEvery } from 'redux-saga/effects';

import { NEXT_CIRCLES_NUMBER } from 'constants/gameCharacteristics';
import { GetCircle } from 'utils/nextCircles';
import { GENERATE_NEXT_CIRCLES, NEXT_CIRCLES_GENERATED } from './actionTypes';

export function* generateNextCircles(): Generator {
  const nextCirclesActions = [...Array(NEXT_CIRCLES_NUMBER).fill(call(GetCircle))];

  const nextCirclesColors = yield all(nextCirclesActions);

  yield put({ type: NEXT_CIRCLES_GENERATED, payload: nextCirclesColors });
}

export function* watchNextCirclesRequest(): Generator {
  yield takeEvery(GENERATE_NEXT_CIRCLES, generateNextCircles);
}
