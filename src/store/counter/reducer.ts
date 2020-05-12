import { ICounterAction } from './actions';
import { CounterActionsKinds } from './actionsTypes';

export interface ICounterState {
  count: number;
  calculating: boolean;
}

const defaultCounterState: ICounterState = {
  count: 0,
  calculating: false,
};

export const counterReducer = (
  state: ICounterState = defaultCounterState,
  action: ICounterAction,
): ICounterState => {
  switch (action.type) {
    case CounterActionsKinds.INCREASE:
      return {
        ...state,
        count: state.count + action.payload,
      };
    case CounterActionsKinds.DECREASE:
      return {
        ...state,
        count: state.count - action.payload,
      };
    case CounterActionsKinds.RESET:
      return defaultCounterState;
    case CounterActionsKinds.INCREASE_START:
      return {
        ...state,
        calculating: true,
      };
    case CounterActionsKinds.INCREASE_FINISH:
      return {
        count: state.count + action.payload,
        calculating: false,
      };
  }

  return state;
};
