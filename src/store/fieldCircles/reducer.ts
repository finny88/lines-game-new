import { IPayloadAction } from 'store/common';

import { CircleColor } from 'constants/circleColor';
import { initialLinesState, HighOrderedReducer } from 'store/common';
import { NEW_FIELD_CIRCLES_GENERATED, SET_CIRCLE_MOVING } from './actionTypes';

/**
 * Редьюсер для ветки игрового поля (расстановка и флаг текущего движения).
 *
 * @param state Текущее состояние игрового поля.
 * @param action Экшен с данными игрового поля.
 */
export const fieldCirclesReducer = (
  state: CircleColor[] = initialLinesState['fieldCircles'],
  action: IPayloadAction<CircleColor[]>,
): CircleColor[] =>
  HighOrderedReducer(
    state,
    {
      [NEW_FIELD_CIRCLES_GENERATED]: action.payload,
    },
    action,
  );

export const isCircleMovingReducer = (
  state: boolean = initialLinesState['isCircleMoving'],
  action: IPayloadAction<boolean>,
): boolean =>
  HighOrderedReducer(
    state,
    {
      [SET_CIRCLE_MOVING]: action.payload,
    },
    action,
  );
