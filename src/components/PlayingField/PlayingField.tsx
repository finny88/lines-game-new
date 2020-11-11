import React, { useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { IPlayingFieldSquare } from 'models';
import { ICircleMotion } from 'utils/circleMotion';

import { initialSquare } from 'constants/initial';
import { allSquaresOccupiedSelector, fieldCirclesSelector } from 'store/fieldCircles';
import { isCircleMovingSelector, MOVE_CIRCLE } from 'store/circleMoving';
import { inaccessibleDestinationSelector } from 'store/inaccessibleDestination';
import { increasingInfoSelector } from 'store/increasingInfo';
import { squaresDecades } from 'utils/squaresDecades';

import { PlayingFieldSquare } from 'components/PlayingFieldSquare';
import { GameOverModal } from 'components/GameOverModal';

const GAME_OVER_MODAL_ROOT_ID = 'GAME_OVER_MODAL_ROOT_ID';

const PlayingField: React.FC = () => {
  const circleMotionRef = useRef<ICircleMotion | null>(null);

  const fieldCirclesColors = useSelector(fieldCirclesSelector);
  const isCircleMoving = useSelector(isCircleMovingSelector);
  const inaccessibleDestination = useSelector(inaccessibleDestinationSelector);
  const increasingInfo = useSelector(increasingInfoSelector);
  const allSquaresOccupied = useSelector(allSquaresOccupiedSelector);

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
    [dispatch, selected],
  );

  return (
    <div className="lines-playing-field" id={GAME_OVER_MODAL_ROOT_ID}>
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
              isInaccessible={inaccessibleDestination === square}
              increasingInfo={
                increasingInfo.startSquare === square.flatIndex ? increasingInfo : undefined
              }
              onDeselected={handleCircleDeselected}
              onEmptyClicked={handleEmptyClicked}
            />
          ))}
        </div>
      ))}
      {allSquaresOccupied && <GameOverModal targetId={GAME_OVER_MODAL_ROOT_ID} />}
    </div>
  );
};

export default PlayingField;
