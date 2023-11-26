import { describe, expect } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { Card } from '../../components/Card';
import { cardDataMock } from '../mocks/cardDataMock';
import { renderWithProviders } from '../utils/test-utils';

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
    const { container } = renderWithProviders(<Card {...cardDataMock} />);

    const contentDiv = container.firstElementChild;

    if (!contentDiv) {
      expect(contentDiv).not.toBeNull();
      return;
    }

    fireEvent.click(contentDiv);

    expect(pushMock).toBeCalled();
    expect(pushMock).toBeCalledWith({
      pathname: '/details/80607',
      query: {},
    });
  });
});
