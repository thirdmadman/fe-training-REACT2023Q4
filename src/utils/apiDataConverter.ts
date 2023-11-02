import {
  IArtGalleryResponseAll,
  IArtGalleryResponseGetOne,
  IArtGalleryResponseSearch,
} from '../interfaces/IArtGalleryResponse';
import { ICardData } from '../interfaces/ICardData';
import { IDetailedCardData } from '../interfaces/IDetailedCardData';
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

export function convertArtGalleryResponseGetOneToCard(
  response: IArtGalleryResponseGetOne
) {
  const imagesApiUrl = response.config.iiif_url;
  const imagesApiUrlParams = '/full/843,/0/default.jpg';

  const cardData: IDetailedCardData = {
    title: response.data.title,
    artistDisplay: response.data.artist_display,
    artworkTypeTitle: response.data.artwork_type_title,
    dateDisplay: response.data.date_display,
    imageUrl: `${imagesApiUrl}/${response.data.image_id}${imagesApiUrlParams}`,
    imagePlaceholder: response.data.thumbnail?.lqip || null,
    placeOfOrigin: response.data.place_of_origin,
    styleTitle: response.data.style_title,
    id: response.data.id,
  };

  return cardData;
}
