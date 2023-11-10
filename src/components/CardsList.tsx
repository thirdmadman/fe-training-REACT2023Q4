import { Card } from './Card';
import { ICardData } from '../interfaces/ICardData';
import { LoadingSpinner } from './LoadingSpinner';
import { IPaginatedArray } from '../interfaces/IPaginatedArray';
import { Pagination } from './Pagination';
import { useAppContext } from '../hooks/useAppContext';
import { ICardsSlice } from '../store/appState';

export interface ICardsListProps {
  listName: string;
}

export function CardsList(props: ICardsListProps) {
  const { listName } = props;

  const appContext = useAppContext();

  const cards = appContext?.state.cards || null;

  const showCards = (paginatedArray: IPaginatedArray<ICardData>) => (
    <>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {paginatedArray.array.map((el) => (
          <Card {...el} key={el.id} />
        ))}
      </div>
      <Pagination />
    </>
  );

  const infoCard = (title: string, subtitle: string) => (
    <div className="flex min-w-full py-10 items-center justify-center">
      <div className="rounded-lg bg-white p-8 text-center shadow-xl">
        <h1 className="mb-4 text-2xl font-bold">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </div>
  );

  const showCardsList = (cardsSlice: ICardsSlice | null) => {
    if (!cardsSlice) {
      return infoCard('Unknown error', 'This is fatal');
    }

    if (cardsSlice.isIsError) {
      return infoCard(
        'Server response error',
        'We are sorry, but there some error. Try to refresh page'
      );
    }

    if (!cardsSlice.cards) {
      return <LoadingSpinner />;
    }

    if (!cardsSlice.cards.array || cardsSlice.cards.array.length <= 0) {
      return infoCard('Not found', 'Oops! We have to elements to show');
    }

    return showCards(cardsSlice.cards);
  };

  return (
    <div className="mt-16">
      <h3 className="text-gray-600 text-2xl font-medium">{listName}</h3>
      {showCardsList(cards)}
    </div>
  );
}
