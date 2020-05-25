import React from 'react';
import classNames from 'classnames';

import { PLAYING_FIELD_ROW_SQUARES_NUMBER } from 'constants/gameCharacteristics';
import { CircleColor } from 'constants/circleColor';

import Circle from 'components/Circle';

interface IProps {
  row: number;
  column: number;
  circleColor: CircleColor;
}

const PlayingFieldSquare: React.FC<IProps> = ({ row, column, circleColor }) => {
  return (
    <div
      className={classNames('lines-playing-field-square', {
        'lines-playing-field-square_last-row': row === PLAYING_FIELD_ROW_SQUARES_NUMBER,
        'lines-playing-field-square_last-column': column === PLAYING_FIELD_ROW_SQUARES_NUMBER,
      })}
    >
      <Circle color={circleColor} />
    </div>
  );
};

export default PlayingFieldSquare;
