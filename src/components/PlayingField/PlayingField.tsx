import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { IPlayingFieldSquare } from 'components/PlayingFieldSquare';

import { fieldCirclesSelector } from 'store/fieldCircles/selectors';
import { squaresDecades, initialSquare } from './utils';

import { PlayingFieldSquare } from 'components/PlayingFieldSquare';

const PlayingField: React.FC = () => {
  const fieldCirclesColors = useSelector(fieldCirclesSelector);

  const [selected, setSelected] = useState<IPlayingFieldSquare>(initialSquare);

  const handleCircleDeselected = useCallback(() => {
    setSelected(initialSquare);
  }, []);

  return (
    <div className="lines-playing-field">
      {squaresDecades.map((decade, index) => (
        <div className="lines-playing-field__row" key={`lines-row-${index}`}>
          {decade.map((square) => (
            <PlayingFieldSquare
              key={`lines-square-${square.flatIndex}`}
              square={square}
              circleColor={fieldCirclesColors[square.flatIndex]}
              // squaresDecades contains immutable array of references
              // so it's possible to use shallow comparison
              isSelected={square === selected}
              onSelected={setSelected}
              onDeselected={handleCircleDeselected}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PlayingField;
