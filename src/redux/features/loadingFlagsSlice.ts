import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ILoadingFlagsState {
  isLoadingArts: boolean;
  isLoadingDetails: boolean;
}

export const initialState: ILoadingFlagsState = {
  isLoadingArts: false,
  isLoadingDetails: false,
};

export const loadingFlagsSlice = createSlice({
  name: 'loadingFlags',
  initialState,
  reducers: {
    setIsLoadingArts: (state, action: PayloadAction<boolean>) => {
      state.isLoadingArts = action.payload;
    },
    setIsLoadingDetails: (state, action: PayloadAction<boolean>) => {
      state.isLoadingDetails = action.payload;
    },
  },
});

export const { setIsLoadingArts, setIsLoadingDetails } =
  loadingFlagsSlice.actions;

export default loadingFlagsSlice.reducer;
