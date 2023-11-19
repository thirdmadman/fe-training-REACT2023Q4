import {
  useGetOneArtQuery,
  useSearchArtsQuery,
} from '../../../redux/api/apiSlice';
import { renderHookWithProviders } from '../../utils/test-utils';
import { waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { API_URL } from '../../../constants';
import {
  getArtworksResp,
  getOneArtResponseMock,
} from '../../mocks/api/getArtworksResp';
import { IPaginatedArray } from '../../../interfaces/IPaginatedArray';
import { ICardData } from '../../../interfaces/ICardData';
import {
  convertArtGalleryResponseGetOneToCard,
  convertArtGalleryResponseToCards,
} from '../../../utils/apiDataConverter';
import { IDetailedCardData } from '../../../interfaces/IDetailedCardData';

const server = setupServer();

server.listen();

describe('apiSlice', () => {
  beforeEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should return arts data', async () => {
    const reqParams = {
      searchString: '',
      paginationPage: 1,
      itemsPerPage: 10,
    };

    const searchParamsUrl = `?query[term][is_public_domain]=true&fields=id,title,image_id,artist_display,artwork_type_title,date_display,thumbnail&limit=${reqParams.itemsPerPage}&page=${reqParams.paginationPage}`;

    server.use(
      http.get(`${API_URL}/search`, ({ request }) => {
        if (request.url === `${API_URL}/search${searchParamsUrl}`) {
          return HttpResponse.json(getArtworksResp());
        }

        return HttpResponse.error();
      })
    );

    type TResult = {
      data: IPaginatedArray<ICardData> | undefined;
      isError: boolean;
      isFetching: boolean;
    };

    const expectedResult = convertArtGalleryResponseToCards(getArtworksResp());

    const { result } = renderHookWithProviders<TResult, undefined>(() => {
      const { data, isError, isFetching } = useSearchArtsQuery(reqParams);

      return { data, isError, isFetching };
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.isFetching).toBeTruthy();

    await waitFor(() =>
      expect(result.current).toStrictEqual({
        data: expectedResult,
        isFetching: false,
        isError: false,
      })
    );
  });

  it('should return arts data error', async () => {
    server.use(http.get(`${API_URL}/*`, () => HttpResponse.error()));

    type TResult = {
      data: IPaginatedArray<ICardData> | undefined;
      isError: boolean;
      isFetching: boolean;
    };

    const { result } = renderHookWithProviders<TResult, undefined>(() => {
      const { data, isError, isFetching } = useSearchArtsQuery({
        searchString: '',
        paginationPage: 1,
        itemsPerPage: 10,
      });

      return { data, isError, isFetching };
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.isFetching).toBeTruthy();

    await waitFor(() =>
      expect(result.current).toStrictEqual({
        data: undefined,
        isFetching: false,
        isError: true,
      })
    );
  });

  it('should return one art data error', async () => {
    server.use(http.get(`${API_URL}/*`, () => HttpResponse.error()));

    type TResult = {
      data: IDetailedCardData | undefined;
      isError: boolean;
      isFetching: boolean;
    };

    const { result } = renderHookWithProviders<TResult, undefined>(() => {
      const { data, isError, isFetching } = useGetOneArtQuery(-1);

      return { data, isError, isFetching };
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.isFetching).toBeTruthy();

    await waitFor(() =>
      expect(result.current).toStrictEqual({
        data: undefined,
        isFetching: false,
        isError: true,
      })
    );
  });

  it('should return one art data', async () => {
    const artId = 1;
    server.use(
      http.get(`${API_URL}/${artId}`, () =>
        HttpResponse.json(getOneArtResponseMock())
      )
    );

    type TResult = {
      data: IDetailedCardData | undefined;
      isError: boolean;
      isFetching: boolean;
    };

    const { result } = renderHookWithProviders<TResult, undefined>(() => {
      const { data, isError, isFetching } = useGetOneArtQuery(artId);

      return { data, isError, isFetching };
    });

    const expectedResult = convertArtGalleryResponseGetOneToCard(
      getOneArtResponseMock()
    );

    expect(result.current.data).toBeUndefined();
    expect(result.current.isFetching).toBeTruthy();

    await waitFor(() =>
      expect(result.current).toStrictEqual({
        data: expectedResult,
        isFetching: false,
        isError: false,
      })
    );
  });
});
