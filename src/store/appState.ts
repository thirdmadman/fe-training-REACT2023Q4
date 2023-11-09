import { ICardData } from '../interfaces/ICardData';
import { IDetailedCardData } from '../interfaces/IDetailedCardData';
import { IPaginatedArray } from '../interfaces/IPaginatedArray';

export interface ISearchSlice {
  searchString: string;
  paginationPage: number;
  itemsPerPage: number;
}

export interface IDetailsSlice {
  isIsError: false;
  details: IDetailedCardData | null;
}

export interface ICardsSlice {
  isIsError: false;
  cards: IPaginatedArray<ICardData> | null;
}
export interface IAppState {
  search: ISearchSlice;
  cards: ICardsSlice;
  details: IDetailsSlice;
}

export const defaultAppState: IAppState = {
  search: {
    searchString: '',
    paginationPage: 1,
    itemsPerPage: 12,
  },
  cards: {
    isIsError: false,
    cards: null,
  },
  details: {
    isIsError: false,
    details: null,
  },
};
