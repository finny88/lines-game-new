import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { Button } from 'reactstrap';

import { PlayingField } from 'components/PlayingField';
import { NextCircles } from 'components/NextCircles';
import { ScoresCounter } from 'components/ScoresCounter';
import { MenuModal } from 'components/MenuModal';

import { INIT_LINES } from 'store/common/actionTypes';

const SETTINGS_MODAL_ROOT_ID = 'SETTINGS_MODAL_ROOT_ID';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    dispatch({ type: INIT_LINES });
  }, [dispatch]);

  const handleSettingClick = useCallback(() => setShowSettings(true), []);
  const handleSettingsClose = useCallback(() => setShowSettings(false), []);

  return (
    <>
      <div className="lines-app">
        <div className="lines-app__content d-flex" id={SETTINGS_MODAL_ROOT_ID}>
          <PlayingField />
          <div className="lines-app__info">
            <ScoresCounter />
            <NextCircles />
            <Button color="primary" className="lines-menu-button" onClick={handleSettingClick}>
              Settings
            </Button>
          </div>
        </div>
      </div>
      {showSettings && (
        <MenuModal targetId={SETTINGS_MODAL_ROOT_ID} onClose={handleSettingsClose} />
      )}
    </>
  );
};

export default hot(App);
