import { createContext } from 'react';
import { TAppActions } from './actions/actionCreators';
import { IAppState } from './appState';

export interface IAppContext {
  state: IAppState;
  dispatch: React.Dispatch<TAppActions>;
}

export const AppContext = createContext<IAppContext | null>(null);
