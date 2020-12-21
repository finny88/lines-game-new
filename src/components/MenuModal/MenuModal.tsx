import React from 'react';
import { Button } from 'reactstrap';

import { Modal } from 'components/Modal';

import { IModalProps } from 'components/Modal/Modal';

interface ISettingsModalProps extends Pick<IModalProps, 'targetId'> {
  onClose: () => void;
}

const MenuModal: React.FC<ISettingsModalProps> = ({ targetId, onClose }) => {
  return (
    <Modal targetId={targetId} contentClassName="lines-menu-modal">
      <div className="lines-menu-modal__children">
        <div className="lines-menu-modal__top">
          <h1 className="lines-menu-modal__header">Menu</h1>
          <Button onClick={onClose} className="lines-menu-modal__close-button">
            X
          </Button>
        </div>

        <Button color="danger" className="w-50">
          Reset
        </Button>
      </div>
    </Modal>
  );
};

export default MenuModal;
