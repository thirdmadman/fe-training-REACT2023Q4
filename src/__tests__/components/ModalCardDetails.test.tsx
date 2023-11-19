import { describe, expect } from 'vitest';
import { ModalCardDetails } from '../../components/ModalCardDetails';
import { fireEvent, render, screen } from '@testing-library/react';
import { closeDetails } from '../../redux/features/detailsSlice';

const dispatchMock = vi.fn(() => {});

const mocks = vi.hoisted(() => {
  return {
    useGetOneArtQuery: vi.fn(() => ({})),
    useAppSelector: vi.fn(() => () => ({})),
    useAppDispatch: vi.fn(() => dispatchMock),
  };
});

vi.mock('../../redux/api/apiSlice', () => {
  return {
    useGetOneArtQuery: mocks.useGetOneArtQuery,
  };
});

vi.mock('../../redux/hooks', () => ({
  useAppSelector: mocks.useAppSelector,
  useAppDispatch: mocks.useAppDispatch,
}));

describe('ModalCardDetails test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render component without crash', async () => {
    const { container } = render(<ModalCardDetails />);
    expect(container.childElementCount).not.toBe(0);
  });

  test('should render error when API error', async () => {
    mocks.useGetOneArtQuery.mockImplementationOnce(
      vi.fn(() => ({
        data: null,
        isError: true,
        isFetching: false,
      }))
    );

    render(<ModalCardDetails />);
    expect(screen.getByText('Server error')).not.toBeNull();
  });

  test('should render loading spinner', async () => {
    mocks.useGetOneArtQuery.mockImplementationOnce(
      vi.fn(() => ({
        data: null,
        isError: false,
        isFetching: true,
      }))
    );

    render(<ModalCardDetails />);
    expect(screen.getByText('Loading...')).not.toBeNull();
  });

  test('should render error of not found details', async () => {
    mocks.useGetOneArtQuery.mockImplementationOnce(
      vi.fn(() => ({
        data: null,
        isError: false,
        isFetching: false,
      }))
    );

    render(<ModalCardDetails />);
    expect(screen.getByText('No such item exist')).not.toBeNull();
  });

  test('should call close action on close button click', async () => {
    render(<ModalCardDetails />);

    const closeButton = screen.getByText('Close details');

    expect(closeButton).not.toBeNull();

    fireEvent.click(closeButton);

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith(closeDetails());
  });
});
