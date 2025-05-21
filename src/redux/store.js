import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './counter/moviesSlice'

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
})