import { API_URL, CARDS_COUNT_PER_PAGE } from '../constants';
import { IArtGalleryResponseSearch } from '../interfaces/IArtGalleryResponse';
import { ArtGalleryService } from '../services/ArtGalleryService';
import { convertArtGalleryResponseToCards } from './apiDataConverter';

export async function loadCardsData(
  query: string | null = null,
  page: number = 1,
  cardsPerPageCount: number = CARDS_COUNT_PER_PAGE
) {
  const artGalleryService = new ArtGalleryService(API_URL);

  let response: IArtGalleryResponseSearch | null = null;

  if (query === null || query === '') {
    response = await artGalleryService.getAll(page, cardsPerPageCount);
  } else {
    response = await artGalleryService.getByQueryString(
      query,
      page,
      cardsPerPageCount
    );
  }
  return response ? convertArtGalleryResponseToCards(response) : null;
}
