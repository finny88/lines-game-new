import React from 'react';
import { hot } from 'react-hot-loader/root';

import PlayingField from 'components/PlayingField';
import NextCircles from 'components/NextCircles';

const App: React.FC = () => {
  return (
    <div className="lines-app">
      <PlayingField />
      <NextCircles />
    </div>
  );
};

export default hot(App);
