import { useEffect, useRef, useCallback } from 'react';

export const usePrompt = (when: boolean) => {
  const whenRef = useRef(when);

  useEffect(() => {
    whenRef.current = when;
  }, [when]);

  useEffect(() => {
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  const handleUnload = useCallback((event: BeforeUnloadEvent) => {
    if (whenRef.current) {
      event.preventDefault();
      event.returnValue = '';
    }
  }, []);
};
