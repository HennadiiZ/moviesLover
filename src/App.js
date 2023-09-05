import { useState } from 'react';
import tempMovieData from './data/tempMovieData';
import tempWatchedData from './data/tempMovieData';

import NavBar from './components/NavBar';
import Main from './components/Main';

import Logo from './components/Logo';
import Search from './components/Search';
import NumberResults from './components/NumberResults';

import Box from './components/Box';
import WatchedBox from './components/WatchedBox';
import MovieList from './components/MovieList';

import Summary from './components/Summary';
import WatchedMovieList from './components/WatchedMovieList';

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      {/* <NavBar movies={movies} /> */}
      <NavBar>
        <Logo />
        <Search />
        <NumberResults movies={movies} />
      </NavBar>
      {/* <Main
        movies={movies}
        tempWatchedData={tempWatchedData}
        average={average}
      /> */}
      <Main>
        {/* <ListBox movies={movies} /> */}
        <Box>
          <MovieList movies={movies} />
        </Box>

        <Box>
          <Summary
            average={average}
            watched={watched}
            setWatched={setWatched}
          />
          {/* <WatchedMovieList watched={watched} /> */}
          <MovieList movies={watched} />
        </Box>

        {/* <WatchedBox average={average} tempWatchedData={tempWatchedData} /> */}
      </Main>
    </>
  );
}
