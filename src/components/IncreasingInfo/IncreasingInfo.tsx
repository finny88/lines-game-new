import React from 'react';

import { IIncreasingInfo } from 'models';
import { CircleColor } from 'constants/circleColor';

const IncreasingInfo: React.FC<IIncreasingInfo> = (props) => {
  const { lineType, color, scoresIncrease, lineLength } = props;

  return color ? (
    <div
      className={`lines-increasing-info_${lineType}_${CircleColor[color]}_${lineLength}`}
    >{`+${scoresIncrease}`}</div>
  ) : null;
};

export default IncreasingInfo;
