import { useEffect, useState } from "react";
import { fetchFromTMDB } from "../../client/src/api/tmdb";

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchFromTMDB("discover/movie", {
      language: "en-US",
      include_adult: false,
      include_video: false,
      page: 1,
      sort_by: "popularity.desc",
    })
      .then((data) => setMovies(data.results || []))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Popular Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.id} - {movie.original_title
}</li>
        ))}
        {console.log(movies)}
      </ul>
    </div>
  );
};

export default PopularMovies;
