import { describe, expect } from 'vitest';
import { ItemsPerPageSelect } from '../../components/ItemsPerPageSelect';
import { renderWithProviders } from '../utils/test-utils';
import { screen } from '@testing-library/react';

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

describe('ItemsPerPageSelect test', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProviders(<ItemsPerPageSelect />);

    expect(container.childElementCount).toBe(1);
  });

  it('renders select with correct item selected', () => {
    const itemsPerPage = 4;

    renderWithProviders(<ItemsPerPageSelect />, {
      preloadedState: {
        search: {
          itemsPerPage,
          paginationPage: 1,
          searchString: '',
        },
      },
    });

    expect(screen.getByTestId<HTMLSelectElement>('select').value).toBe(
      itemsPerPage.toString()
    );
  });
});
