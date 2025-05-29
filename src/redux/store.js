import { configureStore } from "@reduxjs/toolkit";
// import moviesReducer from "./counter/moviesSlice";
// import tvShowsReducer from "./counter/tvShowsSlice";
// import genresReducer from "./counter/genresSlice";
// import languagesReducer from "./counter/languagesSlice";
import mediaReducer from "./counter/mediaSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
 whitelist: ["media"], // ✅ Only persist these reducers
//  whitelist: ["movies", "tvShows", "genres", "languages"], // ✅ Only persist these reducers
};

const rootReducer = combineReducers({
 media: mediaReducer
});
// const rootReducer = combineReducers({
//   movies: moviesReducer,
//   tvShows: tvShowsReducer,
//   genres: genresReducer,
//   languages: languagesReducer,
// });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
