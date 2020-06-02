import { IPlayingFieldSquare } from 'components/PlayingFieldSquare';

import { PLAYING_FIELD_ROW_SQUARES_NUMBER } from 'constants/gameCharacteristics';

const decade = [...Array(PLAYING_FIELD_ROW_SQUARES_NUMBER).keys()];

export const squaresDecades: ReadonlyArray<readonly IPlayingFieldSquare[]> = decade.map(
  (i: number) =>
    decade.map((j: number) => ({
      row: i,
      column: j,
      flatIndex: i * PLAYING_FIELD_ROW_SQUARES_NUMBER + j,
    })),
);
