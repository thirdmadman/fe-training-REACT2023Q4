import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import routes from '../routes';
import { screen } from '@testing-library/react';
import { renderWithProviders } from './utils/test-utils';

describe('main test', () => {
  it('renders 404 page', () => {
    renderWithProviders(
      <RouterProvider
        router={createMemoryRouter([routes], {
          initialEntries: ['/no_path'],
          initialIndex: 0,
        })}
      />
    );

    expect(
      screen.getByText('Oops! The page you are looking for could not be found.')
    ).not.toBeNull();
  });
});
