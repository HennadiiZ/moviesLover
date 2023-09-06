import { useState } from 'react';
import tempMovieData from './data/tempMovieData';
import tempWatchedData from './data/tempMovieData';

import NavBar from './components/NavBar';
import Main from './components/Main';
import Logo from './components/Logo';
import Search from './components/Search';
import NumberResults from './components/NumberResults';
import Box from './components/Box';
import MovieList from './components/MovieList';
import Summary from './components/Summary';
import WatchedMovieList from './components/WatchedMovieList';
import TextExpander from './components/TextExpander';

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumberResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        {/* <Box element={<MovieList movies={movies} />} /> */}

        <Box>
          <Summary
            average={average}
            watched={watched}
            setWatched={setWatched}
          />
          <WatchedMovieList movies={watched} />
        </Box>
      </Main>
      {/* <TextExpander>
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander> */}

      <TextExpander
        collapsedNumWords={20}
        expandButtonText='Show text'
        collapseButtonText='Collapse text'
        buttonColor='#ff6622'
      >
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExpander>
      {/* 
      <TextExpander expanded={true} className='box'>
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander>*/}
    </>
  );
}

//  Building a Reusable Star Rating Component
