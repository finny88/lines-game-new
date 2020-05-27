import React from 'react';
import classNames from 'classnames';

import { IPlayingFieldSquare } from './types';

import { PLAYING_FIELD_ROW_SQUARES_NUMBER } from 'constants/gameCharacteristics';
import { CircleColor } from 'constants/circleColor';

import { Circle } from 'components/Circle';

interface IProps {
  square: IPlayingFieldSquare;
  circleColor: CircleColor;
}

const PlayingFieldSquare: React.FC<IProps> = (props) => {
  const { square, circleColor } = props;
  const { row, column } = square;

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
