import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { IPlayingFieldSquare } from 'models';

import { fieldCirclesSelector } from 'store/fieldCircles/selectors';
import { squaresDecades } from 'utils/squaresDecades';

import { PlayingFieldSquare } from 'components/PlayingFieldSquare';

const initialSquare: IPlayingFieldSquare = { row: -1, column: -1, flatIndex: -1 };

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
