import {
  select,
  put,
  call,
  takeEvery,
  delay,
  SelectEffect,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';

import { CircleColor } from 'constants/circleColor';
import { CIRCLE_BLINK_ANIMATION_DELAY } from 'constants/gameCharacteristics';
import { nextCirclesSelector } from 'store/newCircles';
import { INIT_NEXT_POSITION } from 'store/common';
import { getFieldCircles } from 'utils/fieldCircles';
import { getCirclesSnapshotsList } from 'utils/circleMotion';
import { fieldCirclesSelector, nextCirclesNumberSelector } from './selectors';
import { NEW_FIELD_CIRCLES_GENERATED, SET_CIRCLE_MOVING, MOVE_CIRCLE } from './actionTypes';
import { ICircleMotionAction } from './types';

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

type MoveCircleEffect = SelectEffect | CallEffect | PutEffect;

export function* moveCircle({
  payload: circleMotion,
}: ICircleMotionAction): Generator<MoveCircleEffect> {
  const fieldCirclesColors = (yield select(fieldCirclesSelector)) as CircleColor[];

  const snapshots = getCirclesSnapshotsList(circleMotion, fieldCirclesColors);

  if (snapshots.length > 0) {
    for (const snapshot of snapshots) {
      if (snapshot.motionPossible) {
        yield put(
          batchActions([
            { type: NEW_FIELD_CIRCLES_GENERATED, payload: snapshot.circles },
            { type: SET_CIRCLE_MOVING, payload: !snapshot.isLast },
          ]),
        );

        yield delay(CIRCLE_BLINK_ANIMATION_DELAY);
      }
    }
  }

  yield put({ type: INIT_NEXT_POSITION });
}

export function* watchMoveCircle(): Generator {
  yield takeEvery(MOVE_CIRCLE, moveCircle);
}
