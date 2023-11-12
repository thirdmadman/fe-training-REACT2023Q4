import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '../../components/Header';
import { APP_TITLE } from '../../constants';

describe('Header test', () => {
  it('renders without crashing', () => {
    const { container } = render(<Header />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders the app title correctly', () => {
    render(<Header />);
    expect(screen.getByText(APP_TITLE)).toBeDefined();
  });
});
