import { useSelector, useDispatch } from "react-redux";
import { fetchNewMovies } from "../redux/counter/moviesSlice";
import { fetchNewTVShows } from "../redux/counter/tvShowsSlice";
import { useEffect } from "react";
import Loading from "./Loading";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../../src/index.css";

// import required modules
import { Pagination } from "swiper/modules";

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
  else {
    content = [...movies, ...tvShows];
    for (let i = content.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [content[i], content[j]] = [content[j], content[i]]; // Shuffle step
    }
  }

  console.log(content);

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
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {content.map((media) => (
          <SwiperSlide className="relative">
            <img
              src={
                media?.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${media.backdrop_path}`
                  : "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?t=st=1747911405~exp=1747915005~hmac=3587984f48c5a2adaa8504a122f5c0d87b5d1cbb6a051c077c8595f4d58ad6eb&w=1380"
              }
              alt={media?.title || media?.name}
              className="h-[50vh]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {content.map((media) => (
        <div className="w-full bg-red-300">
          <div className="">
            <h1 className="text-white font-[FontBlack] text-4xl text-center mx-auto">
              {media.original_name || media.original_title}
            </h1>
          </div>
        </div>
      ))}
    </>
  );
};

export default Hero;
// bg-linear-[180deg,transparent_0%,transparent_20%,black_100%]
