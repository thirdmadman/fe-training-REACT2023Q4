import { cardDataMock } from './cardDataMock';

export const createPaginatedArrayOfMock = (number: number) => {
  const cards = Array.from(Array(number)).map((el, i) => ({
    ...cardDataMock,
    title: `Card ${i + 1}`,
    id: i + 1,
  }));
  return { array: cards, pageSize: number, currentPage: 1, size: number };
};
