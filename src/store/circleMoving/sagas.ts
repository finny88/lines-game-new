import {
  select,
  put,
  takeEvery,
  delay,
  SelectEffect,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';

import { ICircleMotionAction } from './types';

import { CircleColor } from 'constants/circleColor';
import { CIRCLE_BLINK_ANIMATION_DELAY } from 'constants/gameCharacteristics';
import {
  fieldCirclesSelector,
  NEW_FIELD_CIRCLES_GENERATED,
  DETECT_LINES,
} from 'store/fieldCircles';
import {
  RESET_INACCESSIBLE_DESTINATION,
  SET_INACCESSIBLE_DESTINATION,
} from 'store/inaccessibleDestination';
import { INIT_NEXT_POSITION } from 'store/common';
import { getCirclesSnapshotsList } from 'utils/circleMotion';
import { SET_CIRCLE_MOVING, MOVE_CIRCLE } from './actionTypes';

type MoveCircleEffect = SelectEffect | CallEffect | PutEffect;

export function* moveCircle({
  payload: circleMotion,
}: ICircleMotionAction): Generator<MoveCircleEffect> {
  const fieldCirclesColors = (yield select(fieldCirclesSelector)) as CircleColor[];

  const snapshots = getCirclesSnapshotsList(circleMotion, fieldCirclesColors);

  if (snapshots.length > 0) {
    for (const snapshot of snapshots) {
      yield put(
        batchActions([
          { type: NEW_FIELD_CIRCLES_GENERATED, payload: snapshot.circles },
          { type: SET_CIRCLE_MOVING, payload: !snapshot.isLast },
        ]),
      );

      yield delay(CIRCLE_BLINK_ANIMATION_DELAY);
    }

    yield put({ type: DETECT_LINES });

    yield put({ type: INIT_NEXT_POSITION });

    yield put({ type: DETECT_LINES });
  } else {
    yield put({ type: SET_INACCESSIBLE_DESTINATION, payload: circleMotion.destination });

    yield delay(CIRCLE_BLINK_ANIMATION_DELAY);

    yield put({ type: RESET_INACCESSIBLE_DESTINATION });
  }
}

export function* watchMoveCircle(): Generator {
  yield takeEvery(MOVE_CIRCLE, moveCircle);
}
