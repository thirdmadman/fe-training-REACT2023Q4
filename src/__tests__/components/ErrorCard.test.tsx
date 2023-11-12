import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorCard } from '../../components/ErrorCard';

describe('ErrorCard test', () => {
  const errorCardTitle = 'Test Error Card';
  const errorCardSubtitle = 'Error Card Subtitle';

  it('renders without crashing', () => {
    const { container } = render(
      <ErrorCard title={errorCardTitle} subtitle={errorCardSubtitle} />
    );
    expect(container.firstChild).not.toBeNull();
  });

  it('renders text of error correctly', () => {
    render(<ErrorCard title={errorCardTitle} subtitle={errorCardSubtitle} />);
    expect(screen.getByText(errorCardTitle)).toBeDefined();
    expect(screen.getByText(errorCardSubtitle)).toBeDefined();
  });
});
