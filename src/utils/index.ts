import { useState, useEffect } from "react";

// don't change the original object
export const cleanObject = (object: any) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const isFalsy = (value: any) => (value === 0 ? false : !value);

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value: any, delay?: number) => {
  const [deboucedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);

    // only the last setTimeout will leave
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return deboucedValue;
};
