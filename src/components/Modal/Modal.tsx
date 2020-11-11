import React from 'react';

import { IPortalProps } from 'components/Portal/Portal';

import { Portal } from 'components/Portal';

export interface IModalProps extends IPortalProps {
  children: React.ReactNode;
  classNames?: string;
}

const Modal: React.FC<IModalProps> = ({ children, targetId, classNames }) => {
  return (
    <Portal targetId={targetId}>
      <div className={classNames}>{children}</div>
    </Portal>
  );
};

export default Modal;
