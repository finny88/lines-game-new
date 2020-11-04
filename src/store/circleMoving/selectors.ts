import { shallowEqual } from 'react-redux';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import createCachedSelector from 're-reselect';

import { CircleColor } from 'constants/circleColor';
import { fieldCirclesSelector } from 'store/fieldCircles';
import { IAppState } from 'store/common';
import { getCirclesSnapshotsList, ICircleMotion } from 'utils/circleMotion';

export const isCircleMovingSelector = (state: IAppState): boolean => state.isCircleMoving;

const isEqual = <T>(objectA: T, objectB: T): boolean => {
  if (Array.isArray(objectA) && Array.isArray(objectB)) {
    return objectA === objectB;
  }

  return shallowEqual(objectA, objectB);
};

const createShallowEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

// Кэширование непроходимых комбинаций
export const fieldCirclesMovingSnapshotsSelector = createCachedSelector(
  fieldCirclesSelector,
  (_: IAppState, circleMotion: ICircleMotion) => circleMotion,
  // Расчет результата: набора расстановок кружков на игровом поле во время движения кружка
  (fieldCircles: CircleColor[], circleMotion: ICircleMotion) => {
    const snapshots = getCirclesSnapshotsList(circleMotion, fieldCircles);

    // Если движение возможно, сбрасываем кэш
    if (snapshots.length > 0) {
      fieldCirclesMovingSnapshotsSelector.clearCache();
    }

    return snapshots;
  },
)({
  keySelector: (_: IAppState, circleMotion: ICircleMotion) =>
    /** Расчет ключа для кеширования */
    JSON.stringify(circleMotion),
  selectorCreator: createShallowEqualSelector,
});
