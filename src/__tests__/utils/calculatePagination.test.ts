import { describe, expect } from 'vitest';
import { calculatePagination } from '../../utils/calculatePagination';

describe('calculatePagination test', () => {
  it('should calculate pagination for 5 next pages', () => {
    const result = calculatePagination(1, 10, 1);

    expect(result).toEqual<typeof result>({
      paginationArray: [1, 2, 3, 4, 5],
      paginationNextPage: 2,
      paginationPreviousPage: null,
    });
  });

  it('should calculate pagination for none next pages', () => {
    const result = calculatePagination(1, 10, 10);

    expect(result).toEqual<typeof result>({
      paginationArray: [1],
      paginationNextPage: null,
      paginationPreviousPage: null,
    });
  });

  it('should calculate pagination for 3 next pages', () => {
    const result = calculatePagination(1, 30, 10);

    expect(result).toEqual<typeof result>({
      paginationArray: [1, 2, 3],
      paginationNextPage: 2,
      paginationPreviousPage: null,
    });
  });

  it('should calculate pagination for 1 next pages and 1 prev page', () => {
    const result = calculatePagination(2, 30, 10);

    expect(result).toEqual<typeof result>({
      paginationArray: [1, 2, 3],
      paginationNextPage: 3,
      paginationPreviousPage: 1,
    });
  });

  it('should calculate pagination for 2 next pages and prev 2', () => {
    const result = calculatePagination(5, 10, 1);

    expect(result).toEqual<typeof result>({
      paginationArray: [3, 4, 5, 6, 7],
      paginationNextPage: 6,
      paginationPreviousPage: 4,
    });
  });

  it('should calculate pagination for prev 5 pages', () => {
    const result = calculatePagination(10, 10, 1);

    expect(result).toEqual<typeof result>({
      paginationArray: [6, 7, 8, 9, 10],
      paginationNextPage: null,
      paginationPreviousPage: 9,
    });
  });

  it('should calculate pagination for next 3 pages', () => {
    const result = calculatePagination(1, 4, 1);

    expect(result).toEqual<typeof result>({
      paginationArray: [1, 2, 3, 4],
      paginationNextPage: 2,
      paginationPreviousPage: null,
    });
  });
});
