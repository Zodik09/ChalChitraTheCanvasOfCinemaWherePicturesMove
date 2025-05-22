import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNewMovies = createAsyncThunk(
    "media/fetchMovies",
    async () => {
        try {
            const res = await axios.get("https://tmdb-proxy.adarshvishwakarma09nov2k.workers.dev", {
                params: {
                    path: "discover/movie",
                    include_adult: false,
                    include_video: false,
                    page: 5,
                    sort_by: "popularity.desc",
                    "release_date.lte": "2025-04-01",
                    language: "en-US",
                },
            });
            return res.data.results;
        } catch (err) {
            console.error("Worker fetch failed", err);
        }
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        loadMovies: false,
        errorMovies: null,
        movies: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewMovies.pending, (state) => {
                state.loadMovies = true;
                state.errorMovies = null;
            })
            .addCase(fetchNewMovies.fulfilled, (state, action) => {
                state.movies = action.payload;
                state.loadMovies = false;
            })
            .addCase(fetchNewMovies.rejected, (state, action) => {
                state.errorMovies = action.error.message;
                state.loadMovies = false;
            })
    },
});

export default moviesSlice.reducer;
