import { Card } from './Card';
import { ICardData } from '../interfaces/ICardData';
import { LoadingSpinner } from './LoadingSpinner';
import { IPaginatedArray } from '../interfaces/IPaginatedArray';
import { Pagination } from './Pagination';
import { useAppContext } from '../hooks/useAppContext';

export interface ICardsListProps {
  listName: string;
}

export function CardsList(props: ICardsListProps) {
  const { listName } = props;

  const appContext = useAppContext();

  const cards = appContext?.state.cards.cards;

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

  return (
    <div className="mt-16">
      <h3 className="text-gray-600 text-2xl font-medium">{listName}</h3>
      {cards && cards.array.length > 0 ? showCards(cards) : <LoadingSpinner />}
    </div>
  );
}
