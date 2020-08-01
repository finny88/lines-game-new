import { handleActions } from 'redux-actions';

import { IPlayingFieldSquare } from 'models/playingFieldSquare';

import { initialLinesState, commonReducer } from 'store/common';
import { SET_INACCESSIBLE_DESTINATION, RESET_INACCESSIBLE_DESTINATION } from './actionTypes';

const inaccessibleDestination = handleActions<IPlayingFieldSquare>(
  {
    [SET_INACCESSIBLE_DESTINATION]: commonReducer,
    [RESET_INACCESSIBLE_DESTINATION]: () => initialLinesState['inaccessibleDestination'],
  },
  initialLinesState['inaccessibleDestination'],
);

export default inaccessibleDestination;
