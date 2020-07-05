import { select, put, call, SelectEffect, CallEffect, PutEffect } from 'redux-saga/effects';

import { CircleColor } from 'constants/circleColor';
import { nextCirclesSelector } from 'store/newCircles';
import { getFieldCircles } from 'utils/fieldCircles';
import { fieldCirclesSelector, nextCirclesNumberSelector } from './selectors';
import { NEW_FIELD_CIRCLES_GENERATED } from './actionTypes';

export type GenerateFieldCirclesEffect = SelectEffect | CallEffect | PutEffect;

export function* generateFieldCircles(): Generator<GenerateFieldCirclesEffect> {
  const nextCircles = (yield select(nextCirclesSelector)) as CircleColor[];
  const fieldCircles = (yield select(fieldCirclesSelector)) as CircleColor[];
  const nextCirclesNumber = (yield select(nextCirclesNumberSelector)) as number;

  const newFieldCircles = yield call<typeof getFieldCircles>(getFieldCircles, {
    nextCircles,
    fieldCircles,
    nextCirclesNumber,
  });

  yield put({ type: NEW_FIELD_CIRCLES_GENERATED, payload: newFieldCircles });
}
