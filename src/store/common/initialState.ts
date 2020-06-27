import { IAppState } from './types';

import { NEXT_CIRCLES_NUMBER, PLAYING_FIELD_SQUARES_NUMBER } from 'constants/gameCharacteristics';
import { CircleColor } from 'constants/circleColor';

export const initialLinesState: IAppState = {
  nextCircles: [...Array(NEXT_CIRCLES_NUMBER).fill(CircleColor.white)],
  fieldCircles: [...Array(PLAYING_FIELD_SQUARES_NUMBER).fill(CircleColor.white)],
  isCircleMoving: false,
  allSquaresOccupied: false,
  canCircleMove: true,
  pointsCounter: 0,
};
