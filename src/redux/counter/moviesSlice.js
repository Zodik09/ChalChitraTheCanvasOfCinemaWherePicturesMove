import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Async thunk to fetch movies
export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async () => {
    try {
        const res = await axios.get(
          "https://tmdb-proxy.adarshvishwakarma09nov2k.workers.dev?path=discover/movie",
          {
            params: {
              path: "movie/popular",
              language: "en",
            },
          }
        );
        const data = res.data;
        console.log(data.results);
      } catch (err) {
        console.error("Worker fetch failed", err);
      }
    // return response.data.results; // assuming your data is under "results"
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    loading: false,
    movies: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
