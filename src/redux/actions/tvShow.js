import axios from "../../utils/Axios";
import {
  loadTVShows,
  loadTrendingTVShows,
  loadAiringTVShows,
  loadTopRatedTVShows,
  loadPopularTVShows
} from "../slices/tvShow";

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

export const getTVShows = (path, extraParams = {}) =>
  fetchAndDispatch(path, extraParams, loadTVShows);

export const getTrendingTVShows = (path, extraParams = {}) =>
  fetchAndDispatch(path, extraParams, loadTrendingTVShows);

export const getAiringTVShows = (path, extraParams = {}) =>
  fetchAndDispatch(path, extraParams, loadAiringTVShows);

export const getTopRatedTVShows = (path, extraParams = {}) =>
  fetchAndDispatch(path, extraParams, loadTopRatedTVShows);

export const getPopularTVShows = (path, extraParams = {}) =>
  fetchAndDispatch(path, extraParams, loadPopularTVShows);
