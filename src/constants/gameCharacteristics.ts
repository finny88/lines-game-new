import { CircleColor } from './circleColor';

/** Количество квадратов на игровом поле */
export const PLAYING_FIELD_SQUARES_NUMBER = 100;

/** Ширина и высота и грового поля */
export const PLAYING_FIELD_ROW_SQUARES_NUMBER = 10;

/** Количество шаров, появляющихся на определенном ходу */
export const NEXT_CIRCLES_NUMBER = 3;

/** Количество цветов для раскраски кружков */
export const CIRCLE_COLORS_NUMBER: number = Object.keys(CircleColor).length / 2 - 1;

/** Задержка анимации при моргании шарика прир его выделении в мс */
export const CIRCLE_BLINK_ANIMATION_DELAY = 500;

/** Минимальная длина линии из кружков одинакового цвета */
export const MIN_LINE_LENGTH = 5;

/** Количество очков за один кружок в горизонтальной линии */
export const DOUBLE_CIRCLE_POINT_WEIGHT = 2;

/** Количество очков за один кружок в диагоальной линии */
export const TRIPLE_CIRCLE_POINT_WEIGHT = 3;
