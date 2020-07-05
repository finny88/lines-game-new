import { AllowedPayloadType, IPayloadAction } from './types';

export const commonReducer = <T extends AllowedPayloadType>(
  _: T,
  { payload }: IPayloadAction<T>,
): T => payload;
