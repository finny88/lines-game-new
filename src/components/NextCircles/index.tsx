import React from 'react';
import classNames from 'classnames';

import { NEXT_CIRCLES_NUMBER } from 'constants/gameCharacteristics';

const NextCircles: React.FC = () => {
  const trinity = [...Array(NEXT_CIRCLES_NUMBER).keys()];

  return (
    <div className="next-circles">
      {trinity.map((i: number) => (
        <div
          key={`next-circle-${i}`}
          className={classNames('next-circle', {
            'next-circle_last': i === NEXT_CIRCLES_NUMBER - 1,
          })}
        />
      ))}
    </div>
  );
};

export default NextCircles;
