import { IPlayingFieldSquare } from 'models';

import { LinesOrientation } from 'constants/linesOrientation';

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
  type: LinesOrientation;
}
