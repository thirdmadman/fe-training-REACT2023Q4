import { Card } from './Card';
import { ICardData } from '../interfaces/ICardData';
import { LoadingSpinner } from './LoadingSpinner';

export interface ICardsListProps {
  listName: string;
  cardsList: Array<ICardData>;
}

export function CardsList(props: ICardsListProps) {
  const showCards = (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
      {props.cardsList.map((el) => (
        <Card {...el} key={el.id} />
      ))}
    </div>
  );

  return (
    <div className="mt-16">
      <h3 className="text-gray-600 text-2xl font-medium">{props.listName}</h3>
      {props.cardsList && props.cardsList.length > 0 ? (
        showCards
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
