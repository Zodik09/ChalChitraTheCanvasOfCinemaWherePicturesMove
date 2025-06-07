import axios from "../../utils/Axios";
import {
  loadMovieCertificate,
  loadTVShowCertificate,
} from "../slices/certificates";

const fetchAndDispatch =
  (path, extraParams, actionCreator) => async (dispatch) => {
    try {
      const res = await axios.get(path, {
        params: {
          path,
          ...extraParams,
        },
      });
      dispatch(actionCreator(res.data.certifications));
    } catch (error) {
      console.error(`Error fetching: ${path}`, error.message);
    }
  };

export const getMovieCertificates = (path, extraParams = {}) =>
  fetchAndDispatch(path, extraParams, loadMovieCertificate);

export const getTVShowCertificates = (path, extraParams = {}) =>
  fetchAndDispatch(path, extraParams, loadTVShowCertificate);
