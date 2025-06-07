import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tvShows: [],
  trendingTVShows: [],
  airingTVShows: [],
  topRatedTVShows: [],
  popularTVShows: [],
};

const tvShow = createSlice({
  name: "tvShows",
  initialState,
  reducers: {
    loadTVShows: (state, action) => {
      state.tvShows = action.payload;
    },
    loadTrendingTVShows: (state, action) => {
      state.trendingTVShows = action.payload;
    },
    loadAiringTVShows: (state, action) => {
      state.airingTVShows = action.payload;
    },
    loadTopRatedTVShows: (state, action) => {
      state.topRatedTVShows = action.payload;
    },
    loadPopularTVShows: (state, action) => {
      state.popularTVShows = action.payload;
    },
  },
});

export const {
  loadTVShows,
  loadTrendingTVShows,
  loadAiringTVShows,
  loadTopRatedTVShows,
  loadPopularTVShows
} = tvShow.actions;

export default tvShow.reducer;
