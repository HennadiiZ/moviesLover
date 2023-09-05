import Movie from './Movie';
import MovieRate from './MovieRate';

export default function WatchedMovieList({ movies }) {
  return (
    <ul className='list'>
      {movies.map((movie) => (
        <Movie movie={movie} key={movie.imdbID}>
          <MovieRate movie={movie} />
        </Movie>
      ))}
    </ul>
  );
}
