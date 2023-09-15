import { useState, useEffect } from 'react';

export function useLocalStorageState() {
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem('watchedMovies');
    return JSON.parse(storedValue);
  });

  useEffect(() => {
    localStorage.setItem('watchedMovies', JSON.stringify(watched));
  }, [watched]);

  return [watched, setWatched];
}
