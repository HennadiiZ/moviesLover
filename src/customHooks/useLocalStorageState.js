import { useState, useEffect } from 'react';

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    // const storedValue = localStorage.getItem('watchedMovies');
    const storedValue = localStorage.getItem(key);
    // initialState.length
    console.log(storedValue);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('watchedMovies', JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}