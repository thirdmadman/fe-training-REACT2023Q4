import React from 'react';
import { describe, it, vi, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { MainPage } from '../../pages/MainPage';
import { store } from '../../redux/store';

describe('MainPage Component', () => {
  vi.mock('react-router-dom', async () => {
    const actual =
      await vi.importActual<typeof import('react-router-dom')>(
        'react-router-dom'
      );
    return {
      ...actual,
      useNavigate: vi.fn(() => () => {}),
      useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders MainPage and displays loading', () => {
    const router = createMemoryRouter([{ path: '/', element: <MainPage /> }]);

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    expect(screen.getByText('Loading...')).not.toBeNull();
  });
});
