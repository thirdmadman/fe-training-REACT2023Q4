import reducer, {
  changeSearchString,
  changePaginationPage,
  changeItemsPerPage,
  changeSearch,
  initialState,
} from '../../../redux/features/searchSlice';

describe('searchSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle changeSearchString', () => {
    expect(reducer(undefined, changeSearchString('Test string'))).toEqual({
      ...initialState,
      searchString: 'Test string',
    });
  });

  it('should handle changePaginationPage', () => {
    expect(reducer(undefined, changePaginationPage(2))).toEqual({
      ...initialState,
      paginationPage: 2,
    });
  });

  it('should handle changeItemsPerPage', () => {
    expect(reducer(undefined, changeItemsPerPage(40))).toEqual({
      ...initialState,
      itemsPerPage: 40,
    });
  });

  it('should handle changeItemsPerPage', () => {
    const searchState = {
      searchString: 'TEST',
      paginationPage: 999,
      itemsPerPage: -1,
    };

    expect(reducer(undefined, changeSearch(searchState))).toEqual(searchState);
  });
});
