import { loadCardsData } from '../../utils/loadCardsData';
import { IAppContext } from '../AppContext';
import { setCardsData, setSearchData } from './actionCreators';

export const actionChangeItemsPerPage = (
  itemsPerPage: number,
  appContext: IAppContext
) => {
  const { state, dispatch } = appContext;
  dispatch(setCardsData({ isIsError: false, cards: null }));
  dispatch(setSearchData({ ...state.search, paginationPage: 1, itemsPerPage }));
  loadCardsData(state.search.searchString, 1, itemsPerPage)
    .then((result) => {
      dispatch(setCardsData({ isIsError: false, cards: result }));
    })
    .catch(() => {
      dispatch(setCardsData({ isIsError: true, cards: null }));
    });
};
