import { IUserConfigs } from "./IUserConfigs";

export interface ILocalConfigs {
  isExists: boolean;
  userConfigs: IUserConfigs;
  version: number;
}