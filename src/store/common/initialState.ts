import { IAppState } from './types';

import { NEXT_CIRCLES_NUMBER, PLAYING_FIELD_SQUARES_NUMBER } from 'constants/gameCharacteristics';
import { CircleColor } from 'constants/circleColor';
import { initialSquare } from 'constants/initial';

export const initialLinesState: IAppState = {
  nextCircles: [...Array(NEXT_CIRCLES_NUMBER).fill(CircleColor.white)],
  fieldCircles: [...Array(PLAYING_FIELD_SQUARES_NUMBER).fill(CircleColor.white)],
  isCircleMoving: false,
  allSquaresOccupied: false,
  scoresCounter: 0,
  inaccessibleDestination: initialSquare,
  increasingInfo: { startSquare: -1, lineLength: 0, scoresIncrease: 0 },
};
