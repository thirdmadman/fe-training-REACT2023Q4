import { API_URL } from '../constants';
import { ArtGalleryService } from '../services/ArtGalleryService';
import { convertArtGalleryResponseGetOneToCard } from './apiDataConverter';

export async function loadCardData(id: string) {
  const artGalleryService = new ArtGalleryService(API_URL);
  const result = await artGalleryService.getOneById(parseInt(id, 10));

  return convertArtGalleryResponseGetOneToCard(result);
}
