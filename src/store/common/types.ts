import { CircleColor } from 'constants/circleColor';

/**
 * Простешее redux действие.
 *
 * @prop {string} type Тип redux действия.
 */
export interface IAction {
  type: string;
}

/**
 * Redux действие с полезной нагрузкой.
 *
 * @prop {T} payload Данные.
 */
export interface IPayloadAction<T> extends IAction {
  payload: T;
}

/**
 * Допустимые типы данных для redux-actions.
 */
export type AllowedPayloadType = CircleColor | CircleColor[] | boolean | number;

// TODO: create reducers for optional fields and make these ones mandatory
export interface IAppState {
  nextCircles: CircleColor[];
  fieldCircles: CircleColor[];
  isCircleMoving: boolean;
  allSquaresOccupied?: boolean;
  canCircleMove?: boolean;
  pointsCounter?: number;
}
