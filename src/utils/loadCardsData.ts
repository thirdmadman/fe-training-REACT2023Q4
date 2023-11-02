import { API_URL, CARDS_COUNT_PER_PAGE } from '../constants';
import { IArtGalleryResponseSearch } from '../interfaces/IArtGalleryResponse';
import { ArtGalleryService } from '../services/ArtGalleryService';
import { convertArtGalleryResponseToCards } from './apiDataConverter';
import { saveQueryToLocalStorage } from './querySaveTools';

export async function loadCardsData(
  query: string | null = null,
  page: number = 1,
  cardsPerPageCount: number = CARDS_COUNT_PER_PAGE
) {
  const artGalleryService = new ArtGalleryService(API_URL);

  let response: IArtGalleryResponseSearch | null = null;

  let pagesParam = {};
  let cardsPerPageParam = {};
  let queryParam = {};

  if (page > 1) {
    pagesParam = { page: page.toString() };
  }

  if (cardsPerPageCount !== CARDS_COUNT_PER_PAGE) {
    cardsPerPageParam = { count: cardsPerPageCount.toString() };
  }

  if (query === null || query === '') {
    response = await artGalleryService.getAll(page, cardsPerPageCount);
    saveQueryToLocalStorage(null);
  } else {
    saveQueryToLocalStorage(query);
    queryParam = {
      search: query,
    };
    response = await artGalleryService.getByQueryString(
      query,
      page,
      cardsPerPageCount
    );
  }
  return {
    cards: convertArtGalleryResponseToCards(response),
    searchParams: { ...queryParam, ...pagesParam, ...cardsPerPageParam },
  };
}
