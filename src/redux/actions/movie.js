import axios from "../../utils/Axios";
import {
  loadMovies,
  loadTrendingMovies,
  loadUpcomingMovies,
  loadTopRatedMovies,
  loadNowPlayingMovies,
  loadPopularMovies,
} from "../slices/movie";

const fetchAndDispatch =
  (path, extraParams, actionCreator) => async (dispatch) => {
    try {
      const res = await axios.get(path, {
        params: {
          path,
          include_adult: false,
          include_video: false,
          page: 1,
          sort_by: "popularity.desc",
          "release_date.lte": "2025-04-01",
          language: "en-US",
          ...extraParams,
        },
      });
      dispatch(actionCreator(res.data.results));
    } catch (error) {
      console.error(`Error fetching: ${path}`, error.message);
    }
  };

export const getMovies = (path, extraParams = {}) =>
  fetchAndDispatch(path, extraParams, loadMovies);

export const getTrendingMovies = (path, extraParams = {}) =>
  fetchAndDispatch(path, extraParams, loadTrendingMovies);

export const getUpcomingMovies = (path, extraParams = {}) =>
  fetchAndDispatch(path, extraParams, loadUpcomingMovies);

export const getTopRatedMovies = (path, extraParams = {}) =>
  fetchAndDispatch(path, extraParams, loadTopRatedMovies);

export const getNowPlayingMovies = (path, extraParams = {}) =>
  fetchAndDispatch(path, extraParams, loadNowPlayingMovies);

export const getPopularMovies = (path, extraParams = {}) =>
  fetchAndDispatch(path, extraParams, loadPopularMovies);
