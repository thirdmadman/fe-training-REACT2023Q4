import DataLocalStorageProvider from '../../services/DataLocalStorageProvider';
import {
  getQueryFormLocalStorage,
  saveQueryToLocalStorage,
} from '../../utils/querySaveTools';

vi.mock('../services/DataLocalStorageProvider');

describe('localStorageUtils test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('saveQueryToLocalStorage should update lastSearchQuery in localStorage', () => {
    const query = 'test query';
    const getDataMock = vi.spyOn(DataLocalStorageProvider, 'getData');
    const setDataMock = vi.spyOn(DataLocalStorageProvider, 'setData');

    saveQueryToLocalStorage(query);

    expect(getDataMock).toHaveBeenCalledTimes(1);
    expect(setDataMock).toHaveBeenCalledTimes(2);
    expect(setDataMock).toHaveBeenCalledWith(
      expect.objectContaining({
        userConfigs: expect.objectContaining({
          lastSearchQuery: query,
        }),
      })
    );
  });

  it('getQueryFormLocalStorage should return lastSearchQuery from localStorage', () => {
    const lastSearchQuery = 'stored query';
    const getDataMock = vi.spyOn(DataLocalStorageProvider, 'getData');

    const mockLocalStorageState = {
      isExists: true,
      userConfigs: {
        lastSearchQuery,
      },
      version: 1,
    };

    getDataMock.mockReturnValueOnce(mockLocalStorageState);

    const result = getQueryFormLocalStorage();

    expect(getDataMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual(lastSearchQuery);
  });
});
