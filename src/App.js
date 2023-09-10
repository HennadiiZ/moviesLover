import { useState, useEffect } from 'react';
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
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const apiKey2 = '17b3c4c2';
const apiKey = '63ad7598';

// http://www.omdbapi.com/?apikey=[yourkey]&
// fetch(`http://www.omdbapi.com/?apikey=${apiKey}&`);

export default function App() {
  // const [movies, setMovies] = useState(tempMovieData);
  // const [watched, setWatched] = useState(tempWatchedData);
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const tempQuery = 'interstellar';

  const [query, setQuery] = useState('');
  // const query = 'intersteugykllar';

  // useEffect(() => {
  //   console.log('after initial render'); // 2
  // }, []);

  // useEffect(() => {
  //   console.log('afrer every render'); // 3
  // });

  // console.log('during render'); // 1

  useEffect(() => {
    // async function fetchData() {
    //   setIsLoading(true);
    //   const response = await fetch(
    //     `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
    //   );
    //   const data = await response.json();
    //   setMovies(data.Search);
    //   setIsLoading(false);
    //   // console.log('movies', movies); // []
    // }
    // // console.log('movies', movies); // []
    // fetchData();

    async function fetchData() {
      try {
        setIsLoading(true);
        setError('');
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
        );

        if (!response.ok) {
          throw new Error('Network error');
        }

        const data = await response.json();

        if (data.Response === 'False') {
          throw new Error('movie not found');
        }
        setMovies(data.Search);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query]);

  // console.log('movies', movies); // [not empty]

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumberResults movies={movies} />
      </NavBar>

      <Main>
        {/* <Box>{isLoading ? <Loader /> : <MovieList movies={movies} />}</Box> */}

        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage err={error} />}
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

      <TextExpander
        expandButtonText='Show text'
        collapseButtonText='hide text'
        buttonColor='green'
        className='box2'
      >
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>

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

      <TextExpander
        expanded={true}
        collapsedNumWords={20}
        expandButtonText='Show text'
        collapseButtonText='Collapse text'
        buttonColor='#ff6622'
      >
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander>
    </>
  );
}

//  Building a Reusable Star Rating Component
