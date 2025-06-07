import axios from "../../utils/Axios";
import { loadLanguages } from "../slices/languages";

const fetchAndDispatch =
  (path, extraParams, actionCreator) => async (dispatch) => {
    try {
      const res = await axios.get(path, {
        params: {
          path,
          ...extraParams,
        },
      });
      dispatch(actionCreator(res.data));
    } catch (error) {
      console.error(`Error fetching: ${path}`, error.message);
    }
  };

export const getLanguages = (path, extraParams = {}) =>
  fetchAndDispatch(path, extraParams, loadLanguages);
