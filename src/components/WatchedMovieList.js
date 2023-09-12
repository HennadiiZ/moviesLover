// import Movie from './Movie';
import WatchedMovie from './WatchedMovie';
// import MovieRate from './MovieRate';

// export default function WatchedMovieList({ movies }) {
//   return (
//     <ul className='list'>
//       {movies.map((movie) => (
//         <WatchedMovie movie={movie} key={movie.imdbID}>
//           <MovieRate movie={movie} />
//         </WatchedMovie>
//       ))}
//     </ul>
//   );
// }

export default function WatchedMoviesList({ watched, onDeleteWatched }) {
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
