import { delay, put, takeEvery } from 'redux-saga/effects';
import { ICounterAction } from './actions';
import { CounterActionsKinds } from './actionsTypes';

export function* increaseAsync(action: ICounterAction): Generator {
  delay(1000);

  yield put({ type: CounterActionsKinds.INCREASE_FINISH, payload: action.payload });
}

export function* watchIncrementAsync(): Generator {
  yield takeEvery(CounterActionsKinds.INCREASE_START, increaseAsync);
}
