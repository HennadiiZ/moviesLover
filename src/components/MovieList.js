import Movie from './Movie';
// import MovieYear from './MovieYear';

// export default function MovieList({ movies, onSelectedMovie }) {
//   return (
//     <ul className='list list-movies'>
//       {movies?.map((movie) => (
//         <Movie
//           onSelectedMovie={onSelectedMovie}
//           movie={movie}
//           key={movie.imdbID}
//         >
//           <MovieYear movie={movie} />
//         </Movie>
//       ))}
//     </ul>
//   );
// }

export default function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className='list list-movies'>
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
