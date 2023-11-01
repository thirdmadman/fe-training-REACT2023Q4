import { Card } from './Card';
import { ICardData } from '../interfaces/ICardData';
import { LoadingSpinner } from './LoadingSpinner';
import { IPaginatedArray } from '../interfaces/IPaginatedArray';
import { Pagination } from './Pagination';

export interface ICardsListProps {
  listName: string;
  cardsList: IPaginatedArray<ICardData> | null;
}

export function CardsList(props: ICardsListProps) {
  const { listName, cardsList } = props;

  const showCards = (paginatedArray: IPaginatedArray<ICardData>) => (
    <>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {paginatedArray.array.map((el) => (
          <Card {...el} key={el.id} />
        ))}
      </div>
      <Pagination
        pageSize={paginatedArray.pageSize}
        currentPage={paginatedArray.currentPage}
        size={paginatedArray.size}
        baseLink=""
      />
    </>
  );

  return (
    <div className="mt-16">
      <h3 className="text-gray-600 text-2xl font-medium">{listName}</h3>
      {cardsList && cardsList.array.length > 0 ? (
        showCards(cardsList)
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
