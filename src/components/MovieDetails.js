import { useState, useEffect } from 'react';
import StarRating from './StarRating';
import Loader from './Loader';

export default function MovieDetails({ selectedId, setSelectedId, apiKey }) {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = selectedMovie;

  useEffect(() => {
    async function fetchMovie() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log(data);
        if (data.Response === 'True') {
          setSelectedMovie(data);
        } else {
          setSelectedMovie({});
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
        setSelectedMovie({});
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovie();
  }, [selectedId]);

  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className='btn-back' onClick={() => setSelectedId(null)}>
              &larr;
            </button>
            <img src={poster} alt={poster} />
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className='rating'>
              <StarRating maxRating={10} size={24} />
            </div>

            {/* <div className='rating'>
          {!isWatched ? (
            <>
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
              />
              {userRating > 0 && (
                <button className='btn-add' onClick={handleAdd}>
                  + Add to list
                </button>
              )}
            </>
          ) : (
            <p>
              You rated with movie {watchedUserRating} <span>⭐️</span>
            </p>
          )}
        </div> */}
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
