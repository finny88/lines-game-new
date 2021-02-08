import React, { useCallback, useState } from 'react';
import { batch, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';

import { IModalProps } from 'components/Modal/Modal';

import { INIT_LINES, RESET_REDUX_STATE } from 'store/common';

import { Modal } from 'components/Modal';
import { ConfirmModal } from 'components/ConfirmModal';

const CONFIRM_MODAL_ROOT_ID = 'CONFIRM_MODAL_ROOT_ID';

interface ISettingsModalProps extends Pick<IModalProps, 'targetId'> {
  onClose: () => void;
}

const MenuModal: React.FC<ISettingsModalProps> = ({ targetId, onClose }) => {
  const dispatch = useDispatch();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleResetClick = useCallback(() => setShowConfirm(true), []);

  const handleRefuse = useCallback(() => setShowConfirm(false), []);

  const handleConfirm = useCallback(() => {
    batch(() => {
      dispatch({ type: RESET_REDUX_STATE });
      dispatch({ type: INIT_LINES });
    });
    setShowConfirm(false);
    onClose();
  }, [dispatch, onClose]);

  return (
    <>
      <Modal targetId={targetId} contentClassName="lines-menu-modal">
        <div className="lines-menu-modal__children" id={CONFIRM_MODAL_ROOT_ID}>
          <div className="lines-menu-modal__top">
            <h1 className="lines-menu-modal__header">Menu</h1>
            <Button onClick={onClose} className="lines-menu-modal__close-button">
              X
            </Button>
          </div>

          <div className="lines-menu-modal__body">
            <Button color="danger" className="w-50" onClick={handleResetClick}>
              Reset
            </Button>
          </div>
        </div>
      </Modal>
      {showConfirm && (
        <ConfirmModal
          targetId={CONFIRM_MODAL_ROOT_ID}
          question="Are you sure to restart the current game?"
          onConfirm={handleConfirm}
          onRefuse={handleRefuse}
        />
      )}
    </>
  );
};

export default MenuModal;
