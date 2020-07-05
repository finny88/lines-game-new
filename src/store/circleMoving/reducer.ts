import { handleActions } from 'redux-actions';

import { commonReducer, initialLinesState } from 'store/common';
import { SET_CIRCLE_MOVING } from './actionTypes';

const isCircleMovingReducer = handleActions<boolean>(
  {
    [SET_CIRCLE_MOVING]: commonReducer,
  },
  initialLinesState['isCircleMoving'],
);

export default isCircleMovingReducer;
