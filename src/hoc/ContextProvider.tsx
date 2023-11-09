import { ReactNode, useReducer } from 'react';
import { defaultAppState } from '../store/appState';
import { appStateReducer } from '../store/appStateReducer';
import { AppContext } from '../store/AppContext';

export function ContextProvider(props: { children?: ReactNode }) {
  const [state, dispatch] = useReducer(appStateReducer, defaultAppState);

  const appState = { state, dispatch };

  return (
    <AppContext.Provider value={appState}>{props.children}</AppContext.Provider>
  );
}
