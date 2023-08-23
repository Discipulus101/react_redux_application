import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { filmAPI } from '../api/film-api';

const rootReducer = combineReducers({
  [filmAPI.reducerPath]: filmAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(filmAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
