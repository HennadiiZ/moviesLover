import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import NavBar from './components/NavBar';
import Search from './components/Search';
import NumberResults from './components/NumberResults';
import Main from './components/Main';
import Box from './components/Box';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import Summary from './components/MovieDetails';
import WatchedMoviesList from './components/WatchedMovieList';

// const average = (arr) =>
//   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const API_KEY = '63ad7598';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError('');

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error('Something went wrong with fetching movies');

          const data = await res.json();
          if (data.Response === 'False') throw new Error('Movie not found');

          setMovies(data.Search);
          setError('');
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }

      handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumberResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

//----------------------------------------------------
//
// import { useState, useEffect } from 'react';
// import tempMovieData from './data/tempMovieData';
// import tempWatchedData from './data/tempMovieData';

// import NavBar from './components/NavBar';
// import Main from './components/Main';
// import Logo from './components/Logo';
// import Search from './components/Search';
// import NumberResults from './components/NumberResults';
// import Box from './components/Box';
// import MovieList from './components/MovieList';
// import Summary from './components/Summary';
// import WatchedMovieList from './components/WatchedMovieList';
// import TextExpander from './components/TextExpander';
// import Loader from './components/Loader';
// import ErrorMessage from './components/ErrorMessage';
// import MovieDetails from './components/MovieDetails';

// const average = (arr) =>
//   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// const apiKey2 = '17b3c4c2';
// const apiKey = '63ad7598';

// export default function App() {
//   const [movies, setMovies] = useState([]);
//   const [watched, setWatched] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const tempQuery = 'interstellar';
//   const [query, setQuery] = useState(tempQuery);
//   const [selectedId, setSelectedId] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         setIsLoading(true);
//         setError('');
//         const response = await fetch(
//           `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
//         );

//         if (!response.ok) {
//           throw new Error('Network error');
//         }

//         const data = await response.json();

//         if (data.Response === 'False') {
//           throw new Error('movie not found');
//         }
//         setMovies(data.Search);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     if (!query.length) {
//       setMovies([]);
//       setError('');
//       return;
//     }

//     fetchData();
//   }, [query]);

//   function showSelectedMovieHandler(id) {
//     setSelectedId((movieId) => (movieId === id ? null : id));
//   }
//   function AddWatchedMovieHandler(movie) {
//     setWatched((watched) => [...watched, movie]);
//     setSelectedId(null);
//   }

//   return (
//     <>
//       <NavBar>
//         <Logo />
//         <Search query={query} setQuery={setQuery} />
//         <NumberResults movies={movies} />
//       </NavBar>

//       <Main>
//         <Box>
//           {isLoading && <Loader />}
//           {!isLoading && !error && (
//             <MovieList
//               movies={movies}
//               onSelectedMovie={showSelectedMovieHandler}
//             />
//           )}
//           {error && <ErrorMessage err={error} />}
//         </Box>

//         {selectedId ? (
//           <Box>
//             <MovieDetails
//               selectedId={selectedId}
//               setSelectedId={setSelectedId}
//               apiKey={apiKey}
//               onAddWatched={AddWatchedMovieHandler}
//               watched={watched}
//             />
//           </Box>
//         ) : (
//           <Box>
//             <Summary
//               average={average}
//               watched={watched}
//               setWatched={setWatched}
//             />
//             <WatchedMovieList movies={watched} />
//           </Box>
//         )}
//       </Main>

//       <TextExpander
//         expandButtonText='Show text'
//         collapseButtonText='hide text'
//         buttonColor='green'
//         className='box2'
//       >
//         Space travel is the ultimate adventure! Imagine soaring past the stars
//         and exploring new worlds. It's the stuff of dreams and science fiction,
//         but believe it or not, space travel is a real thing. Humans and robots
//         are constantly venturing out into the cosmos to uncover its secrets and
//         push the boundaries of what's possible.
//       </TextExpander>

//       <TextExpander
//         collapsedNumWords={20}
//         expandButtonText='Show text'
//         collapseButtonText='Collapse text'
//         buttonColor='#ff6622'
//       >
//         Space travel requires some seriously amazing technology and
//         collaboration between countries, private companies, and international
//         space organizations. And while it's not always easy (or cheap), the
//         results are out of this world. Think about the first time humans stepped
//         foot on the moon or when rovers were sent to roam around on Mars.
//       </TextExpander>

//       <TextExpander
//         expanded={true}
//         collapsedNumWords={20}
//         expandButtonText='Show text'
//         collapseButtonText='Collapse text'
//         buttonColor='#ff6622'
//       >
//         Space missions have given us incredible insights into our universe and
//         have inspired future generations to keep reaching for the stars. Space
//         travel is a pretty cool thing to think about. Who knows what we'll
//         discover next!
//       </TextExpander>
//     </>
//   );
// }

//================
