import React, { useCallback, useEffect } from "react";

// debounce function (defaults wait to .2 seconds)
export const debounce = <T extends any[]>(
  func: (...args: T) => void,
  wait = 200
) => {
  let timeout: NodeJS.Timeout;
  function executedFunction(...args: T) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
  executedFunction.cancel = function () {
    clearTimeout(timeout);
  };
  return executedFunction;
};

// hook for using the debounce function
export default function useDebounce<T extends any[]>(
  callback: (...args: T) => void,
  delay = 1000,
  deps: React.DependencyList = []
) {
  const debouncedCallback = useCallback(() => {
    debounce(callback, delay);
  }, [delay, ...deps]);

  useEffect(() => {
    return () => {
      // debouncedCallback.cancel();
    };
  }, [delay, ...deps]);
  
  return debouncedCallback;
}
