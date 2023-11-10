import { createSearchParams } from 'react-router-dom';
import { CARDS_COUNT_PER_PAGE } from '../constants';

export interface IMainSearchParams {
  searchString: string;
  pageNumber: number;
  itemsPerPage: number;
}

export const mergeSearchParams = (
  urlParams: IMainSearchParams,
  stateParams: IMainSearchParams
) => {
  let isUpdateNeeded = false;
  const newSearchParams = createSearchParams();

  if (
    urlParams.searchString !== stateParams.searchString ||
    urlParams.pageNumber !== stateParams.pageNumber ||
    urlParams.itemsPerPage !== stateParams.itemsPerPage
  ) {
    isUpdateNeeded = true;

    if (urlParams.searchString.length > 0) {
      newSearchParams.set('search', urlParams.searchString);
    }

    if (urlParams.pageNumber > 1) {
      newSearchParams.set('page', urlParams.pageNumber.toString());
    }

    if (urlParams.itemsPerPage !== CARDS_COUNT_PER_PAGE) {
      newSearchParams.set('count', urlParams.itemsPerPage.toString());
    }

    if (urlParams.searchString !== stateParams.searchString) {
      if (stateParams.searchString.length > 0) {
        newSearchParams.set('search', stateParams.searchString);
      } else {
        newSearchParams.delete('search');
      }
    }

    if (urlParams.pageNumber !== stateParams.pageNumber) {
      if (stateParams.pageNumber > 1) {
        newSearchParams.set('page', stateParams.pageNumber.toString());
      } else {
        newSearchParams.delete('page');
      }
    }

    if (urlParams.itemsPerPage !== stateParams.itemsPerPage) {
      if (stateParams.itemsPerPage !== CARDS_COUNT_PER_PAGE) {
        newSearchParams.set('count', stateParams.itemsPerPage.toString());
      } else {
        newSearchParams.delete('count');
      }
    }
  }

  return {
    isUpdateNeeded,
    newSearchParams,
  };
};
