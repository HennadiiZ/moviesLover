import MovieYear from './MovieYear';

export default function Movie({ movie, children }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>

      {/* <MovieYear movie={movie} /> */}
      {children}
    </li>
  );
}
