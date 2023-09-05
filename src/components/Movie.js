import MovieYear from './MovieYear';

export default function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>

      <MovieYear movie={movie} />
      {/* <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div> */}
    </li>
  );
}

//MovieYear
