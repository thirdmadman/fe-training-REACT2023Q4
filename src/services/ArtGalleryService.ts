import { IArtGalleryResponseAll, IArtGalleryResponseSearch } from "../interfaces/IArtGalleryResponse";

export class ArtGalleryService {


  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async getAll() {
    const fetchRequest = await window.fetch(this.apiUrl);
    return (await fetchRequest.json()) as IArtGalleryResponseAll;
  }

  async getByQueryString(queryString: string) {
    const fetchRequest = await window.fetch(`${this.apiUrl}/search?q=${window.encodeURIComponent(queryString)}&fields=id,title,image_id,artist_display,artwork_type_title,date_display,thumbnail`);
    return (await fetchRequest.json()) as IArtGalleryResponseSearch;
  }
}