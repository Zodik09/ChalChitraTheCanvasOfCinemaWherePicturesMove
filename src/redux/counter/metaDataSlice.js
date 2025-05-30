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

// Movie Genres
export const fetchMovieGenres = createAsyncThunk("metaData/movieGenres", async (_, thunkAPI) => {
  const data = await fetchMedia("genre/movie/list", {}, thunkAPI.rejectWithValue);
  return data.genres;
});
// TV Show Genres
export const fetchTVShowGenres = createAsyncThunk("metaData/tvShowGenres", async (_, thunkAPI) => {
  const data = await fetchMedia("genre/tv/list", {}, thunkAPI.rejectWithValue);
  return data.genres;
});
// Languages
export const fetchLanguages = createAsyncThunk("metaData/languages", async (_, thunkAPI) => {
  const data = await fetchMedia("configuration/languages", {}, thunkAPI.rejectWithValue);
  console.log(data)
  return data;
});

// Initial state
const initialState = {
  movieGenres: [],
  tvShowGenres: [],
  languages: [],
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

const metaData = createSlice({
  name: "metaData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addMediaCase(builder, fetchMovieGenres, "movieGenres");
    addMediaCase(builder, fetchTVShowGenres, "tvShowGenres");
    addMediaCase(builder, fetchLanguages, "languages");
  },
});

export default metaData.reducer;
