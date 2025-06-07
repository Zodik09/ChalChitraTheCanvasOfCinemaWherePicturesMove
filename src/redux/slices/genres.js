import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieGenres: [],
  tvShowGenres: [],
};

const genres = createSlice({
  name: "genres",
  initialState,
  reducers: {
    loadMovieGenres: (state, action) => {
      state.movieGenres = action.payload;
    },
    loadTVShowGenres: (state, action) => {
      state.tvShowGenres = action.payload;
    },
  },
});

export const { loadMovieGenres, loadTVShowGenres } = genres.actions;

export default genres.reducer;
