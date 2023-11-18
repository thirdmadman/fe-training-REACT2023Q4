import { describe, expect } from 'vitest';
import { Pagination } from '../../components/Pagination';
import { fireEvent, render, screen } from '@testing-library/react';
import { changePaginationPage } from '../../redux/features/searchSlice';

const dispatchMock = vi.fn(() => {});

const mocks = vi.hoisted(() => {
  return {
    useSearchArtsQuery: vi.fn(() => ({})),
    useAppSelector: vi.fn(() => () => ({})),
    useAppDispatch: vi.fn(() => dispatchMock),
  };
});

vi.mock('../../redux/api/apiSlice', () => {
  return {
    useSearchArtsQuery: mocks.useSearchArtsQuery,
  };
});

vi.mock('../../redux/hooks', () => ({
  useAppSelector: mocks.useAppSelector,
  useAppDispatch: mocks.useAppDispatch,
}));

describe('Pagination test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should not render by default', async () => {
    const { container } = render(<Pagination />);
    expect(container.childElementCount).toBe(0);
  });

  test('should render buttons and call action after button clicked', async () => {
    mocks.useSearchArtsQuery.mockImplementationOnce(
      vi.fn(() => ({
        data: {
          array: [],
          currentPage: 1,
          pageSize: 10,
          size: 20,
        },
      }))
    );

    render(<Pagination />);

    const paginationButton = screen.getByText('2');

    expect(paginationButton).not.toBeNull();

    fireEvent.click(paginationButton);
    expect(dispatchMock).toBeCalled();
    expect(dispatchMock).toBeCalledWith(changePaginationPage(2));
  });
});
