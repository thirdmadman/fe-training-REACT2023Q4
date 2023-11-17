import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, CARDS_COUNT_PER_PAGE } from '../../constants';
import {
  IArtGalleryResponseGetOne,
  IArtGalleryResponseSearch,
} from '../../interfaces/IArtGalleryResponse';
import {
  convertArtGalleryResponseGetOneToCard,
  convertArtGalleryResponseToCards,
} from '../../utils/apiDataConverter';
import { IPaginatedArray } from '../../interfaces/IPaginatedArray';
import { ICardData } from '../../interfaces/ICardData';
import { IDetailedCardData } from '../../interfaces/IDetailedCardData';

const PUBLIC_DOMAIN = 'query[term][is_public_domain]=true';
const QUERY_FIELDS =
  'fields=id,title,image_id,artist_display,artwork_type_title,date_display,thumbnail';

interface ISearchState {
  searchString: string;
  paginationPage: number;
  itemsPerPage: number;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    searchArts: builder.query<IPaginatedArray<ICardData>, ISearchState>({
      query: ({ searchString, paginationPage, itemsPerPage }) => {
        const pageNumber = paginationPage || 1;
        const limitNumber = itemsPerPage || CARDS_COUNT_PER_PAGE;

        const queryUrlString = searchString
          ? `&q=${window.encodeURIComponent(searchString)}`
          : '';

        return `/search?${PUBLIC_DOMAIN}${queryUrlString}&${QUERY_FIELDS}&limit=${limitNumber}&page=${pageNumber}`;
      },
      transformResponse: (response: IArtGalleryResponseSearch) => {
        return convertArtGalleryResponseToCards(response);
      },
    }),
    getOneArt: builder.query<IDetailedCardData, number>({
      query: (id: number) => `/${id}`,
      transformResponse: (response: IArtGalleryResponseGetOne) => {
        return convertArtGalleryResponseGetOneToCard(response);
      },
    }),
  }),
});

export const { useSearchArtsQuery, useGetOneArtQuery } = apiSlice;
