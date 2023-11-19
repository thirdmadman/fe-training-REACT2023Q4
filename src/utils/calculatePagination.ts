export const calculatePagination = (
  currentPage: number,
  listOfItemsSize: number,
  itemsPerPage: number
) => {
  const paginationMaxPagesVisible = 5;

  const totalPages = Math.ceil(listOfItemsSize / itemsPerPage);
  const minPagesNumber = 1;

  let startPage = minPagesNumber;
  let endPage = startPage + paginationMaxPagesVisible - 1;

  if (
    currentPage <= totalPages &&
    currentPage >= totalPages - Math.floor(paginationMaxPagesVisible / 2)
  ) {
    endPage = totalPages;
    if (totalPages < paginationMaxPagesVisible) {
      startPage = minPagesNumber;
    } else {
      startPage = totalPages - paginationMaxPagesVisible + 1;
    }
  } else if (
    currentPage >= minPagesNumber &&
    currentPage <= minPagesNumber + Math.floor(paginationMaxPagesVisible / 2)
  ) {
    startPage = minPagesNumber;
    if (totalPages < startPage + paginationMaxPagesVisible) {
      endPage = totalPages;
    } else {
      endPage = startPage + paginationMaxPagesVisible - 1;
    }
  } else if (
    currentPage > minPagesNumber + Math.floor(paginationMaxPagesVisible / 2) &&
    currentPage < totalPages - Math.floor(paginationMaxPagesVisible / 2)
  ) {
    startPage = currentPage - Math.floor(paginationMaxPagesVisible / 2);
    endPage = currentPage + Math.floor(paginationMaxPagesVisible / 2);
  }

  const paginationArray = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const paginationNextPage =
    currentPage + 1 > totalPages ? null : currentPage + 1;
  const paginationPreviousPage =
    currentPage - 1 < minPagesNumber ? null : currentPage - 1;

  return {
    paginationArray,
    paginationNextPage,
    paginationPreviousPage,
  };
};
