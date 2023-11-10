import { IAppContext } from '../AppContext';
import { setDetailsData } from './actionCreators';

export const actionOpenDetails = (cardId: number, appContext: IAppContext) => {
  const { dispatch } = appContext;
  dispatch(
    setDetailsData({ isIsError: false, details: null, openedCardId: cardId })
  );
};
