import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
});

export const { openDetails, closeDetails } = detailsSlice.actions;

export default detailsSlice.reducer;
