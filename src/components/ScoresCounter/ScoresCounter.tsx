import React from 'react';
import { useSelector } from 'react-redux';

import { scoresCounterSelector } from 'store/scoresCounter';

const ScoresCounter: React.FC = () => {
  const scoresCounter = useSelector(scoresCounterSelector);

  return (
    <div className="lines-scores-counter">
      Scores:
      <div className="lines-scores-counter__value">{scoresCounter}</div>
    </div>
  );
};

export default ScoresCounter;
