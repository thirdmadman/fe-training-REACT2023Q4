import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import mainPageReducer, { mainPageSlice } from './features/mainPageSlice';
import countriesReducer, { countriesSlice } from './features/countriesSlice';

const reducers = {
  [mainPageSlice.name]: mainPageReducer,
  [countriesSlice.name]: countriesReducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: combinedReducer,
    preloadedState,
  });
}

export const store = configureStore({
  reducer: combinedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
