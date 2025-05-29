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
    return res.data.results;
  } catch (err) {
    console.error(`Error fetching: ${path}`, err);
    return rejectWithValue(err.message || "API error");
  }
};

// All async thunks
export const fetchNewMovies = createAsyncThunk("media/newMovies", (_, thunkAPI) =>
  fetchMedia("discover/movie", { "release_date.lte": "2025-04-01" }, thunkAPI.rejectWithValue)
);

export const fetchNewTVShows = createAsyncThunk("media/newTVShows", (_, thunkAPI) =>
  fetchMedia("discover/tv", { "first_air_date.lte": "2025-04-01" }, thunkAPI.rejectWithValue)
);

export const fetchTopRatedMovies = createAsyncThunk("media/topRatedMovies", (_, thunkAPI) =>
  fetchMedia("movie/top_rated", {}, thunkAPI.rejectWithValue)
);

export const fetchTopRatedTVShows = createAsyncThunk("media/topRatedTVShows", (_, thunkAPI) =>
  fetchMedia("tv/top_rated", {}, thunkAPI.rejectWithValue)
);

export const fetchTrendingAll = createAsyncThunk("media/trendingAll", (_, thunkAPI) =>
  fetchMedia("trending/all/week", {}, thunkAPI.rejectWithValue)
);

export const fetchTrendingMovies = createAsyncThunk("media/trendingMovies", (_, thunkAPI) =>
  fetchMedia("trending/movie/week", {}, thunkAPI.rejectWithValue)
);

export const fetchTrendingTV = createAsyncThunk("media/trendingTV", (_, thunkAPI) =>
  fetchMedia("trending/tv/week", {}, thunkAPI.rejectWithValue)
);

export const fetchUpcomingMovies = createAsyncThunk("media/upcomingMovies", (_, thunkAPI) =>
  fetchMedia("movie/upcoming", {}, thunkAPI.rejectWithValue)
);

export const fetchNowPlayingMovies = createAsyncThunk("media/nowPlayingMovies", (_, thunkAPI) =>
  fetchMedia("movie/now_playing", {}, thunkAPI.rejectWithValue)
);

export const fetchPopularMovies = createAsyncThunk("media/popularMovies", (_, thunkAPI) =>
  fetchMedia("movie/popular", {}, thunkAPI.rejectWithValue)
);

export const fetchPopularTVShows = createAsyncThunk("media/popularTVShows", (_, thunkAPI) =>
  fetchMedia("tv/popular", {}, thunkAPI.rejectWithValue)
);

export const fetchAiringTodayTV = createAsyncThunk("media/airingTodayTV", (_, thunkAPI) =>
  fetchMedia("tv/airing_today", {}, thunkAPI.rejectWithValue)
);

// Initial state
const initialState = {
  newMovies: [],
  newTVShows: [],
  topRatedMovies: [],
  topRatedTVShows: [],
  trendingAll: [],
  trendingMovies: [],
  trendingTV: [],
  upcomingMovies: [],
  nowPlayingMovies: [],
  popularMovies: [],
  popularTVShows: [],
  airingTodayTV: [],
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
    addMediaCase(builder, fetchNewMovies, "newMovies");
    addMediaCase(builder, fetchNewTVShows, "newTVShows");
    addMediaCase(builder, fetchTopRatedMovies, "topRatedMovies");
    addMediaCase(builder, fetchTopRatedTVShows, "topRatedTVShows");
    addMediaCase(builder, fetchTrendingAll, "trendingAll");
    addMediaCase(builder, fetchTrendingMovies, "trendingMovies");
    addMediaCase(builder, fetchTrendingTV, "trendingTV");
    addMediaCase(builder, fetchUpcomingMovies, "upcomingMovies");
    addMediaCase(builder, fetchNowPlayingMovies, "nowPlayingMovies");
    addMediaCase(builder, fetchPopularMovies, "popularMovies");
    addMediaCase(builder, fetchPopularTVShows, "popularTVShows");
    addMediaCase(builder, fetchAiringTodayTV, "airingTodayTV");
  },
});

export default mediaSlice.reducer;
