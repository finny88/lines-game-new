import { IPlayingFieldSquare } from 'models';

import { LinesOrientations } from 'constants/linesOrientations';
import { CircleColor } from 'constants/circleColor';

/**
 * Структура данных, описывающая действия при формировании диагоналей на игровом поле.
 */
export interface ILinesOrientationActions {
  outerCycleStart: number;
  outerCycleFinish: (i: number) => boolean;
  outerCycleStep: (i: number) => number;
  innerCycleStart: number;
  innerCycleFinish: (j: number) => boolean;
  innerCycleStep: (j: number) => number;
  getSquareRecordPoint: (i: number, j: number) => IPlayingFieldSquare;
  isSquareFlatArrayIndexValid: (squareFlatArrayIndex: number) => boolean;
  isSquareFlatArrayIndexLast: (squareFlatArrayIndex: number) => boolean;
  isLineLengthEnough: (diagonal: readonly number[]) => boolean;
}

/**
 * Описание линии одоцветных кружков
 * @prop {ReadonlyArray<number>} circles Номера кружков на игровом поле.
 * @prop {LinesOrientation} type Тип диагонали.
 */
export interface ILine {
  circles: readonly number[];
  type: LinesOrientations;
}

export interface IColoredLine extends ILine {
  color: CircleColor;
}
