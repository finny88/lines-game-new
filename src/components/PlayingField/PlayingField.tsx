import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { IPlayingFieldSquare } from 'models';

import { fieldCirclesSelector } from 'store/fieldCircles/selectors';
import { INIT_NEXT_POSITION } from 'store/common/actionTypes';
import { squaresDecades } from 'utils/squaresDecades';

import { PlayingFieldSquare } from 'components/PlayingFieldSquare';

const initialSquare: IPlayingFieldSquare = { row: -1, column: -1, flatIndex: -1 };

const PlayingField: React.FC = () => {
  const emptySquareClicked = useRef<IPlayingFieldSquare | null>(null);

  const fieldCirclesColors = useSelector(fieldCirclesSelector);

  const [selected, setSelected] = useState<IPlayingFieldSquare>(initialSquare);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selected === initialSquare) {
      dispatch({ type: INIT_NEXT_POSITION });
    }
  }, [dispatch, selected]);

  const handleCircleDeselected = useCallback(() => {
    setSelected(initialSquare);
  }, [setSelected]);

  const handleEmptyClicked = useCallback((square: IPlayingFieldSquare) => {
    emptySquareClicked.current = square;
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
              onEmptyClicked={handleEmptyClicked}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PlayingField;
