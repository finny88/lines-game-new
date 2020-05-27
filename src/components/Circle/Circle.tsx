import React from 'react';

import { CircleColor } from 'constants/circleColor';

interface IProps {
  color: CircleColor;
}

const Circle: React.FC<IProps> = ({ color }) => (
  <div className={`lines-circle lines-circle_${CircleColor[color].toLocaleLowerCase()}`} />
);

export default Circle;
