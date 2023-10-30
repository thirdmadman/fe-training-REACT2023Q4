import DataLocalStorageProvider from '../services/DataLocalStorageProvider';

export function saveQueryToLocalStorage(query: string | null) {
  const localStorageState = DataLocalStorageProvider.getData();
  localStorageState.userConfigs.lastSearchQuery = query;

  DataLocalStorageProvider.setData(localStorageState);
}

export function getQueryFormLocalStorage() {
  const localStorageState = DataLocalStorageProvider.getData();
  return localStorageState.userConfigs.lastSearchQuery;
}
