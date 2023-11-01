import {
  IArtGalleryResponseAll,
  IArtGalleryResponseSearch,
} from '../interfaces/IArtGalleryResponse';
import { ICardData } from '../interfaces/ICardData';
import { IPaginatedArray } from '../interfaces/IPaginatedArray';

export function convertArtGalleryResponseToCards(
  response: IArtGalleryResponseAll | IArtGalleryResponseSearch
) {
  const imagesApiUrl = response.config.iiif_url;
  const imagesApiUrlParams = '/full/843,/0/default.jpg';

  const cardsData = response.data.map((el) => {
    const cardData: ICardData = {
      title: el.title,
      artistDisplay: el.artist_display,
      artworkTypeTitle: el.artwork_type_title,
      dateDisplay: el.date_display,
      imageUrl: `${imagesApiUrl}/${el.image_id}${imagesApiUrlParams}`,
      imagePlaceholder: el.thumbnail?.lqip || null,
      id: el.id,
    };

    return cardData;
  });

  const paginatedArray: IPaginatedArray<ICardData> = {
    array: cardsData,
    pageSize: response.pagination.limit,
    currentPage: response.pagination.current_page,
    size: response.pagination.total,
  };

  return paginatedArray;
}
