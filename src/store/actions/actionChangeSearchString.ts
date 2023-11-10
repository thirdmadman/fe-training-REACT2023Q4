import { IAppContext } from '../AppContext';
import { setSearchData } from './actionCreators';

export const actionChangeSearchString = (
  searchString: string,
  appContext: IAppContext
) => {
  const { state, dispatch } = appContext;
  dispatch(setSearchData({ ...state.search, searchString: searchString }));
};
