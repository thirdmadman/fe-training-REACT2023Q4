import { API_URL } from '../constants';
import { ArtGalleryService } from '../services/ArtGalleryService';
import { convertArtGalleryResponseGetOneToCard } from './apiDataConverter';

export async function loadCardData(id: number) {
  const artGalleryService = new ArtGalleryService(API_URL);
  const result = await artGalleryService.getOneById(id);

  return convertArtGalleryResponseGetOneToCard(result);
}
