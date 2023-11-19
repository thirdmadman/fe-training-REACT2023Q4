import { describe, expect } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { Card } from '../../components/Card';
import { cardDataMock } from '../mocks/cardDataMock';
import { renderWithProviders } from '../utils/test-utils';
import { openDetails } from '../../redux/features/detailsSlice';

const dispatchMock = vi.fn(() => {});

const mocks = vi.hoisted(() => {
  return {
    useGetOneArtQuery: vi.fn(() => ({})),
    useAppSelector: vi.fn(() => () => ({})),
    useAppDispatch: vi.fn(() => dispatchMock),
  };
});

vi.mock('../../redux/hooks', () => vi.importActual('../../redux/hooks'));

describe('Card test', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProviders(<Card {...cardDataMock} />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders text correctly', () => {
    renderWithProviders(<Card {...cardDataMock} />);

    expect(screen.getByText(cardDataMock.title)).toBeDefined();
    expect(screen.getByText(cardDataMock.artistDisplay)).toBeDefined();
    expect(screen.getByText(cardDataMock.artworkTypeTitle)).toBeDefined();
    expect(screen.getByText(cardDataMock.dateDisplay)).toBeDefined();
  });

  it('when no image placeholder available it not shown', () => {
    const changedProps = { ...cardDataMock, imagePlaceholder: null };
    const { container } = renderWithProviders(<Card {...changedProps} />);

    const contentDiv = container.firstElementChild?.firstElementChild;
    if (contentDiv) {
      expect(getComputedStyle(contentDiv).backgroundImage).toBe('');
    }

    expect(container.firstChild).not.toBeNull();
  });

  it('should call open details action with specific id on card click', () => {
    vi.mock('../../redux/hooks', () => ({
      useAppSelector: mocks.useAppSelector,
      useAppDispatch: mocks.useAppDispatch,
    }));

    const { container } = renderWithProviders(<Card {...cardDataMock} />);

    const contentDiv = container.firstElementChild;

    if (!contentDiv) {
      expect(contentDiv).not.toBeNull();
      return;
    }

    fireEvent.click(contentDiv);

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith(openDetails(cardDataMock.id));
  });
});
