import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { COUNTRIES } from '../../constants';

export interface ICountryData {
  name: string;
  code: string;
}

export interface ICountriesState {
  countries: Array<ICountryData>;
}

export const initialState: ICountriesState = {
  countries: COUNTRIES,
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    pushNewCountry: (state, action: PayloadAction<ICountryData>) => {
      state.countries.push(action.payload);
    },
  },
});

export const { pushNewCountry } = countriesSlice.actions;

export default countriesSlice.reducer;
