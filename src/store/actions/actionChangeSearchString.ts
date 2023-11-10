import { saveQueryToLocalStorage } from '../../utils/querySaveTools';
import { IAppContext } from '../AppContext';
import { setSearchData } from './actionCreators';

export const actionChangeSearchString = (
  searchString: string,
  appContext: IAppContext
) => {
  const { state, dispatch } = appContext;

  if (searchString === '') {
    saveQueryToLocalStorage(null);
  } else {
    saveQueryToLocalStorage(searchString);
  }

  dispatch(setSearchData({ ...state.search, searchString: searchString }));
};
