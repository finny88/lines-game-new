import { LinesOrientations } from 'constants/linesOrientations';
import { CircleColor } from 'constants/circleColor';

export interface IIncreasingInfo {
  startSquare: number;
  lineLength: number;
  lineType?: LinesOrientations;
  color?: CircleColor;
  scoresIncrease: number;
}
