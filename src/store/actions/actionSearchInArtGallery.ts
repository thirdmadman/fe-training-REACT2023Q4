import { loadCardsData } from '../../utils/loadCardsData';
import { IAppContext } from '../AppContext';
import { setCardsData, setSearchData } from './actionCreators';

export const actionSearchInArtGallery = (
  query: string,
  appContext: IAppContext
) => {
  const { state, dispatch } = appContext;
  dispatch(setCardsData({ isIsError: false, cards: null }));
  loadCardsData(query)
    .then((result) => {
      dispatch(setCardsData({ isIsError: false, cards: result.cards }));
    })
    .catch(() => {
      dispatch(setCardsData({ isIsError: true, cards: null }));
    })
    .then(() => {
      dispatch(setSearchData({ ...state.search, searchString: query }));
    });
};
