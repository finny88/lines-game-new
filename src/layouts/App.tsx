import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hot } from 'react-hot-loader/root';

import { PlayingField } from 'components/PlayingField';
import { NextCircles } from 'components/NextCircles';

import { INIT_LINES } from '../store/common/actionTypes';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: INIT_LINES });
  }, [dispatch]);

  return (
    <div className="lines-app">
      <PlayingField />
      <NextCircles />
    </div>
  );
};

export default hot(App);
