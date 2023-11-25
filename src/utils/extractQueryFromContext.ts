import { ParsedUrlQuery } from 'querystring';

export interface UrlQueryForPage extends ParsedUrlQuery {
  search?: string;
  page?: string;
  count?: string;
}

export const extractQueryFromContext = (query: ParsedUrlQuery) => {
  const queryTyped = query as UrlQueryForPage;

  const querySearchString = queryTyped?.search;
  const queryPaginationPage = queryTyped?.page
    ? parseInt(queryTyped.page, 10)
    : undefined;
  const queryItemsPerPage = queryTyped?.count
    ? parseInt(queryTyped.count, 10)
    : undefined;

  const searchArtsQuery = {
    searchString: querySearchString || '',
    paginationPage: queryPaginationPage || 1,
    itemsPerPage: queryItemsPerPage || 12,
  };

  return searchArtsQuery;
};
