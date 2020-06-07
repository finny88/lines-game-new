import { IPlayingFieldSquare } from 'models';

import { Direction } from 'constants/direction';
import { PLAYING_FIELD_ROW_SQUARES_NUMBER } from 'constants/gameCharacteristics';
import { squaresDecades } from 'utils/squaresDecades';

export const motionActions = new Map()
  .set(Direction.UP, {
    boundPredicate: (square: IPlayingFieldSquare) => square.row === 0,
    calculateNeighborIndex: (square: IPlayingFieldSquare) =>
      (square.row - 1) * PLAYING_FIELD_ROW_SQUARES_NUMBER + square.column,
    getStep: (currentSquare: IPlayingFieldSquare) => ({
      from: currentSquare,
      to: squaresDecades[currentSquare.row - 1][currentSquare.column],
    }),
    oppositeDirection: () => Direction.DOWN,
  })
  .set(Direction.DOWN, {
    boundPredicate: (square: IPlayingFieldSquare) =>
      square.row === PLAYING_FIELD_ROW_SQUARES_NUMBER - 1,
    calculateNeighborIndex: (square: IPlayingFieldSquare) =>
      (square.row + 1) * PLAYING_FIELD_ROW_SQUARES_NUMBER + square.column,
    getStep: (currentSquare: IPlayingFieldSquare) => ({
      from: currentSquare,
      to: squaresDecades[currentSquare.row + 1][currentSquare.column],
    }),
    oppositeDirection: () => Direction.UP,
  })
  .set(Direction.LEFT, {
    boundPredicate: (square: IPlayingFieldSquare) => square.column === 0,
    calculateNeighborIndex: (square: IPlayingFieldSquare) =>
      square.row * PLAYING_FIELD_ROW_SQUARES_NUMBER + square.column - 1,
    getStep: (currentSquare: IPlayingFieldSquare) => ({
      from: currentSquare,
      to: squaresDecades[currentSquare.row][currentSquare.column - 1],
    }),
    oppositeDirection: () => Direction.RIGHT,
  })
  .set(Direction.RIGHT, {
    boundPredicate: (square: IPlayingFieldSquare) =>
      square.column === PLAYING_FIELD_ROW_SQUARES_NUMBER - 1,
    calculateNeighborIndex: (square: IPlayingFieldSquare) =>
      square.row * PLAYING_FIELD_ROW_SQUARES_NUMBER + square.column + 1,
    getStep: (currentSquare: IPlayingFieldSquare) => ({
      from: currentSquare,
      to: squaresDecades[currentSquare.row][currentSquare.column + 1],
    }),
    oppositeDirection: () => Direction.LEFT,
  });
