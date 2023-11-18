import { LOCAL_STORAGE_CONFIGS_VERSION } from '../../constants';
import { ILocalConfigs } from '../../interfaces/ILocalConfigs';
import DataLocalStorageProvider from '../../services/DataLocalStorageProvider';

describe('DataLocalStorageProvider test', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('setData should store data in localStorage', () => {
    const testData: ILocalConfigs = {
      isExists: true,
      userConfigs: { lastSearchQuery: 'test' },
      version: LOCAL_STORAGE_CONFIGS_VERSION,
    };

    DataLocalStorageProvider.setData(testData);

    const storedData = localStorage.getItem(
      DataLocalStorageProvider.localStorageItemName
    );
    const parsedData = storedData ? JSON.parse(storedData) : null;

    expect(parsedData).toEqual(testData);
  });

  test('isNotEmpty should return true when localStorage has data', () => {
    const testData: ILocalConfigs = {
      isExists: true,
      userConfigs: { lastSearchQuery: 'test' },
      version: LOCAL_STORAGE_CONFIGS_VERSION,
    };

    localStorage.setItem(
      DataLocalStorageProvider.localStorageItemName,
      JSON.stringify(testData)
    );

    const result = DataLocalStorageProvider.isNotEmpty();

    expect(result).toBe(true);
  });

  test('isNotEmpty should return false when localStorage is empty', () => {
    const result = DataLocalStorageProvider.isNotEmpty();

    expect(result).toBe(false);
  });

  test('destroy should remove data from localStorage', () => {
    localStorage.setItem(
      DataLocalStorageProvider.localStorageItemName,
      'test-data'
    );

    DataLocalStorageProvider.destroy();

    const storedData = localStorage.getItem(
      DataLocalStorageProvider.localStorageItemName
    );

    expect(storedData).toBeNull();
  });

  test('getData should return stored data if it exists and has the correct version', () => {
    const testData: ILocalConfigs = {
      isExists: true,
      userConfigs: { lastSearchQuery: 'test' },
      version: LOCAL_STORAGE_CONFIGS_VERSION,
    };

    localStorage.setItem(
      DataLocalStorageProvider.localStorageItemName,
      JSON.stringify(testData)
    );

    const result = DataLocalStorageProvider.getData();

    expect(result).toEqual(testData);
  });

  test('getData should generate and store data if no valid data is found', () => {
    const generatedData = DataLocalStorageProvider.getData();

    const storedData = localStorage.getItem(
      DataLocalStorageProvider.localStorageItemName
    );
    const parsedData = storedData ? JSON.parse(storedData) : null;

    expect(parsedData).toEqual(generatedData);
  });
});
