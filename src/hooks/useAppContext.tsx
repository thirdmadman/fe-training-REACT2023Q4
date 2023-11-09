import { useContext } from 'react';
import { AppContext } from '../store/AppContext';

export function useAppContext() {
  return useContext(AppContext);
}
