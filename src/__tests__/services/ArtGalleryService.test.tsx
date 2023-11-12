import { describe, expect, vi } from 'vitest';
import { ArtGalleryService } from '../../services/ArtGalleryService';

function createFetchResponse() {
  return { json: () => new Promise((resolve) => resolve({})) };
}

vi.stubGlobal('fetch', vi.fn(createFetchResponse));

describe('ArtGalleryService test', () => {
  test('should call API req to get all with specific parameters', () => {
    const page = 1;
    const limit = 1;
    const baseUrl = 'http://example.com';

    const artGalleryService = new ArtGalleryService(baseUrl);

    artGalleryService.getAll(1, 1);

    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toBeCalledWith(
      `${baseUrl}/search?query[term][is_public_domain]=true&fields=id,title,image_id,artist_display,artwork_type_title,date_display,thumbnail&limit=${limit}&page=${page}`
    );
  });

  test('should call API req to get one with specific parameters', () => {
    const id = 1;
    const baseUrl = 'http://example.com';

    const artGalleryService = new ArtGalleryService(baseUrl);

    artGalleryService.getOneById(1);

    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toBeCalledWith(`${baseUrl}/${id}`);
  });
});
