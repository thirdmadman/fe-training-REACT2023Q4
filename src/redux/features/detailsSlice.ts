import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface IDetailsState {
  openedCardId: number | null;
}

export const initialState: IDetailsState = {
  openedCardId: null,
};

export const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    openDetails: (state, action: PayloadAction<number>) => {
      state.openedCardId = action.payload;
    },
    closeDetails: (state) => {
      state.openedCardId = null;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.details,
      };
    },
  },
});

export const { openDetails, closeDetails } = detailsSlice.actions;

export default detailsSlice.reducer;
