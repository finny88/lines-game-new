import React, { useCallback } from 'react';
import { useDispatch, batch } from 'react-redux';
import { Button } from 'reactstrap';

import { IModalProps } from 'components/Modal/Modal';

import { INIT_LINES, RESET_REDUX_STATE } from 'store/common';

import { Modal } from 'components/Modal';

type IProps = Pick<IModalProps, 'targetId'>;

const GameOverMountRoot: React.FC<IProps> = ({ targetId }) => {
  const dispatch = useDispatch();

  const onRestartClick = useCallback(() => {
    batch(() => {
      dispatch({ type: RESET_REDUX_STATE });
      dispatch({ type: INIT_LINES });
    });
  }, [dispatch]);

  return (
    <Modal targetId={targetId} classNames="lines-game-over-modal">
      <h1>Game over!</h1>
      <Button outline color="primary" size="lg" onClick={onRestartClick}>
        Restart
      </Button>
    </Modal>
  );
};

export default GameOverMountRoot;
