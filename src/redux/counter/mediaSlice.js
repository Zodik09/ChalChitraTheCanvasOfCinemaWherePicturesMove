import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://tmdb-proxy.adarshvishwakarma09nov2k.workers.dev";
const COMMON_PARAMS = {
  language: "en-US",
  include_adult: false,
  include_video: false,
  sort_by: "popularity.desc",
  page: 1,
};

const fetchMedia = async (path, extraParams = {}, rejectWithValue) => {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        path,
        ...COMMON_PARAMS,
        ...extraParams,
      },
    });
    return res.data;
  } catch (err) {
    console.error(`Error fetching: ${path}`, err);
    return rejectWithValue(err.message || "API error");
  }
};


// All Trending
export const fetchTrendingAll = createAsyncThunk("media/trendingAll", async (_, thunkAPI) => {
  const data = await fetchMedia("trending/all/week", {}, thunkAPI.rejectWithValue);
  return data.results;
});
// Movies Certificates
export const fetchMoviesCertificate = createAsyncThunk("media/moviesCertificate", async (_, thunkAPI) => {
  const data = await fetchMedia("certification/movie/list", {}, thunkAPI.rejectWithValue);
  return data.certifications;
});
// New Movies
export const fetchNewMovies = createAsyncThunk("media/newMovies", async (_, thunkAPI) => {
  const data = await fetchMedia("discover/movie", { "release_date.lte": "2025-04-01" }, thunkAPI.rejectWithValue);
  return data.results;
});
// Trending Movies
export const fetchTrendingMovies = createAsyncThunk("media/trendingMovies", async (_, thunkAPI) => {
  const data = await fetchMedia("trending/movie/week", {}, thunkAPI.rejectWithValue);
  return data.results;
});
// Top Rated Movies
export const fetchTopRatedMovies = createAsyncThunk("media/topRatedMovies", async (_, thunkAPI) => {
  const data = await fetchMedia("movie/top_rated", {}, thunkAPI.rejectWithValue);
  return data.results;
});
// Upcoming Movies
export const fetchUpcomingMovies = createAsyncThunk("media/upcomingMovies", async (_, thunkAPI) => {
  const data = await fetchMedia("movie/upcoming", {}, thunkAPI.rejectWithValue);
  return data.results;
});
// Now Playing Movies
export const fetchNowPlayingMovies = createAsyncThunk("media/nowPlayingMovies", async (_, thunkAPI) => {
  const data = await fetchMedia("movie/now_playing", {}, thunkAPI.rejectWithValue);
  return data.results;
});
// Popular Movies
export const fetchPopularMovies = createAsyncThunk("media/popularMovies", async (_, thunkAPI) => {
  const data = await fetchMedia("movie/popular", {}, thunkAPI.rejectWithValue);
  return data.results;
});

// TV Shows Certificates
export const fetchTVShowsCertificate = createAsyncThunk("media/tvShowsCertificate", async (_, thunkAPI) => {
  const data = await fetchMedia("certification/tv/list", {}, thunkAPI.rejectWithValue);
  return data.certifications;
});
// New TV Shows
export const fetchNewTVShows = createAsyncThunk("media/newTVShows", async (_, thunkAPI) => {
  const data = await fetchMedia("discover/tv", { "first_air_date.lte": "2025-04-01" }, thunkAPI.rejectWithValue);
  return data.results;
});
// Trending TV Shows
export const fetchTrendingTV = createAsyncThunk("media/trendingTV", async (_, thunkAPI) => {
  const data = await fetchMedia("trending/tv/week", {}, thunkAPI.rejectWithValue);
  return data.results;
});
// Top Rated TV Shows
export const fetchTopRatedTVShows = createAsyncThunk("media/topRatedTVShows", async (_, thunkAPI) => {
  const data = await fetchMedia("tv/top_rated", {}, thunkAPI.rejectWithValue);
  return data.results;
});
// Popular TV Shows
export const fetchPopularTVShows = createAsyncThunk("media/popularTVShows", async (_, thunkAPI) => {
  const data = await fetchMedia("tv/popular", {}, thunkAPI.rejectWithValue);
  return data.results;
});
// Airing TV Shows
export const fetchAiringTodayTV = createAsyncThunk("media/airingTodayTV", async (_, thunkAPI) => {
  const data = await fetchMedia("tv/airing_today", {}, thunkAPI.rejectWithValue);
  return data.results;
});

// Initial state
const initialState = {
  trendingAll: [],
  moviesCertificate: [],
  newMovies: [],
  trendingMovies: [],
  topRatedMovies: [],
  nowPlayingMovies: [],
  upcomingMovies: [],
  popularMovies: [],
  tvShowsCertificate: [],
  newTVShows: [],
  trendingTV: [],
  topRatedTVShows: [],
  airingTodayTV: [],
  popularTVShows: [],
  isLoading: false,
  error: null,
};

// Helper function to handle common builder logic
const addMediaCase = (builder, thunk, key) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state[key] = action.payload || [];
    })
    .addCase(thunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || `Failed to fetch ${key}.`;
    });
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addMediaCase(builder, fetchTrendingAll, "trendingAll");
    addMediaCase(builder, fetchMoviesCertificate, "moviesCertificate");
    addMediaCase(builder, fetchNewMovies, "newMovies");
    addMediaCase(builder, fetchTrendingMovies, "trendingMovies");
    addMediaCase(builder, fetchTopRatedMovies, "topRatedMovies");
    addMediaCase(builder, fetchUpcomingMovies, "upcomingMovies");
    addMediaCase(builder, fetchNowPlayingMovies, "nowPlayingMovies");
    addMediaCase(builder, fetchPopularMovies, "popularMovies");
    addMediaCase(builder, fetchTVShowsCertificate, "tvShowsCertificate");
    addMediaCase(builder, fetchNewTVShows, "newTVShows");
    addMediaCase(builder, fetchTrendingTV, "trendingTV");
    addMediaCase(builder, fetchTopRatedTVShows, "topRatedTVShows");
    addMediaCase(builder, fetchPopularTVShows, "popularTVShows");
    addMediaCase(builder, fetchAiringTodayTV, "airingTodayTV");
  },
});

export default mediaSlice.reducer;
