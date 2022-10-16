import { useCallback, useEffect, useState } from 'react';

function useStorage<T>(key: string, defaultValue: T, storageObject: Storage) {
  const [value, setValue] = useState<T | undefined>(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue !== null) return JSON.parse(jsonValue);
    if (typeof defaultValue === 'function') return defaultValue();
    else return defaultValue;
  });

  const remove = useCallback(() => setValue(undefined), []);

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  return [value, setValue, remove];
}

export const useSessionStorage = <T extends unknown>(
  key: string,
  defaultValue?: T
) => useStorage(key, defaultValue, window.sessionStorage);

export const useLocalStorage = <T extends unknown>(
  key: string,
  defaultValue?: T
) => useStorage(key, defaultValue, window.localStorage);
