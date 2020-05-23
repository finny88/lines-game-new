import { AllowedPayloadType, IAction } from './types';

/**
 * Обёртка для редьюсеров.
 *
 * @param state текущее состояние ветки redux-store.
 * @param logic Новое состояние ветки redux-store.
 * @param action Redux-action.
 */
export const HighOrderedReducer = <T extends AllowedPayloadType>(
  state: T,
  logic: Record<string, T>,
  action: IAction,
): T => {
  return logic[action.type] === undefined ? state : logic[action.type];
};
