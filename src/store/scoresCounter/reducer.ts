import { handleActions } from 'redux-actions';

import { IScoresIncreasedPayload } from './types';

import { LinesOrientations } from 'constants/linesOrientations';
import {
  DOUBLE_CIRCLE_POINT_WEIGHT,
  TRIPLE_CIRCLE_POINT_WEIGHT,
} from 'constants/gameCharacteristics';
import { initialLinesState } from 'store/common';
import { SCORES_INCREASED } from './actionTypes';

const mapLinesOrientationToWeight = {
  [LinesOrientations.HORIZONTAL]: DOUBLE_CIRCLE_POINT_WEIGHT,
  [LinesOrientations.VERTICAL]: DOUBLE_CIRCLE_POINT_WEIGHT,
  [LinesOrientations.LEFT_TO_RIGHT_TOP_DIAGONAL]: TRIPLE_CIRCLE_POINT_WEIGHT,
  [LinesOrientations.LEFT_TO_RIGHT_BOTTOM_DIAGONAL]: TRIPLE_CIRCLE_POINT_WEIGHT,
  [LinesOrientations.RIGHT_TO_LEFT_TOP_DIAGONAL]: TRIPLE_CIRCLE_POINT_WEIGHT,
  [LinesOrientations.RIGHT_TO_LEFT_BOTTOM_DIAGONAL]: TRIPLE_CIRCLE_POINT_WEIGHT,
};

const scoresCounterReducer = handleActions<number, IScoresIncreasedPayload>(
  {
    [SCORES_INCREASED]: (state, { payload: { lineLength, lineOrientation } }) =>
      state + lineLength * mapLinesOrientationToWeight[lineOrientation],
  },
  initialLinesState['scoresCounter'],
);

export default scoresCounterReducer;
