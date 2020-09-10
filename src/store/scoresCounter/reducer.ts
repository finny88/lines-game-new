import { handleActions } from 'redux-actions';

import { initialLinesState } from 'store/common';
import { SCORES_INCREASED } from './actionTypes';

const scoresCounterReducer = handleActions<number, number>(
  {
    [SCORES_INCREASED]: (state, { payload }) => state + payload,
  },
  initialLinesState['scoresCounter'],
);

export default scoresCounterReducer;
