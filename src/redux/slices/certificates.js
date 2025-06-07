import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieCertificate: [],
  tvShowCertificate: [],
};

const certificates = createSlice({
  name: "certificates",
  initialState,
  reducers: {
    loadMovieCertificate: (state, action) => {
      state.movieCertificate = action.payload;
    },
    loadTVShowCertificate: (state, action) => {
      state.tvShowCertificate = action.payload;
    },
  },
});

export const { loadMovieCertificate, loadTVShowCertificate } =
  certificates.actions;

export default certificates.reducer;
