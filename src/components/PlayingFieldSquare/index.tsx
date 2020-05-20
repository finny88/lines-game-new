import React from 'react';
import classNames from 'classnames';

import { PLAYING_FIELD_ROW_SQUARES_NUMBER } from 'constants/gameCharacteristics';

interface IProps {
  row: number;
  column: number;
}

const PlayingFieldSquare: React.FC<IProps> = ({ row, column }) => {
  return (
    <div
      className={classNames('lines-playing-field-square', {
        'lines-playing-field-square_last-row': row === PLAYING_FIELD_ROW_SQUARES_NUMBER,
        'lines-playing-field-square_last-column': column === PLAYING_FIELD_ROW_SQUARES_NUMBER,
      })}
    />
  );
};

export default PlayingFieldSquare;
