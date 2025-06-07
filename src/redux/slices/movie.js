import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  trendingMovies: [],
  upcomingMovies: [],
  topRatedMovies: [],
  nowPlayingMovies: [],
  popularMovies: [],
};

const movie = createSlice({
  name: "Movies",
  initialState,
  reducers: {
    loadMovies: (state, action) => {
      state.movies = action.payload;
    },
    loadTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    loadUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    loadTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    loadNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    loadPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    }
  },
});

export const {
  loadMovies,
  loadTrendingMovies,
  loadUpcomingMovies,
  loadTopRatedMovies,
  loadNowPlayingMovies,
  loadPopularMovies
} = movie.actions;

export default movie.reducer;
