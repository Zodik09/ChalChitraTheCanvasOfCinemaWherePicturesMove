import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNewTVShows = createAsyncThunk(
  "media/fetchTVShows",
  async () => {
    try {
      const res = await axios.get("https://tmdb-proxy.adarshvishwakarma09nov2k.workers.dev", {
        params: {
                    path: "discover/tv",
                    include_adult: false,
                    page: 1,
                    sort_by: "popularity.desc",
                    include_null_first_air_dates: false,
                    language: "en-US",
                },
      });
      return res.data.results;
    } catch (err) {
      console.error("Worker fetch failed", err);
    }
  }
);

const tvShowsSlice = createSlice({
  name: 'tvShows',
  initialState: {
    loadTVShows: false,
    errorTVShows: null,
    tvShows: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewTVShows.pending, (state) => {
        state.loadTVShows = true;
        state.errorTVShows = null;
      })
      .addCase(fetchNewTVShows.fulfilled, (state, action) => {
        state.tvShows = action.payload;
        state.loadTVShows = false;
      })
      .addCase(fetchNewTVShows.rejected, (state, action) => {
        state.errorTVShows = action.error.message;
        state.loadTVShows = false;
      });
  },
});

export default tvShowsSlice.reducer;
