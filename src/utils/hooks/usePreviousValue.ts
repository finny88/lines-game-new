import { useRef, useEffect } from 'react';

const usePreviousValue = <V>(value: V): V | undefined => {
  const prevValue = useRef<V>();

  useEffect(() => {
    prevValue.current = value;
  });

  return prevValue.current;
};

export default usePreviousValue;
