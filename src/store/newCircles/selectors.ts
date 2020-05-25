import { IAppState } from 'store/common';
import { CircleColor } from 'constants/circleColor';

/**
 * Селектор для выборки цветов шаров следующего хода.
 *
 * @param state Redux-store.
 */
export const nextCirclesSelector = (state: IAppState): CircleColor[] => state.nextCircles;
