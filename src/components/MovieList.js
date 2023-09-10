import Movie from './Movie';
import MovieYear from './MovieYear';

export default function MovieList({ movies, onShowMovie }) {
  return (
    <ul className='list'>
      {movies?.map((movie) => (
        <Movie onShowMovie={onShowMovie} movie={movie} key={movie.imdbID}>
          <MovieYear movie={movie} />
        </Movie>
      ))}
    </ul>
  );
}
