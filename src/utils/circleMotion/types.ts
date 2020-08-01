import { IPlayingFieldSquare } from 'models';

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
 * @prop {Function} isEdge Функция определения достижения границы игрового поля.
 * @prop {Function} calculateNeighborIndex Функция определения индекса (в плоском массиве)
 * соседнего квадрата на игровом поле.
 * @prop {Function} getStep Функция получения данных о текущем шаге.
 */
export interface IMotionAction {
  isEdge: (square: IPlayingFieldSquare) => boolean;
  calculateNeighborIndex: (square: IPlayingFieldSquare) => number;
  getStep: (square: IPlayingFieldSquare) => IStep;
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
 */
export interface IPlayingFieldSnapshot {
  circles: CircleColor[];
  isLast: boolean;
}

export interface ISquaresMarksManager {
  _squaresMarks: number[];
  readonly squaresMarks: number[];
  init: (fieldCircles: CircleColor[]) => void;
  update: (index: number, newValue: number) => void;
}
