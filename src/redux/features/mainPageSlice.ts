import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFormData } from '../../interfaces/IFormData';

export type TSavedFromType = 'uncontrolled' | 'react-hook';

export interface ISavedFormData {
  fromData: IFormData;
  type: TSavedFromType;
}

export interface IMainPageState {
  formsData: Array<ISavedFormData>;
}

export const initialState: IMainPageState = {
  formsData: [],
};

export const mainPageSlice = createSlice({
  name: 'mainPage',
  initialState,
  reducers: {
    saveFormData: (state, action: PayloadAction<ISavedFormData>) => {
      state.formsData.push(action.payload);
    },
  },
});

export const { saveFormData } = mainPageSlice.actions;

export default mainPageSlice.reducer;
