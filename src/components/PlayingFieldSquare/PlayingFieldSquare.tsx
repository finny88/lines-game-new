import React, { useRef, useEffect, useState, useCallback } from 'react';
import classNames from 'classnames';

import { IPlayingFieldSquare } from 'models';

import {
  PLAYING_FIELD_ROW_SQUARES_NUMBER,
  CIRCLE_BLINK_ANIMATION_DELAY,
} from 'constants/gameCharacteristics';
import { CircleColor } from 'constants/circleColor';

import { Circle } from 'components/Circle';

interface IProps {
  square: IPlayingFieldSquare;
  circleColor: CircleColor;
  isSelected: boolean;
  onSelected: (point: IPlayingFieldSquare) => void;
  onDeselected: () => void;
}

const PlayingFieldSquare: React.FC<IProps> = (props) => {
  const { square, circleColor, isSelected, onSelected, onDeselected } = props;
  const { row, column } = square;

  const intervalId = useRef<number>(0);
  const [circleShown, setCircleShown] = useState<boolean>(false);

  useEffect(() => {
    if (isSelected) {
      intervalId.current = window.setInterval(() => {
        setCircleShown((circleShown) => !circleShown);
      }, CIRCLE_BLINK_ANIMATION_DELAY);
    } else {
      window.clearInterval(intervalId.current);
    }

    return () => {
      if (intervalId.current) {
        window.clearInterval(intervalId.current);
      }
    };
  }, [isSelected]);

  const handleClick = useCallback(() => {
    if (circleColor === CircleColor.white) {
      return;
    }

    if (isSelected) {
      onDeselected();
    } else {
      onSelected(square);
    }
  }, [circleColor, square, isSelected, onSelected, onDeselected]);

  return (
    <div
      className={classNames('lines-playing-field-square', {
        'lines-playing-field-square_last-row': row === PLAYING_FIELD_ROW_SQUARES_NUMBER,
        'lines-playing-field-square_last-column': column === PLAYING_FIELD_ROW_SQUARES_NUMBER,
      })}
      onClick={handleClick}
    >
      <Circle color={isSelected && !circleShown ? CircleColor.white : circleColor} />
    </div>
  );
};

export default React.memo(PlayingFieldSquare);
