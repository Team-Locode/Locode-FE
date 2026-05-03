import { useRef } from "react";

export const useThrottle = (callback: () => void, delay = 600) => {
  const isLocked = useRef(false);

  return () => {
    if (isLocked.current) return;

    callback();
    isLocked.current = true;

    setTimeout(() => {
      isLocked.current = false;
    }, delay);
  };
};
