import { CARDS_COUNT_PER_PAGE } from '../constants';
import {
  IArtGalleryResponseGetOne,
  IArtGalleryResponseSearch,
} from '../interfaces/IArtGalleryResponse';

const PUBLIC_DOMAIN = 'query[term][is_public_domain]=true';
const QUERY_FIELDS =
  'fields=id,title,image_id,artist_display,artwork_type_title,date_display,thumbnail';

export class ArtGalleryService {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  private async getArtGalleryData(
    queryString: string | null = null,
    page: number = 1,
    limit: number = CARDS_COUNT_PER_PAGE
  ) {
    const queryUrlString = queryString
      ? `&q=${window.encodeURIComponent(queryString)}`
      : '';

    const fetchRequest = await window.fetch(
      `${this.apiUrl}/search?${PUBLIC_DOMAIN}${queryUrlString}&${QUERY_FIELDS}&limit=${limit}&page=${page}`
    );

    return (await fetchRequest.json()) as IArtGalleryResponseSearch;
  }

  async getAll(page: number, limit: number) {
    return this.getArtGalleryData(null, page, limit);
  }

  async getByQueryString(queryString: string, page: number, limit: number) {
    return this.getArtGalleryData(queryString, page, limit);
  }

  async getOneById(id: number) {
    const fetchRequest = await window.fetch(`${this.apiUrl}/${id}`);

    return (await fetchRequest.json()) as IArtGalleryResponseGetOne;
  }
}
