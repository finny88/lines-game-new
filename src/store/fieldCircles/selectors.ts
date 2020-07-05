import { createSelector } from 'reselect';

import { IAppState } from 'store/common';

import { CircleColor } from 'constants/circleColor';
import { PLAYING_FIELD_SQUARES_NUMBER, NEXT_CIRCLES_NUMBER } from 'constants/gameCharacteristics';

/**
 * Селектор для выборки данных игрового поля (расстановки шаров и флага текущего движения шара).
 *
 * @param state Redux-store.
 */
export const fieldCirclesSelector = (state: IAppState): CircleColor[] => state.fieldCircles;

/**
 * Селектор, вычисляющий количество занятых квадратов.
 */
const squaresOccupiedNumberSelector = createSelector(fieldCirclesSelector, (fieldCircles) =>
  fieldCircles.reduce(
    (accumulator, currentCircle) => (currentCircle !== 0 ? accumulator + 1 : accumulator),
    0,
  ),
);

/**
 * Селектор, вычисляющий количество шаров на следующем ходу.
 * Обычно 3, на последнем ходу 1.
 */
export const nextCirclesNumberSelector = createSelector(
  squaresOccupiedNumberSelector,
  (squaresOccupiedNumber) => {
    const fieldCirclesFreeNumber = PLAYING_FIELD_SQUARES_NUMBER - squaresOccupiedNumber;
    return fieldCirclesFreeNumber > NEXT_CIRCLES_NUMBER
      ? NEXT_CIRCLES_NUMBER
      : fieldCirclesFreeNumber;
  },
);
