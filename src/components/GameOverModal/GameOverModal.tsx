import React from 'react';
import { Button } from 'reactstrap';

import { IModalProps } from 'components/Modal/Modal';

import { Modal } from 'components/Modal';

type IProps = Pick<IModalProps, 'targetId'>;

const GameOverMountRoot: React.FC<IProps> = ({ targetId }) => (
  <Modal targetId={targetId} classNames="lines-game-over-modal">
    <h1>Game over!</h1>
    <Button outline color="primary" size="lg">
      Restart
    </Button>
  </Modal>
);

export default GameOverMountRoot;
