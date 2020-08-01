import { CircleColor } from 'constants/circleColor';
import { IPlayingFieldSquare } from 'models';

// TODO: create reducers for optional fields and make these ones mandatory
export interface IAppState {
  nextCircles: CircleColor[];
  fieldCircles: CircleColor[];
  isCircleMoving: boolean;
  inaccessibleDestination: IPlayingFieldSquare;
  allSquaresOccupied?: boolean;
  scoresCounter: number;
}

/**
 * Допустимые типы данных для redux-actions.
 */
export type AllowedPayloadType = IAppState[keyof IAppState];

/**
 * Простейшее redux действие.
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
