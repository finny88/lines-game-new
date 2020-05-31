import { CircleColor } from 'constants/circleColor';
import { PLAYING_FIELD_SQUARES_NUMBER } from 'constants/gameCharacteristics';

interface IGetFieldCirclesParams {
  nextCircles: CircleColor[];
  fieldCircles: CircleColor[];
  nextCirclesNumber: number;
}

export const getFieldCircles = ({
  nextCircles,
  fieldCircles,
  nextCirclesNumber,
}: IGetFieldCirclesParams): CircleColor[] => {
  const newFieldCircles: CircleColor[] = fieldCircles.slice();

  for (let i = 0; i < nextCirclesNumber; i++) {
    let isEmptyField = true;

    /**
     * Определяем рандомный номер от 0 до 99 (размер игрового поля).
     * Если квадрат с таким индексом пустой, то добавляем туда кружок цвета из набора
     * следующих кружков (точнее цветов следующих кружков).
     */
    while (isEmptyField) {
      const fieldNumber: number = Math.floor(Math.random() * PLAYING_FIELD_SQUARES_NUMBER);

      if (newFieldCircles[fieldNumber] === CircleColor.white) {
        newFieldCircles[fieldNumber] = nextCircles[i];
        isEmptyField = false;
      }
    }
  }

  return newFieldCircles;
};
