import Movie from './Movie';
import MovieYear from './MovieYear';

export default function MovieList({ movies }) {
  return (
    <ul className='list'>
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID}>
          <MovieYear movie={movie} />
        </Movie>
      ))}
    </ul>
  );
}
