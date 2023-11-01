import { IArtGalleryResponseSearch } from '../interfaces/IArtGalleryResponse';

const PUBLIC_DOMAIN = 'query[term][is_public_domain]=true';
const QUERY_FIELDS =
  'fields=id,title,image_id,artist_display,artwork_type_title,date_display,thumbnail';
const QUERY_LIMIT = 'limit=12';

export class ArtGalleryService {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  private async getArtGalleryData(
    queryString: string | null = null,
    page: number = 1
  ) {
    const queryUrlString = queryString
      ? `&q=${window.encodeURIComponent(queryString)}`
      : '';

    const fetchRequest = await window.fetch(
      `${this.apiUrl}/search?${PUBLIC_DOMAIN}${queryUrlString}&${QUERY_FIELDS}&${QUERY_LIMIT}&page=${page}`
    );

    return (await fetchRequest.json()) as IArtGalleryResponseSearch;
  }

  async getAll(page: number) {
    return this.getArtGalleryData(null, page);
  }

  async getByQueryString(queryString: string, page: number) {
    return this.getArtGalleryData(queryString, page);
  }
}
