import { IAppState } from 'store/common';
import { IPlayingFieldSquare } from 'models/playingFieldSquare';

export const inaccessibleDestinationSelector = (state: IAppState): IPlayingFieldSquare =>
  state.inaccessibleDestination;
