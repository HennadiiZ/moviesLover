import { useState } from 'react';
import Summary from './Summary';
import WatchedMovieList from './WatchedMovieList';

export default function WatchedBox({ tempWatchedData, average }) {
  //   const [isOpen2, setIsOpen2] = useState(true);

  //   const [watched, setWatched] = useState(tempWatchedData);
  //   const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  //   const avgUserRating = average(watched.map((movie) => movie.userRating));
  //   const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className='box'>
      {/* <button
        className='btn-toggle'
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? '–' : '+'}
      </button>
      {isOpen2 && (
        <>
          <Summary
            average={average}
            watched={watched}
            setWatched={setWatched}
          />

          <WatchedMovieList watched={watched} />
        </>
      )} */}
    </div>
  );
}

/*
function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>

      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </>
      )}
    </div>
  );
}
*/
