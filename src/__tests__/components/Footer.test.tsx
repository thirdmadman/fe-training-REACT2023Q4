import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../../components/Footer';
import { APP_TITLE } from '../../constants';

describe('Footer test', () => {
  it('renders without crashing', () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders the app title correctly', () => {
    render(<Footer />);
    expect(screen.getByText(APP_TITLE)).toBeDefined();
  });
});
