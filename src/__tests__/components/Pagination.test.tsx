import { describe, expect } from 'vitest';
import { Pagination } from '../../components/Pagination';
import { fireEvent, render, screen } from '@testing-library/react';

const pushMock = vi.fn();

vi.mock('next/router', () => {
  const actual = vi.importActual('next/router');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      pathname: '/',
      push: pushMock,
    })),
  };
});

const mocks = vi.hoisted(() => {
  return {
    useSearchArtsQuery: vi.fn(() => ({})),
    useAppSelector: vi.fn(() => () => ({})),
  };
});

vi.mock('../../redux/api/apiSlice', () => {
  return {
    useSearchArtsQuery: mocks.useSearchArtsQuery,
  };
});

vi.mock('../../redux/hooks', () => ({
  useAppSelector: mocks.useAppSelector,
}));

describe('Pagination test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render by default', async () => {
    const { container } = render(<Pagination />);
    expect(container.childElementCount).toBe(0);
  });

  it('should render buttons and call action after button clicked', async () => {
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
    expect(pushMock).toBeCalled();
    expect(pushMock).toBeCalledWith({
      pathname: '/',
      query: {
        page: 2,
      },
    });
  });
});
