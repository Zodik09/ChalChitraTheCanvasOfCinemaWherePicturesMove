import axios from "../../utils/Axios";
import { loadMovieGenres, loadTVShowGenres } from "../slices/genres";

const fetchAndDispatch =
  (path, extraParams, actionCreator) => async (dispatch) => {
    try {
      const res = await axios.get(path, {
        params: {
          path,
          ...extraParams,
        },
      });
      dispatch(actionCreator(res.data.genres));
    } catch (error) {
      console.error(`Error fetching: ${path}`, error.message);
    }
  };

export const getMovieGenres = (path, extraParams = {}) =>
  fetchAndDispatch(path, extraParams, loadMovieGenres);

export const getTVShowGenres = (path, extraParams = {}) =>
  fetchAndDispatch(path, extraParams, loadTVShowGenres);
