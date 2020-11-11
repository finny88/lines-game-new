import { useRef, useEffect } from 'react';

const usePortalTarget = (containerId: string): HTMLElement => {
  const mountElemRef = useRef<HTMLElement | null>(null);

  if (!mountElemRef.current) {
    mountElemRef.current = document.createElement('div');
  }

  useEffect(() => {
    const containerEl = document.getElementById(containerId);

    if (!containerEl) {
      console.error('No container element found for portal.');
      return;
    }

    const mountElem = mountElemRef.current as HTMLElement;

    containerEl.appendChild(mountElem);

    return () => {
      containerEl.removeChild(mountElem);
    };
  }, [containerId]);

  return mountElemRef.current;
};

export default usePortalTarget;
