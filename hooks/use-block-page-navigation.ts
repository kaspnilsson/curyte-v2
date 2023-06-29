import { useEffect, useRef } from "react";

const useBlockPageNavigation = () => {
  const shouldBlockNavigationRef = useRef(false);
  const messageRef = useRef("");

  const blockNavigation = (message = "") => {
    messageRef.current = message;
    shouldBlockNavigationRef.current = true;
  };

  const allowNavigation = () => {
    shouldBlockNavigationRef.current = false;
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (shouldBlockNavigationRef.current) {
        e.preventDefault();
        e.returnValue = messageRef.current;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return { blockNavigation, allowNavigation };
};

export default useBlockPageNavigation;
