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
  case actionTypes.REMOVE_TODO:
    return { ...state };
  case actionTypes.CLEAR_ALL:
    return { ...state };
  default:
    return state;
  }
};
