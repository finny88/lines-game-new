import { IAppState } from 'store/common';
import { IIncreasingInfo } from '../../models/increasingInfo';

export const increasingInfoSelector = (state: IAppState): IIncreasingInfo => state.increasingInfo;
