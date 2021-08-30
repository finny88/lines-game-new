import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { mergeMap, withLatestFrom } from 'rxjs/operators';

import { getCircle } from 'utils/nextCircles';
import { nextCirclesNumberSelector } from '../fieldCircles';

import { GENERATE_NEXT_CIRCLES, NEXT_CIRCLES_GENERATED } from './actionTypes';

import type { Epic } from 'redux-observable';
import type { IAction, IAppState, IPayloadAction } from '../common';

export const generateNextCirclesEpic: Epic<
  IAction,
  IPayloadAction<IAppState['nextCircles']>,
  IAppState
> = (action$, state$) =>
  action$.pipe(
    ofType(GENERATE_NEXT_CIRCLES),
    withLatestFrom(of(nextCirclesNumberSelector(state$.value))),
    mergeMap(([, nextCirclesNumber]) =>
      of({
        type: NEXT_CIRCLES_GENERATED,
        payload: [...Array(nextCirclesNumber).fill(null).map(getCircle)],
      }),
    ),
  );
