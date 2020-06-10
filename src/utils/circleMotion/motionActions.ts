import { IPlayingFieldSquare } from 'models';

import { Direction } from 'constants/direction';
import { PLAYING_FIELD_ROW_SQUARES_NUMBER } from 'constants/gameCharacteristics';
import { squaresDecades } from 'utils/squaresDecades';
import { IMotionAction } from './types';

export const motionActions = new Map<Direction, IMotionAction>()
  .set(Direction.UP, {
    isEdge: (square: IPlayingFieldSquare) => square.row === 0,
    calculateNeighborIndex: (square: IPlayingFieldSquare) =>
      (square.row - 1) * PLAYING_FIELD_ROW_SQUARES_NUMBER + square.column,
    getStep: (currentSquare: IPlayingFieldSquare) => ({
      from: currentSquare,
      to: squaresDecades[currentSquare.row - 1][currentSquare.column],
    }),
    // oppositeDirection: () => Direction.DOWN,
  })
  .set(Direction.DOWN, {
    isEdge: (square: IPlayingFieldSquare) => square.row === PLAYING_FIELD_ROW_SQUARES_NUMBER - 1,
    calculateNeighborIndex: (square: IPlayingFieldSquare) =>
      (square.row + 1) * PLAYING_FIELD_ROW_SQUARES_NUMBER + square.column,
    getStep: (currentSquare: IPlayingFieldSquare) => ({
      from: currentSquare,
      to: squaresDecades[currentSquare.row + 1][currentSquare.column],
    }),
    // oppositeDirection: () => Direction.UP,
  })
  .set(Direction.LEFT, {
    isEdge: (square: IPlayingFieldSquare) => square.column === 0,
    calculateNeighborIndex: (square: IPlayingFieldSquare) =>
      square.row * PLAYING_FIELD_ROW_SQUARES_NUMBER + square.column - 1,
    getStep: (currentSquare: IPlayingFieldSquare) => ({
      from: currentSquare,
      to: squaresDecades[currentSquare.row][currentSquare.column - 1],
    }),
    // oppositeDirection: () => Direction.RIGHT,
  })
  .set(Direction.RIGHT, {
    isEdge: (square: IPlayingFieldSquare) => square.column === PLAYING_FIELD_ROW_SQUARES_NUMBER - 1,
    calculateNeighborIndex: (square: IPlayingFieldSquare) =>
      square.row * PLAYING_FIELD_ROW_SQUARES_NUMBER + square.column + 1,
    getStep: (currentSquare: IPlayingFieldSquare) => ({
      from: currentSquare,
      to: squaresDecades[currentSquare.row][currentSquare.column + 1],
    }),
    /// oppositeDirection: () => Direction.LEFT,
  });
