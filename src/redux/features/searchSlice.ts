import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CARDS_COUNT_PER_PAGE } from '../../constants';
import { HYDRATE } from 'next-redux-wrapper';

export interface ISearchState {
  searchString: string;
  paginationPage: number;
  itemsPerPage: number;
}

export const initialState: ISearchState = {
  searchString: '',
  paginationPage: 1,
  itemsPerPage: CARDS_COUNT_PER_PAGE,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeSearchString: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        searchString: action.payload,
        paginationPage: initialState.paginationPage,
      };
    },
    changePaginationPage: (state, action: PayloadAction<number>) => {
      state.paginationPage = action.payload;
    },
    changeItemsPerPage: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        itemsPerPage: action.payload,
        paginationPage: initialState.paginationPage,
      };
    },
    changeSearch: (state, action: PayloadAction<ISearchState>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.search,
      };
    },
  },
});

export const {
  changeSearchString,
  changePaginationPage,
  changeItemsPerPage,
  changeSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
