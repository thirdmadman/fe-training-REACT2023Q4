import { IAppState } from './appState';
import { TAppActions } from './actions/actionCreators';
import { actionTypes } from './actions/actionTypes';

export const appStateReducer = (
  state: IAppState,
  action: TAppActions
): IAppState => {
  switch (action.type) {
  case actionTypes.CHANGE_SEARCH:
    return {
      ...state,
      search: { ...state.search, searchString: action.payload },
    };
  case actionTypes.SET_CARDS_DATA:
    return { ...state, cards: action.payload };
  case actionTypes.SET_DETAILS_DATA:
    return { ...state, details: action.payload };
  default:
    return state;
  }
};
