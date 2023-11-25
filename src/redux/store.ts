import searchReducer, { searchSlice } from './features/searchSlice';
import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import detailsReducer, { detailsSlice } from './features/detailsSlice';
import { createWrapper } from 'next-redux-wrapper';

const reducers = {
  [searchSlice.name]: searchReducer,
  [detailsSlice.name]: detailsReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    preloadedState,
  });
}

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

// export an assembled wrapper
export const wrapper = createWrapper(() => store, {debug: false});