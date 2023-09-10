export default function Movie({ movie, children, onShowMovie }) {
  return (
    <li onClick={() => onShowMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      {children}
    </li>
  );
}
