import {
  IArtGalleryResponseAll,
  IArtGalleryResponseGetOne,
} from '../../interfaces/IArtGalleryResponse';
import {
  convertArtGalleryResponseGetOneToCard,
  convertArtGalleryResponseToCards,
} from '../../utils/apiDataConverter';

describe('apiDataConverter test', () => {
  describe('convertArtGalleryResponseToCards', () => {
    test('should convert IArtGalleryResponseAll to IPaginatedArray<ICardData>', () => {
      const mockResponse = {
        config: { iiif_url: 'mock-url', website_url: 'mock-website-url' },
        data: [
          {
            id: 1,
            title: 'Mock Title',
            artist_display: 'Mock Artist',
            artwork_type_title: 'Mock Artwork Type',
            date_display: 'Mock Date',
            image_id: 'mock-image-id',
            thumbnail: {
              lqip: 'mock-lqip',
              width: 100,
              height: 100,
              alt_text: 'Mock Alt',
            },
          },
        ],
        info: { license_text: 'Mock License', license_links: [], version: 1 },
        pagination: {
          total: 1,
          limit: 1,
          offset: 0,
          total_pages: 1,
          current_page: 1,
          next_url: '',
        },
      } as unknown as IArtGalleryResponseAll;

      const result = convertArtGalleryResponseToCards(mockResponse);

      expect(result).toEqual({
        array: [
          {
            title: 'Mock Title',
            artistDisplay: 'Mock Artist',
            artworkTypeTitle: 'Mock Artwork Type',
            dateDisplay: 'Mock Date',
            imageUrl: 'mock-url/mock-image-id/full/843,/0/default.jpg',
            imagePlaceholder: 'mock-lqip',
            id: 1,
          },
        ],
        pageSize: 1,
        currentPage: 1,
        size: 1,
      });
    });
  });

  describe('convertArtGalleryResponseGetOneToCard', () => {
    test('should convert IArtGalleryResponseGetOne to IDetailedCardData', () => {
      const mockResponse: IArtGalleryResponseGetOne = {
        config: { iiif_url: 'mock-url', website_url: 'mock-website-url' },
        data: {
          id: 1,
          title: 'Mock Title',
          artist_display: 'Mock Artist',
          artwork_type_title: 'Mock Artwork Type',
          date_display: 'Mock Date',
          image_id: 'mock-image-id',
          thumbnail: {
            lqip: 'mock-lqip',
            width: 100,
            height: 100,
            alt_text: 'Mock Alt',
          },
          place_of_origin: 'Mock Place of Origin',
          style_title: 'Mock Style Title',
        },
        info: { license_text: 'Mock License', license_links: [], version: 1 },
      } as unknown as IArtGalleryResponseGetOne;

      const result = convertArtGalleryResponseGetOneToCard(mockResponse);

      expect(result).toEqual({
        title: 'Mock Title',
        artistDisplay: 'Mock Artist',
        artworkTypeTitle: 'Mock Artwork Type',
        dateDisplay: 'Mock Date',
        imageUrl: 'mock-url/mock-image-id/full/843,/0/default.jpg',
        imagePlaceholder: 'mock-lqip',
        placeOfOrigin: 'Mock Place of Origin',
        styleTitle: 'Mock Style Title',
        id: 1,
      });
    });
  });
});
