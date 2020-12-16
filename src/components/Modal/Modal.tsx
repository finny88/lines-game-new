import React from 'react';

import { IPortalProps } from 'components/Portal/Portal';

import { Portal } from 'components/Portal';

export interface IModalProps extends IPortalProps {
  children: React.ReactNode;
  contentClassName?: string;
}

const Modal: React.FC<IModalProps> = ({ children, targetId, contentClassName }) => {
  return (
    <Portal targetId={targetId}>
      <div className="lines-modal">
        <div className={contentClassName}>{children}</div>
      </div>
    </Portal>
  );
};

export default Modal;
