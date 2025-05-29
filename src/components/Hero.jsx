import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import {
  fetchNewMovies,
  fetchNewTVShows,
  fetchTopRatedMovies,
  fetchTopRatedTVShows,
  fetchTrendingAll,
  fetchTrendingMovies,
  fetchTrendingTV,
  fetchUpcomingMovies,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchPopularTVShows,
  fetchAiringTodayTV,
} from "../redux/counter/mediaSlice";

const Hero = () => {
  const dispatch = useDispatch();

  // Extracting all media data from Redux state
  const {
    newMovies,
    newTVShows,
    topRatedMovies,
    topRatedTVShows,
    trendingAll,
    trendingMovies,
    trendingTV,
    upcomingMovies,
    nowPlayingMovies,
    popularMovies,
    popularTVShows,
    airingTodayTV,
    isLoading,
    error,
  } = useSelector((state) => state.media);

  useEffect(() => {
    // Dispatching all API calls to fetch data
    dispatch(fetchNewMovies());
    dispatch(fetchNewTVShows());
    dispatch(fetchTopRatedMovies());
    dispatch(fetchTopRatedTVShows());
    dispatch(fetchTrendingAll());
    dispatch(fetchTrendingMovies());
    dispatch(fetchTrendingTV());
    dispatch(fetchUpcomingMovies());
    dispatch(fetchNowPlayingMovies());
    dispatch(fetchPopularMovies());
    dispatch(fetchPopularTVShows());
    dispatch(fetchAiringTodayTV());
  }, [dispatch]);

  // Log all fetched data
  useEffect(() => {
    if (!isLoading && !error) {
      console.log("New Movies:", newMovies);
      console.log("New TV Shows:", newTVShows);
      console.log("Top Rated Movies:", topRatedMovies);
      console.log("Top Rated TV Shows:", topRatedTVShows);
      console.log("Trending All:", trendingAll);
      console.log("Trending Movies:", trendingMovies);
      console.log("Trending TV:", trendingTV);
      console.log("Upcoming Movies:", upcomingMovies);
      console.log("Now Playing Movies:", nowPlayingMovies);
      console.log("Popular Movies:", popularMovies);
      console.log("Popular TV Shows:", popularTVShows);
      console.log("Airing Today TV Shows:", airingTodayTV);
    } else if (error) {
      console.error("Error fetching data:", error);
    }
  }, [
    isLoading,
    error,
    newMovies,
    newTVShows,
    topRatedMovies,
    topRatedTVShows,
    trendingAll,
    trendingMovies,
    trendingTV,
    upcomingMovies,
    nowPlayingMovies,
    popularMovies,
    popularTVShows,
    airingTodayTV,
  ]);

  return (
    <div className="hero-container">
      {/* This is where you'll use the data to display */}
      <h1>Welcome to ChalChitra!</h1>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : (
        <div>
          {/* You can replace these with actual UI components to display data */}
          <div>
            <h2>New Movies</h2>
            <ul>
              {newMovies.map((movie) => (
                <li key={movie.id}>{movie.title}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie) => (
                <li key={movie.id}>{movie.title}</li>
              ))}
            </ul>
          </div>
          {/* Add more sections for other data like Popular TV Shows, Top Rated Movies, etc */}
        </div>
      )}
    </div>
  );
};

export default Hero;
