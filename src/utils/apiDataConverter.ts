import { IArtGalleryResponseAll, IArtGalleryResponseSearch } from "../interfaces/IArtGalleryResponse";
import { ICardData } from "../interfaces/ICardData";

export function convertArtGalleryResponseToCards(response: IArtGalleryResponseAll | IArtGalleryResponseSearch) {
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

  return cardsData;
}