import { useEffect, useState } from 'react';
// import StarRating from './components/StarRating';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import NavBar from './components/NavBar';
import Search from './components/Search';
import NumberResults from './components/NumberResults';
import Main from './components/Main';
import Box from './components/Box';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

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
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
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
              <WatchedSummary watched={watched} />
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

// function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
//   const [movie, setMovie] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [userRating, setUserRating] = useState('');

//   const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
//   const watchedUserRating = watched.find(
//     (movie) => movie.imdbID === selectedId
//   )?.userRating;

//   const {
//     Title: title,
//     Year: year,
//     Poster: poster,
//     Runtime: runtime,
//     imdbRating,
//     Plot: plot,
//     Released: released,
//     Actors: actors,
//     Director: director,
//     Genre: genre,
//   } = movie;

//   function handleAdd() {
//     const newWatchedMovie = {
//       imdbID: selectedId,
//       title,
//       year,
//       poster,
//       imdbRating: Number(imdbRating),
//       runtime: Number(runtime.split(' ').at(0)),
//       userRating,
//     };

//     onAddWatched(newWatchedMovie);
//     onCloseMovie();
//   }

//   useEffect(
//     function () {
//       function callback(e) {
//         if (e.code === 'Escape') {
//           onCloseMovie();
//         }
//       }

//       document.addEventListener('keydown', callback);

//       return function () {
//         document.removeEventListener('keydown', callback);
//       };
//     },
//     [onCloseMovie]
//   );

//   useEffect(
//     function () {
//       async function getMovieDetails() {
//         setIsLoading(true);
//         const res = await fetch(
//           `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
//         );
//         const data = await res.json();
//         setMovie(data);
//         setIsLoading(false);
//       }
//       getMovieDetails();
//     },
//     [selectedId]
//   );

//   useEffect(
//     function () {
//       if (!title) return;
//       document.title = `Movie | ${title}`;

//       return function () {
//         document.title = 'usePopcorn';
//         // console.log(`Clean up effect for movie ${title}`);
//       };
//     },
//     [title]
//   );

//   return (
//     <div className='details'>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <>
//           <header>
//             <button className='btn-back' onClick={onCloseMovie}>
//               &larr;
//             </button>
//             <img src={poster} alt={`Poster of ${movie} movie`} />
//             <div className='details-overview'>
//               <h2>{title}</h2>
//               <p>
//                 {released} &bull; {runtime}
//               </p>
//               <p>{genre}</p>
//               <p>
//                 <span>⭐️</span>
//                 {imdbRating} IMDb rating
//               </p>
//             </div>
//           </header>
//           <section>
//             <div className='rating'>
//               {!isWatched ? (
//                 <>
//                   <StarRating
//                     maxRating={10}
//                     size={24}
//                     onSetRating={setUserRating}
//                   />
//                   {userRating > 0 && (
//                     <button className='btn-add' onClick={handleAdd}>
//                       + Add to list
//                     </button>
//                   )}
//                 </>
//               ) : (
//                 <p>
//                   You rated with movie {watchedUserRating} <span>⭐️</span>
//                 </p>
//               )}
//             </div>
//             <p>
//               <em>{plot}</em>
//             </p>
//             <p>Starring {actors}</p>
//             <p>Directed by {director}</p>
//           </section>
//         </>
//       )}
//     </div>
//   );
// }

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className='summary'>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className='btn-delete'
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
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
