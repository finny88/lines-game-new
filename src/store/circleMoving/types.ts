import { ICircleMotion } from 'utils/circleMotion';

import { MOVE_CIRCLE } from './actionTypes';

export interface ICircleMotionAction {
  type: typeof MOVE_CIRCLE;
  payload: ICircleMotion;
}
