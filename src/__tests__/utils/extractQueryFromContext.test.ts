import {
  extractQueryFromContext,
  UrlQueryForPage,
} from '../../utils/extractQueryFromContext';

describe('extractQueryFromContext', () => {
  it('should extract query parameters correctly', () => {
    const mockQuery: UrlQueryForPage = {
      search: 'testSearch',
      page: '2',
      count: '20',
    };

    const result = extractQueryFromContext(mockQuery);

    expect(result.searchString).toEqual('testSearch');
    expect(result.paginationPage).toEqual(2);
    expect(result.itemsPerPage).toEqual(20);
  });

  it('should handle undefined values correctly', () => {
    const mockQuery: UrlQueryForPage = {};

    const result = extractQueryFromContext(mockQuery);

    expect(result.searchString).toEqual('');
    expect(result.paginationPage).toEqual(1);
    expect(result.itemsPerPage).toEqual(12);
  });
});
