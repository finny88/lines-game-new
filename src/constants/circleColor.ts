/**
 * Перечисление возможных цветов шаров.
 */
export enum CircleColor {
  white = 0,
  red,
  green,
  blue,
  cyan,
  gold,
  purple,
}

export type CircleColorName = keyof typeof CircleColor;
