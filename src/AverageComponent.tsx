import React, { useCallback, useState, FC } from 'react';

export const AverageComponent: FC = () => {
  const [average, setAverage] = useState<number>(0);

  const handleClick = useCallback(() => {
    import('./averageService')
      .then((module) => {
        const scores: number[] = [90, 75, 60, 99, 94, 30, 87, 92, 100];
        setAverage(module.getAvg(scores));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <span>Students average: {average}</span>

      <button type="button" className="ml-2" onClick={handleClick}>
        Calculate
      </button>
    </div>
  );
};
