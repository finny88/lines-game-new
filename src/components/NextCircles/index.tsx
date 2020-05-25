import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { NEXT_CIRCLES_NUMBER } from 'constants/gameCharacteristics';
import { nextCirclesSelector } from 'store/newCircles';

import Circle from 'components/Circle';

const trinity = [...Array(NEXT_CIRCLES_NUMBER).keys()];

const NextCircles: React.FC = () => {
  const circlesColors = useSelector(nextCirclesSelector);

  return (
    <div className="lines-next-circles">
      {trinity.map((i: number) => (
        <div
          key={`next-circle-${i}`}
          className={classNames('lines-next-circle', {
            'lines-next-circle_last': i === NEXT_CIRCLES_NUMBER - 1,
          })}
        >
          <Circle color={circlesColors[i]} />
        </div>
      ))}
    </div>
  );
};

export default NextCircles;
