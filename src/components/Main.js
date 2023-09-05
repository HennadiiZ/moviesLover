import { useState } from 'react';
// import ListBox from './ListBox';
// import WatchedBox from './WatchedBox';

export default function Main({ movies, tempWatchedData, average, children }) {
  //   const [watched, setWatched] = useState(tempWatchedData);
  //   const [isOpen1, setIsOpen1] = useState(true);
  //   const [isOpen2, setIsOpen2] = useState(true);

  //   const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  //   const avgUserRating = average(watched.map((movie) => movie.userRating));
  //   const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    // <main className='main'>
    //   <ListBox movies={movies} />
    //   <WatchedBox average={average} tempWatchedData={tempWatchedData} />
    // </main>
    <main className='main'>{children}</main>
  );
}
