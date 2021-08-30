import { combineEpics } from 'redux-observable';
import { generateNextCirclesEpic } from './newCircles';

export const rootEpic = combineEpics(generateNextCirclesEpic);
