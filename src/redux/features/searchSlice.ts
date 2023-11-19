import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CARDS_COUNT_PER_PAGE } from '../../constants';
import { saveQueryToLocalStorage } from '../../utils/querySaveTools';

interface ISearchState {
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
      saveQueryToLocalStorage(action.payload);

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
      saveQueryToLocalStorage(action.payload.searchString);
      return { ...state, ...action.payload };
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
