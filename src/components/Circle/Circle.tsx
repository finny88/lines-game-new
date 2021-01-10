import React from 'react';
import classNames from 'classnames';

import { CircleColor } from 'constants/circleColor';
import { useColorsNames } from './hooks';

interface IProps {
  color: CircleColor;
}

const Circle: React.FC<IProps> = ({ color }) => {
  const { prevColorName, colorName } = useColorsNames(color);

  return (
    <div
      className={classNames('lines-circle', {
        [`lines-circle_${prevColorName}-to-${colorName}`]: prevColorName !== colorName,
        [`lines-circle_${prevColorName}`]: prevColorName === colorName,
      })}
    />
  );
};

export default React.memo(Circle);
