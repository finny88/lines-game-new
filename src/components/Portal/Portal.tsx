import React from 'react';
import ReactDOM from 'react-dom';

import usePortalTarget from './usePortalTarget';

export interface IPortalProps {
  targetId: string;
}

const Portal: React.FC<IPortalProps> = (props) => {
  const target = usePortalTarget(props.targetId);

  return ReactDOM.createPortal(props.children, target);
};

export default Portal;
