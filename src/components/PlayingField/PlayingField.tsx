import React, { useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { IPlayingFieldSquare } from 'models';
import { ICircleMotion } from 'utils/circleMotion';

import { fieldCirclesSelector, isCircleMovingSelector } from 'store/fieldCircles/selectors';
import { MOVE_CIRCLE } from 'store/fieldCircles';
import { squaresDecades } from 'utils/squaresDecades';

import { PlayingFieldSquare } from 'components/PlayingFieldSquare';

const initialSquare: IPlayingFieldSquare = { row: -1, column: -1, flatIndex: -1 };

const PlayingField: React.FC = () => {
  const circleMotionRef = useRef<ICircleMotion | null>(null);

  const fieldCirclesColors = useSelector(fieldCirclesSelector);
  const isCircleMoving = useSelector(isCircleMovingSelector);

  const [selected, setSelected] = useState<IPlayingFieldSquare>(initialSquare);

  const dispatch = useDispatch();

  const handleCircleDeselected = useCallback(() => {
    setSelected(initialSquare);
  }, [setSelected]);

  const handleEmptyClicked = useCallback(
    (square: IPlayingFieldSquare) => {
      circleMotionRef.current = {
        source: selected,
        destination: square,
      };

      setSelected(initialSquare);

      if (circleMotionRef.current) {
        dispatch({ type: MOVE_CIRCLE, payload: circleMotionRef.current });
      }
    },
    [dispatch, selected], // fieldCirclesColors
  );

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
              canBeClicked={!isCircleMoving}
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
