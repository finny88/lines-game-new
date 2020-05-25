import { ACTION_TYPES_PREFIX } from 'store/common';

/**
 * Генерация новой расстановки игрового поля:
 * 3 новых шарика появляются на игровом поле.
 */
export const GENERATE_NEW_FIELD_CIRCLES = `${ACTION_TYPES_PREFIX}GENERATE_NEW_FIELD_CIRCLES`;
export const NEW_FIELD_CIRCLES_GENERATED = `${ACTION_TYPES_PREFIX}NEW_FIELD_CIRCLES_GENERATED`;
