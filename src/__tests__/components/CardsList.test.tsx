import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardsList } from '../../components/CardsList';
import { createPaginatedArrayOfMock } from '../mocks/createPaginatedArrayOfCardsMock';

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

describe('CardSList test', () => {
  const testListName = 'SomeUniqueName';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correct list name', () => {
    render(<CardsList listName={testListName} />);
    expect(screen.getByText(testListName)).toBeDefined();
  });

  it('should render loading spinner', () => {
    mocks.useSearchArtsQuery.mockImplementationOnce(
      vi.fn(() => ({
        data: null,
        isError: false,
        isFetching: true,
      }))
    );

    render(<CardsList listName={testListName} />);
    expect(screen.getByText('Loading...')).toBeDefined();
  });

  it('should render error on api error', () => {
    mocks.useSearchArtsQuery.mockImplementationOnce(
      vi.fn(() => ({
        data: null,
        isError: true,
        isFetching: false,
      }))
    );

    render(<CardsList listName={testListName} />);
    expect(screen.getByText('Server response error')).toBeDefined();
  });

  it('should render error of non found cards', () => {
    mocks.useSearchArtsQuery.mockImplementationOnce(
      vi.fn(() => ({
        data: {
          array: [],
        },
        isError: false,
        isFetching: false,
      }))
    );

    render(<CardsList listName={testListName} />);
    expect(screen.getByText('Not found')).toBeDefined();
  });

  it('should render specific number of cards', () => {
    mocks.useSearchArtsQuery.mockImplementationOnce(
      vi.fn(() => ({
        data: createPaginatedArrayOfMock(4),
        isError: false,
        isFetching: false,
      }))
    );

    render(<CardsList listName={testListName} />);
    expect(screen.getByText('Card 1')).toBeDefined();
    expect(screen.getByText('Card 2')).toBeDefined();
    expect(screen.getByText('Card 3')).toBeDefined();
    expect(screen.getByText('Card 4')).toBeDefined();
  });
});
