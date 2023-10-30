import { LOCAL_STORAGE_CONFIGS_VERSION, LOCAL_STORAGE_ITEM_NAME } from '../constants';
import { ILocalConfigs } from '../interfaces/ILocalConfigs';
import { IUserConfigs } from '../interfaces/IUserConfigs';

const configVersion = LOCAL_STORAGE_CONFIGS_VERSION;

class DataLocalStorageProvider {
  static localStorageItemName = LOCAL_STORAGE_ITEM_NAME;

  public static setData(data: ILocalConfigs) {
    localStorage.setItem(DataLocalStorageProvider.localStorageItemName, JSON.stringify(data));
  }

  public static isNotEmpty() {
    const localStorageData = localStorage.getItem(DataLocalStorageProvider.localStorageItemName);

    if (localStorageData && localStorageData[0] === '{') {
      const dataILocalConfigs = JSON.parse(localStorageData) as ILocalConfigs;
      const localStorageKeysNumber = Object.keys(dataILocalConfigs).length;
      if (localStorageKeysNumber > 0) {
        return true;
      }
    }

    return false;
  }

  public static destroy() {
    localStorage.removeItem(DataLocalStorageProvider.localStorageItemName);
  }

  public static getData() {
    if (DataLocalStorageProvider.isNotEmpty()) {
      const localStorageData = localStorage.getItem(DataLocalStorageProvider.localStorageItemName);
      if (localStorageData) {
        const dataILocalConfigs = JSON.parse(localStorageData) as ILocalConfigs;
        if (dataILocalConfigs.version && dataILocalConfigs.version === configVersion) {
          return dataILocalConfigs;
        }
      }
    }

    const generatedData = DataLocalStorageProvider.generateData();
    DataLocalStorageProvider.setData(generatedData);
    return generatedData;
  }

  private static generateData() {
    const userConfigs = {
      lastSearchQuery: null,
    } as IUserConfigs;

    const configs = {
      isExists: true,
      userConfigs,
      version: configVersion,
    };
    return configs as ILocalConfigs;
  }
}

export default DataLocalStorageProvider;