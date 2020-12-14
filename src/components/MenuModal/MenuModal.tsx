import React from 'react';
import { Button } from 'reactstrap';

import { Modal } from 'components/Modal';

import { IModalProps } from 'components/Modal/Modal';

interface ISettingsModalProps extends Pick<IModalProps, 'targetId'> {
  onClose: () => void;
}

const MenuModal: React.FC<ISettingsModalProps> = ({ targetId, onClose }) => {
  return (
    <Modal targetId={targetId} classNames="menu-modal">
      <h1>Menu</h1>
      <div>
        <Button>Reset</Button>
        <Button onClick={onClose}>Cancel</Button>
      </div>
    </Modal>
  );
};

export default MenuModal;
