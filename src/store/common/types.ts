import { CircleColor } from 'constants/circleColor';

// TODO: create reducers for optional fields and make these ones mandatory
export interface IAppState {
  nextCircles: CircleColor[];
  fieldCircles: CircleColor[];
  isCircleMoving: boolean;
  allSquaresOccupied?: boolean;
  canCircleMove?: boolean;
  scoresCounter: number;
}

/**
 * Допустимые типы данных для redux-actions.
 */
export type AllowedPayloadType = IAppState[keyof IAppState];

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
export interface IPayloadAction<T extends AllowedPayloadType> extends IAction {
  payload: T;
}
