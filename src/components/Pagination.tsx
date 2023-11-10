import { useAppContext } from '../hooks/useAppContext';
import { actionChangePaginationPage } from '../store/actions/actionChangePaginationPage';
import { calculatePagination } from '../utils/calculatePagination';
import { ItemsPerPageSelect } from './ItemsPerPageSelect';

export function Pagination() {
  const appContext = useAppContext();

  const setPageEvent = (page: number) => {
    appContext && actionChangePaginationPage(page, appContext);
  };

  if (!appContext || !appContext.state.cards.cards) {
    return <div>none</div>;
  }

  const currentPage = appContext.state.cards.cards.currentPage;
  const size = appContext.state.cards.cards.size;
  const itemsPerPage = appContext.state.cards.cards.pageSize;

  const { paginationArray, paginationNextPage, paginationPreviousPage } =
    calculatePagination(currentPage, size, itemsPerPage);

  const getPaginationButton = (pageNumber: number) => {
    const buttonNormalClasses =
      'flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white';
    const buttonActiveClasses =
      'flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white';
    const buttonClasses =
      pageNumber === currentPage ? buttonActiveClasses : buttonNormalClasses;

    return (
      <li key={pageNumber}>
        <div className={buttonClasses} onClick={() => setPageEvent(pageNumber)}>
          {pageNumber}
        </div>
      </li>
    );
  };

  return (
    <nav className="flex justify-center mt-8 gap-3">
      <ul className="inline-flex -space-x-px text-base h-10">
        <li>
          <div
            onClick={() =>
              paginationPreviousPage && setPageEvent(paginationPreviousPage)
            }
            className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </div>
        </li>
        {paginationArray.map((el) => getPaginationButton(el))}
        <li>
          <div
            onClick={() =>
              paginationNextPage && setPageEvent(paginationNextPage)
            }
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </div>
        </li>
      </ul>
      <ItemsPerPageSelect />
    </nav>
  );
}
