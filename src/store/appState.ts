import { CARDS_COUNT_PER_PAGE } from '../constants';
import { ICardData } from '../interfaces/ICardData';
import { IDetailedCardData } from '../interfaces/IDetailedCardData';
import { IPaginatedArray } from '../interfaces/IPaginatedArray';

export interface ISearchSlice {
  searchString: string;
  paginationPage: number;
  itemsPerPage: number;
}

export interface IDetailsSlice {
  openedCardId: number | null;
  isIsError: boolean;
  details: IDetailedCardData | null;
}

export interface ICardsSlice {
  isIsError: boolean;
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
    itemsPerPage: CARDS_COUNT_PER_PAGE,
  },
  cards: {
    isIsError: false,
    cards: null,
  },
  details: {
    isIsError: false,
    openedCardId: null,
    details: null,
  },
};
