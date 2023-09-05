import WatchedMovie from './WatchedMovie';
import Movie from './Movie';
import MovieRate from './MovieRate';

export default function WatchedMovieList({ movies }) {
  return (
    <ul className='list'>
      {movies.map((movie) => (
        // <WatchedMovie movie={movie} key={movie.imdbID} />
        <Movie movie={movie} key={movie.imdbID}>
          <MovieRate movie={movie} />
        </Movie>
      ))}
    </ul>
  );
}
