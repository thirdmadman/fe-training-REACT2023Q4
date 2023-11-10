import { useAppContext } from '../hooks/useAppContext';
import { actionChangeItemsPerPage } from '../store/actions/actionChangeItemsPerPage';
export function ItemsPerPageSelect() {
  const appContext = useAppContext();

  const itemsPerPageMultiplier = 4;

  const itemsPerPageArray = Array.from(Array(5)).map(
    (el, i) => itemsPerPageMultiplier + i * itemsPerPageMultiplier
  );

  const setItemsPerPageEvent = (number: number) => {
    appContext && actionChangeItemsPerPage(number, appContext);
  };

  return (
    <div className="flex">
      <label htmlFor="states" className="sr-only">
        Items on page
      </label>
      <select
        id="states"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-gray-100 dark:border-gray-700 border-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onInput={(e) => setItemsPerPageEvent(Number(e.currentTarget.value))}
        value={appContext?.state.search.itemsPerPage}
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
