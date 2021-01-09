import React from 'react';
import { Button } from 'reactstrap';

import { Modal } from 'components/Modal';

import { IModalProps } from 'components/Modal/Modal';

interface IConfirmModalProps extends Pick<IModalProps, 'targetId'> {
  question: string;
  onConfirm: () => void;
  onRefuse: () => void;
}

const ConfirmModal: React.FC<IConfirmModalProps> = ({
  targetId,
  question,
  onConfirm,
  onRefuse,
}) => {
  return (
    <Modal targetId={targetId} contentClassName="lines-confirm-modal">
      <div>
        <div className="lines-confirm-modal__question">{question}</div>

        <div className="lines-confirm-modal__buttons-container">
          <Button color="primary" className="lines-confirm-modal__button" onClick={onConfirm}>
            Yes
          </Button>
          <Button color="secondary" className="lines-confirm-modal__button" onClick={onRefuse}>
            No
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
