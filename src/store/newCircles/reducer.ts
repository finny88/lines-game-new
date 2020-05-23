import { IPayloadAction } from 'store/common';

import { CircleColor } from 'constants/circleColor';
import { initialLinesState, HighOrderedReducer } from 'store/common';
import { NEXT_CIRCLES_GENERATED } from './actionTypes';

/**
 * Редьюсер для ветки стора с цветом шаров будущего хода.
 *
 * @param {List<CircleColor>} state Текущие цвета шаров следующего хода.
 * @param {IPayloadAction<List<CircleColor>} [action] Экшен с цветами шаров.
 */
const nextCirclesReducer = (
  state: CircleColor[] = initialLinesState['nextCircles'],
  action: IPayloadAction<CircleColor[]>,
): CircleColor[] =>
  HighOrderedReducer(
    state,
    {
      [NEXT_CIRCLES_GENERATED]: action.payload,
    },
    action,
  );

export default nextCirclesReducer;
