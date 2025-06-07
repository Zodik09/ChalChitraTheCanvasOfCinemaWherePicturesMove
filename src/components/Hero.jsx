import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLanguages } from "../redux/actions/languages";
import { getMovieGenres, getTVShowGenres } from "../redux/actions/genres";
import {
  getMovieCertificates,
  getTVShowCertificates,
} from "../redux/actions/certificates";
import {
  getMovies,
  getTrendingMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getPopularMovies,
} from "../redux/actions/movie";

import {
  getTVShows,
  getTrendingTVShows,
  getAiringTVShows,
  getTopRatedTVShows,
  getPopularTVShows,
} from "../redux/actions/tvShow";

const Hero = () => {
  const dispatch = useDispatch();

  const {
    movies,
    trendingMovies,
    upcomingMovies,
    topRatedMovies,
    nowPlayingMovies,
    popularMovies,
  } = useSelector((state) => state.movies);
  const {
    tvShows,
    trendingTVShows,
    airingTVShows,
    topRatedTVShows,
    popularTVShows,
  } = useSelector((state) => state.tvShows);
  const { movieCertificate, tvShowCertificate } = useSelector(
    (state) => state.certificates
  );
  const { movieGenres, tvShowGenres } = useSelector((state) => state.genres);
  const { languages } = useSelector((state) => state.languages);

  useEffect(() => {
    // Movies Data
    dispatch(getMovies("discover/movie"));
    dispatch(getTrendingMovies("trending/movie/week"));
    dispatch(getUpcomingMovies("movie/upcoming"));
    dispatch(getTopRatedMovies("movie/upcoming"));
    dispatch(getNowPlayingMovies("movie/now_playing"));
    dispatch(getPopularMovies("movie/popular"));
    // TV Shows Data
    dispatch(getTVShows("discover/tv"));
    dispatch(getTrendingTVShows("trending/tv/week"));
    dispatch(getAiringTVShows("tv/airing_today"));
    dispatch(getTopRatedTVShows("tv/top_rated"));
    dispatch(getPopularTVShows("tv/popular"));
    // Certificates Data
    dispatch(getMovieCertificates("certification/movie/list"));
    dispatch(getTVShowCertificates("certification/tv/list"));
    // Genres Data
    dispatch(getMovieGenres("genre/movie/list"));
    dispatch(getTVShowGenres("genre/tv/list"));
    // Languages Data
    dispatch(getLanguages("configuration/languages"));
  }, [dispatch]);

  console.groupCollapsed()
  console.log(
    "Movies Data:",
    movies,
    trendingMovies,
    upcomingMovies,
    topRatedMovies,
    nowPlayingMovies,
    popularMovies
  );
  console.log();
  console.log(
    "TV Shows Data:",
    tvShows,
    trendingTVShows,
    airingTVShows,
    topRatedTVShows,
    popularTVShows
  );
  console.log();
  console.log("Languages Data:", languages);
  console.log();
  console.log("Genres Data:", movieGenres, tvShowGenres);
  console.log();
  console.log("Certificates Data:", movieCertificate, tvShowCertificate);
  console.groupEnd();
  return <></>;
};
export default Hero;
