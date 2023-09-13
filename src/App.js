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
import Summary from './components/Summary';
import WatchedMoviesList from './components/WatchedMovieList';
import Calculator from './components/Calculator';

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

      if (query.length === 0) {
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
              {/* <WatchedMoviesList watched={watched}/> */}
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
      <Calculator />
    </>
  );
}

// import { useEffect, useState } from 'react';
// import Loader from './components/Loader';
// import ErrorMessage from './components/ErrorMessage';
// import NavBar from './components/NavBar';
// import Search from './components/Search';
// import NumberResults from './components/NumberResults';
// import Main from './components/Main';
// import Box from './components/Box';
// import MovieList from './components/MovieList';
// import MovieDetails from './components/MovieDetails';
// import Summary from './components/Summary';
// import WatchedMoviesList from './components/WatchedMovieList';

// const API_KEY = '63ad7598';

// export default function App() {
//   const [query, setQuery] = useState('');
//   const [movies, setMovies] = useState([]);
//   const [watched, setWatched] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [selectedId, setSelectedId] = useState(null);

//   useEffect(
//     function () {
//       const controller = new AbortController();

//       async function fetchMovies() {
//         try {
//           setIsLoading(true);
//           setError('');

//           const res = await fetch(
//             `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
//             { signal: controller.signal }
//           );

//           if (!res.ok)
//             throw new Error('Something went wrong with fetching movies');

//           const data = await res.json();
//           if (data.Response === 'False') throw new Error('Movie not found');

//           setMovies(data.Search);
//           setError('');
//         } catch (err) {
//           if (err.name !== 'AbortError') {
//             console.log(err.message);
//             setError(err.message);
//           }
//         } finally {
//           setIsLoading(false);
//         }
//       }

//       if (query.length < 3) {
//         setMovies([]);
//         setError('');
//         return;
//       }

//       handleCloseMovie();
//       fetchMovies();

//       return function () {
//         controller.abort();
//       };
//     },
//     [query]
//   );

//   function handleSelectMovie(id) {
//     setSelectedId((selectedId) => (id === selectedId ? null : id));
//   }

//   function handleCloseMovie() {
//     setSelectedId(null);
//   }

//   function handleAddWatched(movie) {
//     setWatched((watched) => [...watched, movie]);
//   }

//   function handleDeleteWatched(id) {
//     setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
//   }

//   return (
//     <>
//       <NavBar>
//         <Search query={query} setQuery={setQuery} />
//         <NumberResults movies={movies} />
//       </NavBar>

//       <Main>
//         <Box>
//           {isLoading && <Loader />}
//           {!isLoading && !error && (
//             <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
//           )}
//           {error && <ErrorMessage message={error} />}
//         </Box>

//         <Box>
//           {selectedId ? (
//             <MovieDetails
//               selectedId={selectedId}
//               onCloseMovie={handleCloseMovie}
//               onAddWatched={handleAddWatched}
//               watched={watched}
//             />
//           ) : (
//             <>
//               <Summary watched={watched} />
//               <WatchedMoviesList
//                 watched={watched}
//                 onDeleteWatched={handleDeleteWatched}
//               />
//             </>
//           )}
//         </Box>
//       </Main>
//     </>
//   );
// }
