import { CircleColor } from 'constants/circleColor';
import { CIRCLE_COLORS_NUMBER } from 'constants/gameCharacteristics';

export const GetCircle = (): CircleColor => {
  return Math.floor(Math.random() * CIRCLE_COLORS_NUMBER) + 1;
};
