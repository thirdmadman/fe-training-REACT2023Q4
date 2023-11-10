export const calculatePagination = (
  currentPage: number,
  listOfItemsSize: number,
  itemsPerPage: number
) => {
  const paginationMaxPagesVisible = 5;

  const totalPages = Math.floor(listOfItemsSize / itemsPerPage) + 1;
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

  return {
    paginationArray,
    paginationNextPage,
    paginationPreviousPage,
  };
};
