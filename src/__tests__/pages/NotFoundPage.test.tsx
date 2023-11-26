import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '../../pages/404';

describe('Not found page test', () => {
  it('renders without crashing', () => {
    const { container } = render(<NotFoundPage />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders text correctly', () => {
    render(<NotFoundPage />);
    expect(
      screen.getByText('Oops! The page you are looking for could not be found.')
    ).toBeDefined();
  });
});
