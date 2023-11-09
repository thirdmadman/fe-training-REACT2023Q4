import { ICardsSlice, IDetailsSlice } from '../appState';
import { actionTypes } from './actionTypes';

export const actionCreators = {
  changeSearch: (payload: string) => {
    return { type: actionTypes.CHANGE_SEARCH, payload };
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

export const { changeSearch, setCardsData, setDetailsData } = actionCreators;
