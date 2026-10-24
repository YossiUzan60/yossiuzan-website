import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToLocation = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // Wait until the destination route's sections have been committed to the DOM.
    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
};
