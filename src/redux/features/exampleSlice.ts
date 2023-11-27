import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IExampleState {
  isLoading: boolean;
}

export const initialState: IExampleState = {
  isLoading: false,
};

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = exampleSlice.actions;

export default exampleSlice.reducer;
