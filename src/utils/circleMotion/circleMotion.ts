import flow from 'lodash.flow';

import { IPlayingFieldSquare } from 'models/playingFieldSquare';
import { ICircleMotion, IStep, IPlayingFieldSnapshot, ISquaresMarksManager } from './types';

import { CircleColor } from 'constants/circleColor';
import { Direction } from 'constants/direction';
import { updateArrayItem } from 'utils/arrays';
import { motionActions } from './motionActions';

const squaresMarksManager: ISquaresMarksManager = {
  _squaresMarks: [],
  get squaresMarks() {
    return this._squaresMarks;
  },
  init: function (fieldCircles: CircleColor[]) {
    this._squaresMarks = fieldCircles.map((circle) => (circle === CircleColor.white ? 0 : -1));
  },
  update: function (index: number, newValue: number) {
    this._squaresMarks = updateArrayItem(this._squaresMarks, index, newValue);
  },
};

const getDirections = (circleMotion: ICircleMotion): Direction[] => {
  const { source, destination } = circleMotion;

  const toUp = source.row - destination.row > 0;
  const toDown = source.row - destination.row < 0;
  const sameRow = source.row - destination.row === 0;

  const toLeft = source.column - destination.column > 0;
  const toRight = source.column - destination.column < 0;
  const sameColumn = source.column - destination.column === 0;

  if (toUp && toLeft) {
    return [Direction.UP, Direction.LEFT, Direction.DOWN, Direction.RIGHT];
  }

  if (toUp && toRight) {
    return [Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT];
  }

  if (toDown && toLeft) {
    return [Direction.DOWN, Direction.LEFT, Direction.UP, Direction.RIGHT];
  }

  if (toDown && toRight) {
    return [Direction.DOWN, Direction.RIGHT, Direction.UP, Direction.LEFT];
  }

  if (sameRow && toLeft) {
    return [Direction.LEFT, Direction.UP, Direction.DOWN, Direction.RIGHT];
  }

  if (sameRow && toRight) {
    return [Direction.RIGHT, Direction.UP, Direction.DOWN, Direction.LEFT];
  }

  if (sameColumn && toUp) {
    return [Direction.UP, Direction.LEFT, Direction.RIGHT, Direction.DOWN];
  }

  if (sameColumn && toDown) {
    return [Direction.DOWN, Direction.LEFT, Direction.RIGHT, Direction.UP];
  }

  return [...motionActions.keys()];
};

/**
 * Рассчитать метку квадрата игрового поля при поиске пути.
 * Если квадрат - исходный, то помечаем, как -2,
 * иначе проставляем порядковый номер по текущей длине пути.
 *
 * @param {ICircleMotion} circleMotion Объект с началом и концом пути.
 * @param {IPlayingFieldSquare} currentSquare Координаты квадратика.
 * @param {number} wayLength Текущая длина пути.
 */
const calculateCircleMark = (
  circleMotion: ICircleMotion,
  currentSquare: IPlayingFieldSquare,
  wayLength: number,
): number => (circleMotion.source === currentSquare ? -2 : wayLength);

/**
 * Можно ли переместиться на соседнюю клетку.
 *
 * @param currentSquare Текущая клетка, на которой находится шарик.
 * @param direction Направление для определения номера клетки в плоском массиве.
 * @param wayLength Текущая длина пути шарика.
 */
const canMoveToNeighbor = (
  currentSquare: IPlayingFieldSquare,
  direction: Direction,
  wayLength: number,
): boolean => {
  const fieldCircleActions = motionActions.get(direction);

  if (fieldCircleActions) {
    // Предикаты для определения края игрового поля и вычисления индекса соседней клетки
    const { isEdge, calculateNeighborIndex } = fieldCircleActions;

    // Если крайняя клетка на поле, то двигаться дальше нельзя
    if (isEdge(currentSquare)) {
      return false;
    }

    const neighborIndex = calculateNeighborIndex(currentSquare);
    const squareMark = squaresMarksManager.squaresMarks[neighborIndex];

    /**
     * Если соседняя клетка пустая или эта клетка входит в другой путь (но потенциально более длинный),
     * значит можем двигаться дальше
     */
    return squareMark === 0 || squareMark > wayLength;
  }

  return false;
};

/**
 * Функция нахождения пути (рекурсивная).
 *
 * @param {ICircleMotion} circleMotion Объект с началом и концом пути.
 * @param {IStep} prevWay Предыдущий путь.
 */
const findWay = (circleMotion: ICircleMotion, prevWay: IStep[]): IStep[] => {
  const currentSquare = prevWay.length > 0 ? prevWay[prevWay.length - 1].to : circleMotion.source;

  /**
   * Если достигли пункта назначения
   */
  if (currentSquare === circleMotion.destination) {
    // Квадрат назначения помечается длиной пути
    squaresMarksManager.update(currentSquare.flatIndex, prevWay.length);

    // Запоминаем целевой путь
    return prevWay;
  }

  const directions = getDirections({
    source: currentSquare,
    destination: circleMotion.destination,
  });

  const ways = directions.map((direction) => {
    const fieldCircleActions = motionActions.get(direction);
    // Если можем двигаться на соседнюю клетку в указанном направлении
    const canMove = canMoveToNeighbor(currentSquare, direction, prevWay.length + 1);

    if (fieldCircleActions && canMove) {
      // Помечаем текущую клетку длиной текущего пути
      squaresMarksManager.update(
        currentSquare.flatIndex,
        calculateCircleMark(circleMotion, currentSquare, prevWay.length),
      );

      // Получили следующий шаг
      const step = fieldCircleActions.getStep(currentSquare);
      // Добавили шаг к пути
      const newWay = [...prevWay, step];

      // Ищем путь в направлении шага
      return findWay(circleMotion, newWay);
    }

    return [];
  });

  // Берем только успешные пути)
  const successWays = ways.filter(
    (way) => way.length && way[way.length - 1].to === circleMotion.destination,
  );

  // Возвращаем кратчайший
  return successWays.length > 0
    ? successWays.reduce(
        (shortestWay, way) => (way.length < shortestWay.length ? way : shortestWay),
        successWays[0],
      )
    : [];
};

export const getCirclesSnapshotsList = (
  circleMotion: ICircleMotion,
  fieldCircles: CircleColor[],
): IPlayingFieldSnapshot[] => {
  squaresMarksManager.init(fieldCircles);

  const movingCircleColor = fieldCircles[circleMotion.source.flatIndex];

  const purposeWay = findWay(circleMotion, []);

  return purposeWay.length > 0
    ? purposeWay.reduce((snapshots: IPlayingFieldSnapshot[], step: IStep, index: number) => {
        const prevFieldCircles =
          snapshots.length > 0 ? snapshots[snapshots.length - 1].circles : fieldCircles;

        const currentCirclesList = flow([
          (fieldCircles: CircleColor[]) => fieldCircles.slice(),
          (fieldCirclesCopy: CircleColor[]) =>
            updateArrayItem(fieldCirclesCopy, step.from.flatIndex, CircleColor.white),
          (fieldCirclesCopy: CircleColor[]) =>
            updateArrayItem(fieldCirclesCopy, step.to.flatIndex, movingCircleColor),
        ])(prevFieldCircles);

        /**
         * Формируем новую расстановку
         * Определяем, последний ли это шаг
         * Флаг возможности движения установлен
         */
        return [
          ...snapshots,
          {
            circles: currentCirclesList,
            isLast: index === purposeWay.length - 1,
          },
        ];
      }, [])
    : [];
};
