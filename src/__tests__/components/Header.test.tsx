import { describe, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Header } from '../../components/Header';
import { APP_TITLE } from '../../constants';
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

describe('Header test', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProviders(<Header />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders the app title correctly', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText(APP_TITLE)).toBeDefined();
  });
});
