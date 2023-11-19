import { useSearchArtsQuery } from '../redux/api/apiSlice';
import { changePaginationPage } from '../redux/features/searchSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { calculatePagination } from '../utils/calculatePagination';
import { ItemsPerPageSelect } from './ItemsPerPageSelect';

export function Pagination() {
  const dispatch = useAppDispatch();
  const setPageEvent = (page: number) => {
    dispatch(changePaginationPage(page));
  };

  const search = useAppSelector((state) => state.search);
  const { data } = useSearchArtsQuery(search);

  if (!data || !data.array) {
    return;
  }

  const currentPage = data.currentPage;
  const size = data.size;
  const itemsPerPage = data.pageSize;

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
