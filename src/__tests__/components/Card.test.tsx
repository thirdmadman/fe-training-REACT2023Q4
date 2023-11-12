import { describe, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Card } from '../../components/Card';
import { cardDataMock } from '../mocks/cardDataMock';
import { actionOpenDetails } from '../../store/actions/actionOpenDetails';
import { useAppContext } from '../../hooks/useAppContext';

describe('Card test', () => {
  it('renders without crashing', () => {
    const { container } = render(<Card {...cardDataMock} />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders text correctly', () => {
    render(<Card {...cardDataMock} />);

    expect(screen.getByText(cardDataMock.title)).toBeDefined();
    expect(screen.getByText(cardDataMock.artistDisplay)).toBeDefined();
    expect(screen.getByText(cardDataMock.artworkTypeTitle)).toBeDefined();
    expect(screen.getByText(cardDataMock.dateDisplay)).toBeDefined();
  });

  it('when no image placeholder available it not shown', () => {
    const changedProps = { ...cardDataMock, imagePlaceholder: null };
    const { container } = render(<Card {...changedProps} />);

    const contentDiv = container.firstElementChild?.firstElementChild;
    if (contentDiv) {
      expect(getComputedStyle(contentDiv).backgroundImage).toBe('');
    }

    expect(container.firstChild).not.toBeNull();
  });

  it('should call open details on click', () => {
    vi.mock('../../hooks/useAppContext', () => {
      return {
        useAppContext: vi.fn(() => ({})),
      };
    });

    vi.mock('../../store/actions/actionOpenDetails', () => {
      return {
        actionOpenDetails: vi.fn(),
      };
    });

    const { container } = render(<Card {...cardDataMock} />);

    container.firstElementChild && fireEvent.click(container.firstElementChild);

    expect(useAppContext).toBeCalledTimes(1);
    expect(actionOpenDetails).toBeCalledTimes(1);
  });
});
