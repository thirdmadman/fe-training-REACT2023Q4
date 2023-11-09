import { actionTypes } from './actionTypes';

export const actionCreators = {
  changeSearch: (payload: string) => {
    return { type: actionTypes.CHANGE_SEARCH, payload };
  },
  changePageNumber: (payload: number) => {
    return { type: actionTypes.REMOVE_TODO, payload };
  },
  changeItemsPerPage: () => {
    return { type: actionTypes.CLEAR_ALL };
  },
};

export type TActonCreatorsKeys = keyof typeof actionCreators;

export type TAppActions = ReturnType<
  (typeof actionCreators)[TActonCreatorsKeys]
>;
