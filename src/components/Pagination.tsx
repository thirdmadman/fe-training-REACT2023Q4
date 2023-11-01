import { Link } from 'react-router-dom';

interface IPaginationProps {
  pageSize: number;
  currentPage: number;
  size: number;
  baseLink: string;
}

export function Pagination(props: IPaginationProps) {
  const { pageSize, currentPage, size } = props;

  const paginationMaxPagesVisible = 5;

  const totalPages = Math.floor(size / pageSize) + 1;
  const minPagesNumber = 1;

  let startPage = 1;
  let endPage = startPage + paginationMaxPagesVisible;

  if (
    currentPage <= totalPages &&
    currentPage >= totalPages - Math.floor(paginationMaxPagesVisible / 2)
  ) {
    endPage = totalPages;
    startPage = totalPages - paginationMaxPagesVisible;

    if (totalPages < paginationMaxPagesVisible) {
      startPage = minPagesNumber;
    }
  } else if (
    currentPage >= minPagesNumber &&
    currentPage <= minPagesNumber + Math.floor(paginationMaxPagesVisible / 2)
  ) {
    startPage = minPagesNumber;
    endPage = startPage + paginationMaxPagesVisible;

    if (totalPages < startPage + paginationMaxPagesVisible) {
      startPage = totalPages;
    }
  } else if (
    currentPage > minPagesNumber + Math.floor(paginationMaxPagesVisible / 2) &&
    currentPage < totalPages - Math.floor(paginationMaxPagesVisible / 2)
  ) {
    startPage = currentPage - Math.floor(paginationMaxPagesVisible / 2);
    endPage = currentPage + Math.floor(paginationMaxPagesVisible / 2) + 1;
  }

  const paginationArray = Array.from(
    { length: endPage - startPage },
    (_, i) => startPage + i
  );

  const paginationNextPage =
    currentPage + 1 >= totalPages ? null : currentPage + 1;
  const paginationPreviousPage =
    currentPage - 1 <= minPagesNumber ? null : currentPage - 1;

  const getPaginationButton = (pageNumber: number) => {
    const buttonNormalClasses =
      'flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white';
    const buttonActiveClasses =
      'flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white';
    const buttonClasses =
      pageNumber === currentPage ? buttonActiveClasses : buttonNormalClasses;
    return (
      <li key={pageNumber}>
        <Link to={`?page=${pageNumber}`} className={buttonClasses}>
          {pageNumber}
        </Link>
      </li>
    );
  };

  return (
    <nav className="flex justify-center mt-8">
      <ul className="inline-flex -space-x-px text-base h-10">
        <li>
          <Link
            to={paginationPreviousPage ? `?page=${paginationPreviousPage}` : ''}
            className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </Link>
        </li>
        {paginationArray.map((el) => getPaginationButton(el))}
        <li>
          <Link
            to={paginationNextPage ? `?page=${paginationNextPage}` : ''}
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
}
