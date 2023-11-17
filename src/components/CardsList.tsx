import { Card } from './Card';
import { ICardData } from '../interfaces/ICardData';
import { LoadingSpinner } from './LoadingSpinner';
import { IPaginatedArray } from '../interfaces/IPaginatedArray';
import { Pagination } from './Pagination';
import { ErrorCard } from './ErrorCard';
import { useAppSelector } from '../redux/hooks';
import { useSearchArtsQuery } from '../redux/api/apiSlice';

export interface ICardsListProps {
  listName: string;
}

export function CardsList(props: ICardsListProps) {
  const { listName } = props;

  const search = useAppSelector((state) => state.search);

  const { data, isError, isFetching } = useSearchArtsQuery(search);

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

  const showCardsList = (
    cards: IPaginatedArray<ICardData> | undefined,
    isErrorShow: boolean,
    isLoadingShow: boolean
  ) => {
    if (isErrorShow) {
      return (
        <ErrorCard
          title="Server response error"
          subtitle="We are sorry, but there some error. Try to refresh page"
        />
      );
    }

    if (isLoadingShow) {
      return <LoadingSpinner />;
    }

    if (!cards || cards.array.length <= 0) {
      return (
        <ErrorCard
          title="Not found"
          subtitle="Oops! We have to elements to show"
        />
      );
    }

    return showCards(cards);
  };

  return (
    <div className="mt-16">
      <h3 className="text-gray-600 text-2xl font-medium">{listName}</h3>
      {showCardsList(data, isError, isFetching)}
    </div>
  );
}
