import { loadCardData } from '../../utils/loadCardData';
import { IAppContext } from '../AppContext';
import { setDetailsData } from './actionCreators';

export const actionLoadDetails = (cardId: number, appContext: IAppContext) => {
  const { dispatch } = appContext;
  dispatch(
    setDetailsData({ isIsError: false, details: null, openedCardId: cardId })
  );
  loadCardData(cardId)
    .then((result) => {
      dispatch(
        setDetailsData({
          isIsError: false,
          details: result,
          openedCardId: cardId,
        })
      );
    })
    .catch(() => {
      dispatch(
        setDetailsData({ isIsError: true, details: null, openedCardId: cardId })
      );
    });
};
