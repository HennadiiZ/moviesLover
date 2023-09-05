import { useState } from 'react';
import tempMovieData from './data/tempMovieData';
import tempWatchedData from './data/tempMovieData';

import NavBar from './components/NavBar';
import Main from './components/Main';

import Logo from './components/Logo';
import Search from './components/Search';
import NumberResults from './components/NumberResults';

import ListBox from './components/ListBox';
import WatchedBox from './components/WatchedBox';

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);

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
        <ListBox movies={movies} />
        <WatchedBox average={average} tempWatchedData={tempWatchedData} />
      </Main>
    </>
  );
}
