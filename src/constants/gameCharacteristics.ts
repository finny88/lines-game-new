import { CircleColor } from './circleColor';

/** Количество квадратов на игровом поле */
export const PLAYING_FIELD_SQUARES_NUMBER = 100;

/** Ширина и высота и грового поля */
export const PLAYING_FIELD_ROW_SQUARES_NUMBER = 10;

/** Количество шаров, появляющихся на определенном ходу */
export const NEXT_CIRCLES_NUMBER = 3;

/** Количество цветов для раскраски кружков */
export const CIRCLE_COLORS_NUMBER: number = Object.keys(CircleColor).length / 2 - 1;
