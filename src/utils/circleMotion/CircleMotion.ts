import { ICircleMotion, IStep, ICirclesMotionSnapshot } from './types';
import { IPlayingFieldSquare } from 'models/playingFieldSquare';

import { CircleColor } from 'constants/circleColor';
import { Direction } from 'constants/direction';
import { motionActions } from './motionActions';

export class CircleMotion {
  // Объект передвижения (источник - назначение)
  private circleMotion: ICircleMotion;
  /* Метки квадратов игрового поля:
      -2 - исходный квадрат
      -1 - занятый кружком квадрат
      0 - свободный ещё непройденный квадрат
      > 0 - пройденный квадрат, помеченный шагом пути
  */
  private squaresMarks: number[] = [];
  // Длина целевого (кратчайшего) пути
  private purposeWayLength: number = 0;
  // Целевой путь (набор шагов)
  private purposeWay?: IStep[] = undefined;
  // Цвет передвигаемого кружка
  private movingCircleColor: CircleColor;
  // Текущая расстановка игрового поля на очередной шаге движения шарика
  private currentCirclesList: CircleColor[];

  public constructor(circleMotion: ICircleMotion, fieldCircles: CircleColor[]) {
    this.circleMotion = circleMotion;

    // 0 - пустая клетка, -1 - клетка с кружком
    this.squaresMarks = fieldCircles.map((s) => (s === CircleColor.white ? 0 : -1));

    // Получаем индекс в массиве из координат i,j и определяем цвет передвигаемого шарика
    this.movingCircleColor = fieldCircles[circleMotion.source.flatIndex];
    // Инициализируем текущую расстановку
    this.currentCirclesList = fieldCircles;
  }

  /**
   * Получить набор расстановок (кадров) для движения.
   */
  public GetCirclesSnapshotsList(): ICirclesMotionSnapshot[] {
    // Инициализация набора расстановок, вначале берётся текущая
    let snapshots = [
      {
        circles: this.currentCirclesList,
        isLast: true,
        motionIsPossible: false,
      },
    ];

    // Поиск пути делается только раз
    if (!this.purposeWay) {
      this.purposeWay = [];
      this.FindWay(this.circleMotion.source, []);
    }

    // Если путь найден
    if (this.purposeWay.length > 0) {
      // Чистим предыдущий набор снэпшотов
      snapshots = [];

      // Далее формируем новый набор расстановок
      this.purposeWay.forEach((step: IStep, index: number) => {
        // Текущий квадрат передвигаемого шарика делаем пустым
        this.currentCirclesList[step.from.flatIndex] = CircleColor.white;

        // В следующем квадратике маршрута появится передвигаемый шарик
        this.currentCirclesList[step.to.flatIndex] = this.movingCircleColor;

        /**
         * Формируем новую расстановку
         * Определяем, последний ли это шаг
         * Флаг возможности движения установлен
         */
        const snapshot = {
          circles: this.currentCirclesList,
          isLast: index === (this.purposeWay?.length || 0) - 1,
          motionIsPossible: true,
        };

        // Добавляем новую расстановку в набор
        snapshots.push(snapshot);
      });
    }

    return snapshots;
  }

  /**
   * Рассчитать метку квадрата игрового поля при поиске пути.
   * Если квадрат - исходный, то помечаем, как -2,
   * иначе проставляем порядковый номер по текущей длине пути.
   *
   * @param {IPlayingFieldSquare} currentPoint Координаты квадратика.
   * @param {number} wayLength Текущая длина пути.
   */
  private CalculateCircleMark = (currentSquare: IPlayingFieldSquare, wayLength: number): number => {
    return this.circleMotion.source === currentSquare ? -2 : wayLength;
  };

  /**
   * Функция нахождения пути (рекурсивная).
   *
   * @param currentSquare Текущее местоположение кружка.
   * @param prevWay Предыдущий путь.
   */
  private FindWay(currentSquare: IPlayingFieldSquare, prevWay: IStep[]): void {
    /**
     * Если достигли пункта назначения И
     * если новый найденный путь короче, чем уже найденный, или если ещё нет найденного пути
     */
    if (
      currentSquare === this.circleMotion.destination &&
      (prevWay.length < this.purposeWayLength || this.purposeWayLength === 0)
    ) {
      // Запоминаем длину кратчайшего пути
      this.purposeWayLength = prevWay.length;
      // Целевой квадрат помечается длиной целевого пути
      this.squaresMarks[currentSquare.flatIndex] = this.purposeWayLength;
      // Запоминаем целевой путь
      this.purposeWay = prevWay;
    }

    // Исследуем пути по всем направлениям
    motionActions.forEach((fieldCircleAction, direction) => {
      // Если можем двигаться на соседнюю клетку в указанном направлении
      if (this.CanMoveToNeighbor(currentSquare, direction, prevWay.length + 1)) {
        // Помечаем текущую клетку длиной текущего пути
        this.squaresMarks[currentSquare.flatIndex] = this.CalculateCircleMark(
          currentSquare,
          prevWay.length,
        );

        // Получили следующий шаг
        const step: IStep = fieldCircleAction.getStep(currentSquare);
        // Добавили шаг к пути
        const way: IStep[] = [...prevWay, step];

        // Ищем путь в направлении шага
        this.FindWay(step.to, way);
      }
    });
  }

  /**
   * Можно ли переместиться на соседнюю клетку.
   *
   * @param point Текущая клетка, на которой находится шарик.
   * @param direction Направление для определения номера клетки в плоском массиве.
   * @param wayLength Текущая длина пути шарика.
   */
  private CanMoveToNeighbor(
    point: IPlayingFieldSquare,
    direction: Direction,
    wayLength: number,
  ): boolean {
    // Предикаты для определения края игрового поля и вычисления индекса соседней клетки
    const { boundPredicate, calculateNeighborIndex } = motionActions.get(direction);
    const isBound: boolean = boundPredicate(point);
    const neighborIndex: number = calculateNeighborIndex(point);

    // Если крайняя клетка на поле, то двигаться дальше нельзя
    if (isBound) {
      return false;
    }

    /**
     * Если соседняя клетка пустая или эта клетка входит в другой путь (но потенциально более длинный),
     * значит можем двигаться дальше
     */
    return this.squaresMarks[neighborIndex] === 0 || this.squaresMarks[neighborIndex] > wayLength;
  }
}
