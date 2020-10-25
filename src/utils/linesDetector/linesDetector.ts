import { IColoredLine, ILine, ILinesOrientationActions } from './types';

import { CircleColor } from 'constants/circleColor';
import { MIN_LINE_LENGTH } from 'constants/gameCharacteristics';
import { linesOrientationActions } from './linesOrientationsActions';

function* getCircles(i: number, actions: ILinesOrientationActions): IterableIterator<number> {
  for (
    let j = actions.innerCycleStart;
    actions.innerCycleFinish(j);
    j = actions.innerCycleStep(j)
  ) {
    const squareFlatArrayIndex = actions.getSquareRecordPoint(i, j)?.flatIndex;

    if (actions.isSquareFlatArrayIndexValid(squareFlatArrayIndex)) {
      yield squareFlatArrayIndex;
    }

    if (actions.isSquareFlatArrayIndexLast(squareFlatArrayIndex)) {
      break;
    }
  }
}

function* getDiagonals(): IterableIterator<ILine> {
  for (const [key, actions] of linesOrientationActions) {
    for (
      let i = actions.outerCycleStart;
      actions.outerCycleFinish(i);
      i = actions.outerCycleStep(i)
    ) {
      const circles = Array.from(getCircles(i, actions));

      if (actions.isLineLengthEnough(circles)) {
        yield { circles, type: key };
      }
    }
  }
}

const diagonals: ILine[] = Array.from(getDiagonals());

function* getCurrentLine(
  startIndex: number,
  currentDiagonal: ILine,
  fieldCircles: CircleColor[],
): IterableIterator<number> {
  for (let j = startIndex; j < currentDiagonal.circles.length; j++) {
    const prevIndex = currentDiagonal.circles[j - 1];
    const prevFieldCircleColor: CircleColor = fieldCircles[prevIndex];

    if (j === startIndex) {
      yield prevIndex;
    }

    const currentIndex = currentDiagonal.circles[j];

    const currentFieldCircleColor: CircleColor = fieldCircles[currentIndex];

    if (prevFieldCircleColor === currentFieldCircleColor) {
      yield currentIndex;
    } else {
      return;
    }
  }
}

export function* getAllLines(fieldCircles: CircleColor[]): IterableIterator<IColoredLine> {
  for (let i = 0; i < diagonals.length; i++) {
    const currentDiagonal = diagonals[i];

    let checkedCurrentDiagonalItems = 0;

    do {
      const currentLine = Array.from(
        getCurrentLine(checkedCurrentDiagonalItems + 1, currentDiagonal, fieldCircles),
      );

      if (
        currentLine.length >= MIN_LINE_LENGTH &&
        fieldCircles[currentLine[0]] !== CircleColor.white
      ) {
        yield {
          circles: currentLine,
          type: currentDiagonal.type,
          color: fieldCircles[currentLine[0]],
        };
      }

      checkedCurrentDiagonalItems += currentLine.length;
    } while (currentDiagonal.circles.length - checkedCurrentDiagonalItems >= MIN_LINE_LENGTH);
  }
}
