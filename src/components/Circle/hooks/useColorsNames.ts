import { CircleColor, CircleColorName } from 'constants/circleColor';
import { usePreviousValue } from 'utils/hooks';

interface IColorsNamesHookReturn {
  prevColorName: CircleColorName;
  colorName: CircleColorName;
}

const useColorsNames = (color: CircleColor): IColorsNamesHookReturn => {
  const prevColor = usePreviousValue(color) || CircleColor.white;

  return {
    prevColorName: CircleColor[prevColor] as CircleColorName,
    colorName: CircleColor[color] as CircleColorName,
  };
};

export default useColorsNames;
