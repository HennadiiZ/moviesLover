// import { useState } from 'react';
// import tempMovieData from '../data/tempMovieData';
import Movie from './Movie';
import MovieYear from './MovieYear';

export default function MovieList({ movies }) {
  //   const [movies, setMovies] = useState(tempMovieData);
  return (
    <ul className='list'>
      {movies?.map((movie) => (
        // <Movie movie={movie} key={movie.imdbID} />
        <Movie movie={movie} key={movie.imdbID}>
          <MovieYear movie={movie} />
        </Movie>
      ))}
    </ul>
  );
}
