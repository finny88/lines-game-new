export const updateArrayItem = <T>(sourceArray: T[], indexOldElement: number, itemToAdd: T): T[] =>
  Object.assign([...sourceArray], { [indexOldElement]: itemToAdd });
