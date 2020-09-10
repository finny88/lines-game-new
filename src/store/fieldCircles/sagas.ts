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

import { ILine } from 'utils/linesDetector/types';

import { LinesOrientations } from 'constants/linesOrientations';
import {
  CIRCLE_BLINK_ANIMATION_DELAY,
  DOUBLE_CIRCLE_POINT_WEIGHT,
  TRIPLE_CIRCLE_POINT_WEIGHT,
} from 'constants/gameCharacteristics';
import { CircleColor } from 'constants/circleColor';
import { nextCirclesSelector } from 'store/newCircles';
import { SCORES_INCREASED } from 'store/scoresCounter';
import { SET_INCREASING_INFO } from 'store/increasingInfo';
import { getFieldCircles } from 'utils/fieldCircles';
import { getAllLines } from 'utils/linesDetector/linesDetector';
import { fieldCirclesSelector, nextCirclesNumberSelector } from './selectors';
import { NEW_FIELD_CIRCLES_GENERATED, LINE_DETECTED, DETECT_LINES } from './actionTypes';
import { RESET_INCREASING_INFO } from '../increasingInfo/actionTypes';

const mapLinesOrientationToWeight = {
  [LinesOrientations.HORIZONTAL]: DOUBLE_CIRCLE_POINT_WEIGHT,
  [LinesOrientations.VERTICAL]: DOUBLE_CIRCLE_POINT_WEIGHT,
  [LinesOrientations.LEFT_TO_RIGHT_TOP]: TRIPLE_CIRCLE_POINT_WEIGHT,
  [LinesOrientations.LEFT_TO_RIGHT_BOTTOM]: TRIPLE_CIRCLE_POINT_WEIGHT,
  [LinesOrientations.RIGHT_TO_LEFT_TOP]: TRIPLE_CIRCLE_POINT_WEIGHT,
  [LinesOrientations.RIGHT_TO_LEFT_BOTTOM]: TRIPLE_CIRCLE_POINT_WEIGHT,
};

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

    const scoresIncrease = lines.reduce(
      (accumulator, line) =>
        accumulator + line.circles.length * mapLinesOrientationToWeight[line.type],
      0,
    );

    yield put(
      batchActions([
        {
          type: LINE_DETECTED,
          payload: newFieldCirclesColors,
        },
        {
          type: SCORES_INCREASED,
          payload: scoresIncrease,
        },
        {
          type: SET_INCREASING_INFO,
          payload: {
            startSquare: lines[0].circles[0],
            lineLength: lines[0].circles.length,
            lineType: lines[0].type,
            color: lines[0].color,
            scoresIncrease,
          },
        },
      ]),
    );

    yield delay(CIRCLE_BLINK_ANIMATION_DELAY * 1.5);

    yield put({ type: RESET_INCREASING_INFO });
  }
}

export function* watchDetectLines(): Generator {
  yield takeEvery(DETECT_LINES, detectLines);
}
