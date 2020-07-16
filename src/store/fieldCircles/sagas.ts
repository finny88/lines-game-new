import {
  select,
  put,
  call,
  SelectEffect,
  CallEffect,
  PutEffect,
  takeEvery,
} from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';

import { ILine } from 'utils/linesDetector/types';

import { CircleColor } from 'constants/circleColor';
import { nextCirclesSelector } from 'store/newCircles';
import { SCORES_INCREASED } from 'store/scoresCounter';
import { getFieldCircles } from 'utils/fieldCircles';
import { getAllLines } from 'utils/linesDetector/linesDetector';
import { fieldCirclesSelector, nextCirclesNumberSelector } from './selectors';
import { NEW_FIELD_CIRCLES_GENERATED, LINE_DETECTED, DETECT_LINES } from './actionTypes';

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

function* detectLines(): Generator {
  const fieldCirclesColors = (yield select(fieldCirclesSelector)) as CircleColor[];

  const lines = Array.from(getAllLines(fieldCirclesColors));

  if (lines.length > 0) {
    const circles = lines.reduce(
      (accumulator: number[], line: ILine) => [...accumulator, ...line.circles],
      [],
    );

    const newFieldCirclesColors: CircleColor[] = fieldCirclesColors.map((color, index) =>
      circles.includes(index) ? CircleColor.white : color,
    );

    yield put(
      batchActions([
        { type: LINE_DETECTED, payload: newFieldCirclesColors },
        ...lines.map((line) => ({
          type: SCORES_INCREASED,
          payload: { lineLength: line.circles.length, lineOrientation: line.type },
        })),
      ]),
    );
  }
}

export function* watchDetectLines(): Generator {
  yield takeEvery(DETECT_LINES, detectLines);
}
