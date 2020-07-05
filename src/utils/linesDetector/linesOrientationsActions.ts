import { LinesOrientation } from 'constants/linesOrientation';
import {
  MIN_LINE_LENGTH,
  PLAYING_FIELD_ROW_SQUARES_NUMBER,
  PLAYING_FIELD_SQUARES_NUMBER,
} from 'constants/gameCharacteristics';
import { squaresDecades } from 'utils/squaresDecades';
import { ILinesOrientationActions } from './types';

const commonIsLineLengthEnough = (diagonal: readonly number[]): boolean =>
  diagonal.length >= MIN_LINE_LENGTH;

const commonIsSquareFlatArrayIndexValid = (squareFlatArrayIndex: number): boolean =>
  squareFlatArrayIndex > -1 && squareFlatArrayIndex < PLAYING_FIELD_SQUARES_NUMBER;

export const linesOrientationActions = new Map<LinesOrientation, ILinesOrientationActions>()
  .set(LinesOrientation.HORIZONTAL, {
    outerCycleStart: 0,
    outerCycleFinish: (i) => i < PLAYING_FIELD_ROW_SQUARES_NUMBER,
    outerCycleStep: (i) => i + 1,
    innerCycleStart: 0,
    innerCycleFinish: (j) => j < PLAYING_FIELD_ROW_SQUARES_NUMBER,
    innerCycleStep: (j) => j + 1,
    getSquareRecordPoint: (i, j) => squaresDecades[i][j],
    isSquareFlatArrayIndexValid: () => true,
    isSquareFlatArrayIndexLast: () => false,
    isLineLengthEnough: commonIsLineLengthEnough,
  })
  .set(LinesOrientation.VERTICAL, {
    outerCycleStart: 0,
    outerCycleFinish: (i) => i < PLAYING_FIELD_ROW_SQUARES_NUMBER,
    outerCycleStep: (i) => i + 1,
    innerCycleStart: 0,
    innerCycleFinish: (j) => j < PLAYING_FIELD_ROW_SQUARES_NUMBER,
    innerCycleStep: (j) => j + 1,
    getSquareRecordPoint: (i, j) => squaresDecades[j][i],
    isSquareFlatArrayIndexValid: () => true,
    isSquareFlatArrayIndexLast: () => false,
    isLineLengthEnough: commonIsLineLengthEnough,
  })
  .set(LinesOrientation.LEFT_TO_RIGHT_TOP_DIAGONAL, {
    outerCycleStart: 1,
    outerCycleFinish: (i) => i < PLAYING_FIELD_ROW_SQUARES_NUMBER,
    outerCycleStep: (i) => i + 1,
    innerCycleStart: 0,
    innerCycleFinish: (j) => j < PLAYING_FIELD_ROW_SQUARES_NUMBER,
    innerCycleStep: (j) => j + 1,
    getSquareRecordPoint: (i, j) => squaresDecades[j + i - 1] && squaresDecades[j + i - 1][j],
    isSquareFlatArrayIndexValid: commonIsSquareFlatArrayIndexValid,
    isSquareFlatArrayIndexLast: () => false,
    isLineLengthEnough: commonIsLineLengthEnough,
  })
  .set(LinesOrientation.LEFT_TO_RIGHT_BOTTOM_DIAGONAL, {
    outerCycleStart: 1,
    outerCycleFinish: (i) => i < PLAYING_FIELD_ROW_SQUARES_NUMBER,
    outerCycleStep: (i) => i + 1,
    innerCycleStart: 0,
    innerCycleFinish: (j) => j <= PLAYING_FIELD_ROW_SQUARES_NUMBER,
    innerCycleStep: (j) => j + 1,
    getSquareRecordPoint: (i, j) => squaresDecades[j - i] && squaresDecades[j - i][j],
    isSquareFlatArrayIndexValid: commonIsSquareFlatArrayIndexValid,
    isSquareFlatArrayIndexLast: () => false,
    isLineLengthEnough: commonIsLineLengthEnough,
  })
  .set(LinesOrientation.RIGHT_TO_LEFT_TOP_DIAGONAL, {
    outerCycleStart: 0,
    outerCycleFinish: (i) => i < PLAYING_FIELD_ROW_SQUARES_NUMBER,
    outerCycleStep: (i) => i + 1,
    innerCycleStart: PLAYING_FIELD_ROW_SQUARES_NUMBER - 1,
    innerCycleFinish: (j) => j >= 0,
    innerCycleStep: (j) => j - 1,
    getSquareRecordPoint: (i, j) =>
      squaresDecades[i + (PLAYING_FIELD_ROW_SQUARES_NUMBER - j)] &&
      squaresDecades[i + (PLAYING_FIELD_ROW_SQUARES_NUMBER - j)][j],
    isSquareFlatArrayIndexValid: commonIsSquareFlatArrayIndexValid,
    isSquareFlatArrayIndexLast: () => false,
    isLineLengthEnough: commonIsLineLengthEnough,
  })
  .set(LinesOrientation.RIGHT_TO_LEFT_BOTTOM_DIAGONAL, {
    outerCycleStart: 1,
    outerCycleFinish: (i) => i < PLAYING_FIELD_ROW_SQUARES_NUMBER,
    outerCycleStep: (i) => i + 1,
    innerCycleStart: PLAYING_FIELD_ROW_SQUARES_NUMBER - 1,
    innerCycleFinish: (j) => j >= 0,
    innerCycleStep: (j) => j - 1,
    getSquareRecordPoint: (i, j) =>
      squaresDecades[PLAYING_FIELD_ROW_SQUARES_NUMBER - j - 1] &&
      squaresDecades[PLAYING_FIELD_ROW_SQUARES_NUMBER - j - 1][j - i + 1],
    isSquareFlatArrayIndexValid: commonIsSquareFlatArrayIndexValid,
    isSquareFlatArrayIndexLast: (squareFlatArrayIndex: number) => squareFlatArrayIndex % 10 === 0,
    isLineLengthEnough: commonIsLineLengthEnough,
  });
