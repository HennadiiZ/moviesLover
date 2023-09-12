export default function WatchedMovie({ movie, children, onSelectedMovie }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      {children}
    </li>
  );
}
