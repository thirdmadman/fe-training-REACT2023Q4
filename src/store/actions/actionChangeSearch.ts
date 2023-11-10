import { loadCardsData } from '../../utils/loadCardsData';
import { IAppContext } from '../AppContext';
import { setCardsData, setSearchData } from './actionCreators';

export const actionChangeSearch = (
  searchString: string,
  page: number,
  itemsPerPage: number,
  appContext: IAppContext
) => {
  const { dispatch } = appContext;
  dispatch(
    setSearchData({
      searchString: searchString,
      paginationPage: page,
      itemsPerPage,
    })
  );
  dispatch(setCardsData({ isIsError: false, cards: null }));
  loadCardsData(searchString, page, itemsPerPage)
    .then((result) => {
      dispatch(setCardsData({ isIsError: false, cards: result }));
    })
    .catch(() => {
      dispatch(setCardsData({ isIsError: true, cards: null }));
    });
};
