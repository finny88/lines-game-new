import React from 'react';
import { useSelector } from 'react-redux';

import { fieldCirclesSelector } from 'store/fieldCircles/selectors';
import { squaresDecades } from './utils';

import { PlayingFieldSquare } from 'components/PlayingFieldSquare';

const PlayingField: React.FC = () => {
  const fieldCirclesColors = useSelector(fieldCirclesSelector);

  return (
    <div className="lines-playing-field">
      {squaresDecades.map((decade, index) => (
        <div className="lines-playing-field__row" key={`lines-row-${index}`}>
          {decade.map((square) => (
            <PlayingFieldSquare
              key={`lines-square-${square.flatIndex}`}
              square={square}
              circleColor={fieldCirclesColors[square.flatIndex]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PlayingField;
