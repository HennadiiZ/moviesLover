export default function MovieDetails({ selectedId, setSelectedId }) {
  return (
    <div className='details'>
      {selectedId}
      <button className='btn-back' onClick={() => setSelectedId(null)}>
        &larr;
      </button>
      {/* 
      <div className='header'>{selectedMovie.Title}</div>
      <img src={selectedMovie.Poster} alt={selectedMovie.Title} /> */}
    </div>
  );
}
