import { IArtGalleryResponse } from "../interfaces/IArtGalleryResponse";

export class ArtGalleryService {


  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async getAll() {
    const fetchRequest = await window.fetch(this.apiUrl);
    return (await fetchRequest.json()) as IArtGalleryResponse;
  }
}