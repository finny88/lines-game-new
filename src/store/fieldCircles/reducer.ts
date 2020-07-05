import { handleActions } from 'redux-actions';

import { CircleColor } from 'constants/circleColor';
import { initialLinesState, commonReducer } from 'store/common';
import { NEW_FIELD_CIRCLES_GENERATED, SET_CIRCLE_MOVING } from './actionTypes';

/**
 * Редьюсер для ветки игрового поля (расстановка и флаг текущего движения).
 *
 * @param state Текущее состояние игрового поля.
 * @param action Экшен с данными игрового поля.
 */
export const fieldCirclesReducer = handleActions<CircleColor[]>(
  {
    [NEW_FIELD_CIRCLES_GENERATED]: commonReducer,
  },
  initialLinesState['fieldCircles'],
);

export const isCircleMovingReducer = handleActions<boolean>(
  {
    [SET_CIRCLE_MOVING]: commonReducer,
  },
  initialLinesState['isCircleMoving'],
);
