import axios from "axios";
import { useEffect } from "react";
// import { fetchFromTMDB } from "../../client/src/api/tmdb";

const PopularMovies = () => {
  // const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          "https://tmdb-proxy.adarshvishwakarma09nov2k.workers.dev?path=discover/movie",
          {
            params: {
              path: "movie/popular",
              language: "en",
            },
          }
        );
        const data = res.data;
        console.log(data.results);
      } catch (err) {
        console.error("Worker fetch failed", err);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Popular Movies</h2>
      {/* <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.id} - {movie.original_title
}</li>
        ))}
        {console.log(movies)}
      </ul> */}
    </div>
  );
};

export default PopularMovies;
