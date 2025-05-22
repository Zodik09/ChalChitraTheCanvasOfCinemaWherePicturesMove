import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import { combineReducers } from "redux";
import moviesReducer from './counter/moviesSlice'
import tvShowsReducer from './counter/tvShowsSlice'

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["movies", "tvShows"], // ✅ Only persist these reducers
};

const rootReducer = combineReducers({
  movies: moviesReducer,
  tvShows: tvShowsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist needs this
    }),
});

export const persistor = persistStore(store);
