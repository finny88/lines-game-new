import React, { useRef, useEffect, useState, useCallback } from 'react';
import classNames from 'classnames';

import { IIncreasingInfo, IPlayingFieldSquare } from 'models';

import {
  PLAYING_FIELD_ROW_SQUARES_NUMBER,
  CIRCLE_BLINK_ANIMATION_DELAY,
} from 'constants/gameCharacteristics';
import { CircleColor } from 'constants/circleColor';

import { Circle } from 'components/Circle';
import IncreasingInfo from 'components/IncreasingInfo/IncreasingInfo';

interface IProps {
  square: IPlayingFieldSquare;
  circleColor: CircleColor;
  isSelected: boolean;
  canBeClicked: boolean;
  isInaccessible: boolean;
  increasingInfo?: IIncreasingInfo;
  onSelected: (square: IPlayingFieldSquare) => void;
  onDeselected: () => void;
  onEmptyClicked: (square: IPlayingFieldSquare) => void;
}

const PlayingFieldSquare: React.FC<IProps> = (props) => {
  const {
    square,
    circleColor,
    isSelected,
    canBeClicked,
    isInaccessible,
    increasingInfo,
    onSelected,
    onDeselected,
    onEmptyClicked,
  } = props;
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
    if (!canBeClicked) {
      return;
    }

    if (circleColor === CircleColor.white) {
      onEmptyClicked(square);
      return;
    }

    if (isSelected) {
      onDeselected();
    } else {
      onSelected(square);
    }
  }, [canBeClicked, circleColor, square, isSelected, onSelected, onDeselected, onEmptyClicked]);

  return (
    <div
      className={classNames('lines-playing-field-square', {
        'lines-playing-field-square_last-row': row === PLAYING_FIELD_ROW_SQUARES_NUMBER,
        'lines-playing-field-square_last-column': column === PLAYING_FIELD_ROW_SQUARES_NUMBER,
        'lines-playing-field-square_inaccessible': isInaccessible,
      })}
      onClick={handleClick}
      data-inaccessible-message={`No way\nhere!`}
      data-increasing-info={increasingInfo && `+${increasingInfo.scoresIncrease}`}
    >
      {increasingInfo && <IncreasingInfo {...increasingInfo} />}
      <Circle color={isSelected && !circleShown ? CircleColor.white : circleColor} />
    </div>
  );
};

export default React.memo(PlayingFieldSquare);
