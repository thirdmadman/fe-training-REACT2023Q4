import { ICardsSlice, IDetailsSlice, ISearchSlice } from '../appState';
import { actionTypes } from './actionTypes';

export const actionCreators = {
  setSearchData: (payload: ISearchSlice) => {
    return { type: actionTypes.SET_SEARCH_DATA, payload };
  },
  setCardsData: (payload: ICardsSlice) => {
    return { type: actionTypes.SET_CARDS_DATA, payload };
  },
  setDetailsData: (payload: IDetailsSlice) => {
    return { type: actionTypes.SET_DETAILS_DATA, payload };
  },
};

export type TActonCreatorsKeys = keyof typeof actionCreators;

export type TAppActions = ReturnType<
  (typeof actionCreators)[TActonCreatorsKeys]
>;

export const { setSearchData, setCardsData, setDetailsData } = actionCreators;
