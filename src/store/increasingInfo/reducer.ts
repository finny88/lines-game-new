import { handleActions } from 'redux-actions';

import { IIncreasingInfo } from 'models/increasingInfo';

import { initialLinesState, commonReducer } from 'store/common';
import { SET_INCREASING_INFO, RESET_INCREASING_INFO } from './actionTypes';

const increasingInfo = handleActions<IIncreasingInfo>(
  {
    [SET_INCREASING_INFO]: commonReducer,
    [RESET_INCREASING_INFO]: () => initialLinesState['increasingInfo'],
  },
  initialLinesState['increasingInfo'],
);

export default increasingInfo;
