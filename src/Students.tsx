import React, { useState, useCallback, createElement } from 'react';
import { hot } from 'react-hot-loader/root';
import { Counter } from './Counter';

$('body').css('background-color', 'lightSkyBlue');

const App: React.FunctionComponent = () => {
  const [averageElement, setAverageElement] = useState(null);
  const [totalElement, setTotalElement] = useState(null);

  const handleShowAverage = useCallback(() => {
    import('./AverageComponent')
      .then((module) => {
        console.log(module.AverageComponent);
        setAverageElement(createElement(module.AverageComponent));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleShowTotal = useCallback(() => {
    import('./TotalScoreComponent')
      .then((module) => {
        console.log(module.TotalScoreComponent);
        setTotalElement(createElement(module.TotalScoreComponent));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Hello from React DOM</h1>
      {!!averageElement && averageElement}
      {!averageElement && (
        <button type="button" onClick={handleShowAverage}>
          Add Average Component
        </button>
      )}

      {!totalElement && (
        <button type="button" onClick={handleShowTotal}>
          Show Total Component
        </button>
      )}
      {!!totalElement && totalElement}

      <Counter />
    </div>
  );
};

export default hot(App);
