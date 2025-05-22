import { useSelector, useDispatch } from "react-redux";
import { fetchNewMovies } from "../redux/counter/moviesSlice";
import { fetchNewTVShows } from "../redux/counter/tvShowsSlice";
import { useEffect } from "react";
import Loading from "./Loading";

const Hero = ({ type = "all" }) => {
  const dispatch = useDispatch();

  const { movies, loadMovies, errorMovies } = useSelector(
    (state) => state.movies
  );
  const { tvShows, loadTVShows, errorTVShows } = useSelector(
    (state) => state.tvShows
  );

  useEffect(() => {
    if ((type === "all" || type === "movies") && movies.length === 0) {
      dispatch(fetchNewMovies());
    }

    if ((type === "all" || type === "tv") && tvShows.length === 0) {
      dispatch(fetchNewTVShows());
    }
  }, [dispatch, type, movies.length, tvShows.length]);

  let content = [];
  if (type === "movies") content = movies;
  else if (type === "tv") content = tvShows;
  else content = [...movies, ...tvShows];
console.log(content)
  const isLoading =
    (type === "movies" && loadMovies) ||
    (type === "tv" && loadTVShows) ||
    loadMovies ||
    loadTVShows;
  const isError = errorMovies || errorTVShows;

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Error: {isError}</p>;

  return (
    <>
      {content.map((movie) => (
        <div key={movie?.id} className="w-full">
          <img
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`
                : "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?t=st=1747911405~exp=1747915005~hmac=3587984f48c5a2adaa8504a122f5c0d87b5d1cbb6a051c077c8595f4d58ad6eb&w=1380"
            }
            alt={movie?.title || movie?.name}
            className="w-full h-[40vh] object-cover object-center"
          />
        </div>
      ))}
    </>
  );
};

export default Hero;
