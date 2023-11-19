import { CARDS_COUNT_PER_PAGE } from '../../constants';
import {
  IMainSearchParams,
  mergeSearchParams,
} from '../../utils/mergeSearchParams';

describe('mergeSearchParams test', () => {
  it('should return isUpdateNeeded as false and newSearchParams as empty if both params are identical', () => {
    const urlParams: IMainSearchParams = {
      searchString: 'test',
      pageNumber: 1,
      itemsPerPage: CARDS_COUNT_PER_PAGE,
    };
    const stateParams: IMainSearchParams = { ...urlParams };

    const result = mergeSearchParams(urlParams, stateParams);

    expect(result.isUpdateNeeded).toBe(false);
    expect(result.newSearchParams.toString()).toBe('');
  });

  it('should return isUpdateNeeded as true and newSearchParams with updated values', () => {
    const urlParams: IMainSearchParams = {
      searchString: 'test',
      pageNumber: 2,
      itemsPerPage: CARDS_COUNT_PER_PAGE,
    };
    const stateParams: IMainSearchParams = {
      searchString: 'different',
      pageNumber: 1,
      itemsPerPage: CARDS_COUNT_PER_PAGE,
    };

    const result = mergeSearchParams(urlParams, stateParams);

    expect(result.isUpdateNeeded).toBe(true);
    expect(result.newSearchParams.toString()).toBe('search=different');
  });

  it('should handle searchString, pageNumber, and itemsPerPage changes separately', () => {
    const urlParams: IMainSearchParams = {
      searchString: 'new-search',
      pageNumber: 3,
      itemsPerPage: 20,
    };
    const stateParams: IMainSearchParams = {
      searchString: 'old-search',
      pageNumber: 2,
      itemsPerPage: CARDS_COUNT_PER_PAGE,
    };

    const result = mergeSearchParams(urlParams, stateParams);

    expect(result.isUpdateNeeded).toBe(true);
    expect(result.newSearchParams.toString()).toBe('search=old-search&page=2');
  });
});
