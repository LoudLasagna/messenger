import { useEffect, useState } from 'react';
import { USER_KEY } from '../components/constants';

const PREFIX = USER_KEY;

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) {
      if (jsonValue === 'undefined') {
        return null;
      }
      return JSON.parse(jsonValue);
    }
    if (typeof initialValue === 'function') {
      return initialValue();
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
