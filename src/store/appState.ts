import { ICardData } from '../interfaces/ICardData';
import { IDetailedCardData } from '../interfaces/IDetailedCardData';

export interface ISearchSlice {
  searchString: string;
  paginationPage: number;
  itemsPerPage: number;
}

export interface IDetailsSlice {
  isOpened: false;
  details: IDetailedCardData | null;
}

export type TCardsSlice = Array<ICardData> | null;

export interface IAppState {
  search: ISearchSlice;
  cards: TCardsSlice;
  details: IDetailsSlice;
}

export const defaultAppState: IAppState = {
  search: {
    searchString: '',
    paginationPage: 1,
    itemsPerPage: 12,
  },
  cards: Array<ICardData>(),
  details: {
    isOpened: false,
    details: null,
  },
};
