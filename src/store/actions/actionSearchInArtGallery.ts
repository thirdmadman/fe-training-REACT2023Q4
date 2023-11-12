import { loadCardsData } from '../../utils/loadCardsData';
import { IAppContext } from '../AppContext';
import { setCardsData, setSearchData } from './actionCreators';

export const actionSearchInArtGallery = (
  query: string,
  appContext: IAppContext
) => {
  const { state, dispatch } = appContext;
  dispatch(setCardsData({ isIsError: false, cards: null }));
  dispatch(
    setSearchData({ ...state.search, searchString: query, paginationPage: 1 })
  );
  loadCardsData(query, 1, state.search.itemsPerPage)
    .then((result) => {
      dispatch(setCardsData({ isIsError: false, cards: result }));
    })
    .catch(() => {
      dispatch(setCardsData({ isIsError: true, cards: null }));
    });
};
