import React from 'react';
import { hot } from 'react-hot-loader/root';

import PlayingField from 'components/PlayingField';

const App: React.FC = () => {
  return (
    <div className="lines-app">
      <PlayingField />
    </div>
  );
};

export default hot(App);
