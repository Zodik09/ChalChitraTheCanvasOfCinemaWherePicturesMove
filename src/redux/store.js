import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../redux/slices/movie";
import tvShowsReducer from "../redux/slices/tvShow";
import certificatesReducer from "../redux/slices/certificates";
import genresReducer from "../redux/slices/genres";
import languagesReducer from "../redux/slices/languages";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    tvShows: tvShowsReducer,
    certificates: certificatesReducer,
    genres: genresReducer,
    languages: languagesReducer
  },
})