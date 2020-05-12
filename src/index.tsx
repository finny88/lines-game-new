import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { LinesGame } from './layouts';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <LinesGame />
  </Provider>,
  document.getElementById('root'),
);
