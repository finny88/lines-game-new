import { IPlayingFieldSquare } from 'models';

import { Direction } from 'constants/direction';
import { CircleColor } from 'constants/circleColor';

/**
 * Шаг передвигаемого кружка.
 *
 * @prop {IPointRecord} from Откуда.
 * @prop {IPointRecord} to Куда.
 */
export interface IStep {
  from: IPlayingFieldSquare;
  to: IPlayingFieldSquare;
}

/**
 * Структура данных, описывающая возможные действия при движении кружка по игровому полю.
 *
 * @prop {Function} boundPredicate Функция определения достижения границы игрового поля.
 * @prop {Function} calculateNeighborIndex Функция определения индекса (в плоском массиве)
 * соседнего квадрата на игровом поле.
 * @prop {Function} getStep Функция получения данных о текущем шаге.
 * @prop {Function} oppositeDirection Функция получения противоположного направления.
 */
export interface IMotionAction {
  boundPredicate: (square: IPlayingFieldSquare) => boolean;
  calculateNeighborIndex: (square: IPlayingFieldSquare) => number;
  getStep: (square: IPlayingFieldSquare) => IStep;
  oppositeDirection: () => Direction;
}

/**
 * Данные передвижения шарика.
 *
 * @prop {IPlayingFieldSquare} source Квадрат-источник.
 * @prop {IPlayingFieldSquare} destination Квадрат-местоположение.
 */
export interface ICircleMotion {
  source: IPlayingFieldSquare;
  destination: IPlayingFieldSquare;
}

/**
 * Снимок игрового поля при передвижении объекта.
 *
 * @prop {CircleColor[]} circles Текущая расстовка кружков на игровом поле.
 * @prop {boolean} isLast Последний ли ход.
 * @prop {boolean} motionPossible Возможно ли движении по заданному объекту типа ICircleMotion.
 */
export interface IPlayingFieldSnapshot {
  circles: CircleColor[];
  isLast: boolean;
  motionPossible: boolean;
}

/**
 * Снимок игрового поля при передвижении объекта.
 *
 * @prop {CircleColor[]} circles Текущая расстовка кружков на игровом поле.
 * @prop {boolean} isLast Последний ли ход.
 * @prop {boolean} motionIsPossible Возможно ли движении по заданному объекету типа ICircleMotion.
 */
export interface ICirclesMotionSnapshot {
  circles: CircleColor[];
  isLast: boolean;
  motionIsPossible: boolean;
}
