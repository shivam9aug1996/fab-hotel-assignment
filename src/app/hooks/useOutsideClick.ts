import { useEffect, useRef } from "react";

const useOutsideClick = (callback: () => void, enabled: boolean) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (!enabled) return;
    const handleClickOutside = (event: any) => {
      if (ref?.current && !ref?.current?.contains(event?.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback, enabled]);

  return ref;
};

export default useOutsideClick;
