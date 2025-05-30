import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import Loading from "./Loading";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "../../src/index.css";

import { fetchNewMovies, fetchNewTVShows } from "../redux/counter/mediaSlice";
import {
  fetchMovieGenres,
  fetchTVShowGenres,
  fetchLanguages,
} from "../redux/counter/metaDataSlice";

const Hero = ({ type = "all" }) => {
  const dispatch = useDispatch();

  // const fullState = useSelector((state) => state);
  // console.log(fullState); // Verify the full structure

  const {
    newMovies = [],
    newTVShows = [],
    isLoading = false,
    error = null,
  } = useSelector((state) => state.media || {});

  const {
    movieGenres = [],
    tvShowGenres = [],
    languages = [],
  } = useSelector((state) => state.metaData || {});

  useEffect(() => {
    if ((type === "all" || type === "movies") && newMovies.length === 0) {
      dispatch(fetchNewMovies());
    }
    if ((type === "all" || type === "movies") && movieGenres.length === 0) {
      dispatch(fetchMovieGenres());
    }
    if ((type === "all" || type === "tvShows") && newTVShows.length === 0) {
      dispatch(fetchNewTVShows());
    }
    if ((type === "all" || type === "tvShows") && tvShowGenres.length === 0) {
      dispatch(fetchTVShowGenres());
    }
    dispatch(fetchLanguages());
  }, [
    dispatch,
    type,
    languages.length,
    newMovies.length,
    movieGenres.length,
    newTVShows.length,
    tvShowGenres.length,
  ]);

  useEffect(() => {
    if (!isLoading && !error) {
      console.log("New Movies:", newMovies);
      console.log("New TV Shows:", newTVShows);
      console.log("Movie Genres:", movieGenres);
      console.log("TV Shows Genres:", tvShowGenres);
      console.log("Languages:", languages);
    } else if (error) {
      console.error("Error fetching data:", error);
    }
  }, [
    isLoading,
    error,
    newMovies,
    newTVShows,
    languages,
    movieGenres,
    tvShowGenres,
  ]);

  let content = [];
  if (type === "movies")
    content = [...newMovies.map((item) => ({ ...item, mediaType: "movie" }))];
  else if (type === "tvShows")
    content = [...newTVShows.map((item) => ({ ...item, mediaType: "tvShow" }))];
  else {
    content = [
      ...newMovies.map((item) => ({ ...item, mediaType: "movie" })),
      ...newTVShows.map((item) => ({ ...item, mediaType: "tvShow" })),
    ].sort(() => 0.5 - Math.random());
  }
  return (
    <Swiper
      pagination={{ dynamicBullets: true }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {content.map((media) => (
        <SwiperSlide className="relative" key={media.id}>
          <Link to={`/${media.mediaType}/details/${media.id}`}>
            <img
              src={
                media?.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${media.backdrop_path}`
                  : "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg"
              }
              alt={media?.title || media?.name}
              className="h-[50vh] w-full object-cover"
            />
            <div className="bg-black/50">
              <h1 className="text-white font-[FontBlack] text-3xl md:text-4xl text-center">
                {media.original_name || media.original_title}
              </h1>
            </div>
          </Link>

          <div>
            <span className="bg-black" key={media.original_language}>
              {languages.find(
                (lang) => lang.iso_639_1 === media.original_language
              )?.english_name || media.original_language}
            </span>
            {media.genre_ids.map((genreId) => {
              const genre = movieGenres.find((g) => g.id === genreId);
              return (
                <span className="bg-black" key={genreId}>
                  {genre && genre.name}
                </span>
              );
            })}
          </div>
          <Link
            to={`/${media.mediaType}/details/${media.id}/trailer`}
            className="bg-red-400 p-5"
          >
            Watch Now
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
