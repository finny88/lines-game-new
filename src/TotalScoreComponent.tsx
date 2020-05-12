import React, { useCallback, useState, FC } from 'react';

export const TotalScoreComponent: FC = () => {
  const [totalScore, setTotalScore] = useState<number>(0);

  const handleClick = useCallback(() => {
    import('./averageService')
      .then((module) => {
        const scores: number[] = [10, 20, 30, 40, 50];
        setTotalScore(module.getTotalScore(scores));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <span className="result-background">Students total score: {totalScore}</span>
      <button type="button" className="ml-2" onClick={handleClick}>
        Calculate
      </button>
    </div>
  );
};
