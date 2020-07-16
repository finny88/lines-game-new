import { IAppState } from 'store/common';

export const scoresCounterSelector = (state: IAppState): number => state.scoresCounter;
