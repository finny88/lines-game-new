import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hot } from 'react-hot-loader/root';

import { PlayingField } from 'components/PlayingField';
import { NextCircles } from 'components/NextCircles';
import { ScoresCounter } from 'components/ScoresCounter';

import { INIT_LINES } from 'store/common/actionTypes';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: INIT_LINES });
  }, [dispatch]);

  return (
    <div className="lines-app">
      <div className="lines-app__content d-flex">
        <PlayingField />
        <div className="lines-app__info">
          <ScoresCounter />
          <NextCircles />
        </div>
      </div>
    </div>
  );
};

export default hot(App);
