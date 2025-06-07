import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  languages: [],
};

const languages = createSlice({
  name: "languages",
  initialState,
  reducers: {
    loadLanguages: (state, action) => {
      state.languages = action.payload;
    },
  },
});

export const { loadLanguages } = languages.actions;

export default languages.reducer;
