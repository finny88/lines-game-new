import React from 'react';
import { useSelector } from 'react-redux';

import PlayingFieldSquare from 'components/PlayingFieldSquare';

import { PLAYING_FIELD_ROW_SQUARES_NUMBER } from 'constants/gameCharacteristics';
import { fieldCirclesSelector } from 'store/fieldCircles/selectors';

const decade = [...Array(PLAYING_FIELD_ROW_SQUARES_NUMBER).keys()];

const PlayingField: React.FC = () => {
  const fieldCirclesColors = useSelector(fieldCirclesSelector);

  return (
    <div className="lines-playing-field">
      {decade.map((i: number) => (
        <div className="lines-playing-field__row" key={`lines-row-${i}`}>
          {decade.map((j: number) => (
            <PlayingFieldSquare
              key={`lines-square-${i * PLAYING_FIELD_ROW_SQUARES_NUMBER + j}`}
              row={i + 1}
              column={j + 1}
              circleColor={fieldCirclesColors[i * PLAYING_FIELD_ROW_SQUARES_NUMBER + j]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PlayingField;
