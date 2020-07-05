import { handleActions } from 'redux-actions';

import { CircleColor } from 'constants/circleColor';
import { initialLinesState, commonReducer } from 'store/common';
import { NEXT_CIRCLES_GENERATED } from './actionTypes';

/**
 * Редьюсер для ветки стора с цветом шаров будущего хода.
 *
 * @param {List<CircleColor>} state Текущие цвета шаров следующего хода.
 * @param {IPayloadAction<List<CircleColor>} [action] Экшен с цветами шаров.
 */
const nextCirclesReducer = handleActions<CircleColor[]>(
  {
    [NEXT_CIRCLES_GENERATED]: commonReducer,
  },
  initialLinesState['nextCircles'],
);

export default nextCirclesReducer;
