import { IAppContext } from '../AppContext';
import { setDetailsData } from './actionCreators';

export const actionCloseDetails = (appContext: IAppContext) => {
  const { dispatch } = appContext;
  dispatch(
    setDetailsData({ isIsError: false, details: null, openedCardId: null })
  );
};
