import { useRouter } from 'next/router';
import { useAppSelector } from '../redux/hooks';

export function ItemsPerPageSelect() {
  const router = useRouter();

  const currentItemsPerPage = useAppSelector(
    (state) => state.search.itemsPerPage
  );

  const itemsPerPageMultiplier = 4;

  const itemsPerPageArray = Array.from(Array(5)).map(
    (el, i) => itemsPerPageMultiplier + i * itemsPerPageMultiplier
  );

  const setItemsPerPageEvent = (number: number) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        count: number,
      },
    });
  };

  return (
    <div className="flex">
      <label htmlFor="states" className="sr-only">
        Items on page
      </label>
      <select
        data-testid="select"
        id="states"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-gray-100 dark:border-gray-700 border-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onInput={(e) => setItemsPerPageEvent(Number(e.currentTarget.value))}
        value={currentItemsPerPage}
      >
        {itemsPerPageArray.map((el) => (
          <option value={el} key={el}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
}
