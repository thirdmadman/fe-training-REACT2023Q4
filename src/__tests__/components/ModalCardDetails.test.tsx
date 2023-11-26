import { describe, expect } from 'vitest';
import { ModalCardDetails } from '../../components/ModalCardDetails';
import { fireEvent, render, screen } from '@testing-library/react';
import { modalCardDetailsDataMock } from '../mocks/modalCardDetailsDataMock';

const pushMock = vi.fn();

vi.mock('next/router', () => {
  const actual = vi.importActual('next/router');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      pathname: `/details/${modalCardDetailsDataMock.id}`,
      push: pushMock,
      query: {
        id: modalCardDetailsDataMock.id,
      },
    })),
  };
});

const mocks = vi.hoisted(() => {
  return {
    useGetOneArtQuery: vi.fn(() => ({})),
    useAppSelector: vi.fn(() => () => ({})),
  };
});

vi.mock('../../redux/api/apiSlice', () => {
  return {
    useGetOneArtQuery: mocks.useGetOneArtQuery,
  };
});

vi.mock('../../redux/hooks', () => ({
  useAppSelector: mocks.useAppSelector,
}));

describe('ModalCardDetails test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render component without crash', async () => {
    const { container } = render(<ModalCardDetails />);
    expect(container.childElementCount).not.toBe(0);
  });

  it('should render error when API error', async () => {
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

  it('should render loading spinner', async () => {
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

  it('should render error of not found details', async () => {
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

  it('should call close action on close button click', async () => {
    const { container } = render(<ModalCardDetails />);

    if (container.firstElementChild) {
      fireEvent.click(container.firstElementChild);
      expect(pushMock).toBeCalledWith({
        pathname: '/',
        query: {},
      });
    } else {
      expect(container.firstElementChild).not.toBeNull();
    }

    const closeButton = screen.getByText('Close details');
    expect(closeButton).not.toBeNull();

    fireEvent.click(closeButton);
    expect(pushMock).toBeCalledWith({
      pathname: '/',
      query: {},
    });
  });

  it('should render card details text correctly', () => {
    mocks.useGetOneArtQuery.mockImplementationOnce(
      vi.fn(() => ({
        data: modalCardDetailsDataMock,
        isError: false,
        isFetching: false,
      }))
    );

    render(<ModalCardDetails />);

    expect(
      screen.getByText(modalCardDetailsDataMock.title, { exact: false })
    ).not.toBeNull();
    expect(
      screen.getByText(modalCardDetailsDataMock.artistDisplay, { exact: false })
    ).not.toBeNull();
    expect(
      screen.getByText(
        `Place of origin: ${modalCardDetailsDataMock.placeOfOrigin}`,
        { exact: false }
      )
    ).not.toBeNull();
    expect(
      screen.getByText(modalCardDetailsDataMock.artworkTypeTitle, {
        exact: false,
      })
    ).not.toBeNull();
    expect(
      screen.getByText(modalCardDetailsDataMock.artworkTypeTitle, {
        exact: false,
      })
    ).not.toBeNull();
  });
});
