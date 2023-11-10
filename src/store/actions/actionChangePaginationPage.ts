import { loadCardsData } from '../../utils/loadCardsData';
import { IAppContext } from '../AppContext';
import { setCardsData, setSearchData } from './actionCreators';

export const actionChangePaginationPage = (
  pageNumber: number,
  appContext: IAppContext
) => {
  const { state, dispatch } = appContext;
  dispatch(setCardsData({ isIsError: false, cards: null }));
  dispatch(setSearchData({ ...state.search, paginationPage: pageNumber }));
  loadCardsData(
    state.search.searchString,
    pageNumber,
    state.search.itemsPerPage
  )
    .then((result) => {
      dispatch(setCardsData({ isIsError: false, cards: result }));
    })
    .catch(() => {
      dispatch(setCardsData({ isIsError: true, cards: null }));
    });
};
