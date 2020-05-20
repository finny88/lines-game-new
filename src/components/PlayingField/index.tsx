import React from 'react';

import PlayingFieldSquare from 'components/PlayingFieldSquare';

import { PLAYING_FIELD_ROW_SQUARES_NUMBER } from 'constants/gameCharacteristics';

const PlayingField: React.FC = () => {
  const decade = [...Array(PLAYING_FIELD_ROW_SQUARES_NUMBER).keys()];

  return (
    <div className="lines-playing-field">
      {decade.map((i: number) => (
        <div className="lines-playing-field__row" key={`lines-row-${i + 1}`}>
          {decade.map((j: number) => (
            <PlayingFieldSquare
              key={`lines-square-${i * PLAYING_FIELD_ROW_SQUARES_NUMBER + j + 1}`}
              row={i + 1}
              column={j + 1}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PlayingField;
