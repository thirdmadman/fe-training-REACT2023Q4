import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '../../components/Layout';

describe('Layout test', () => {
  test('renders children inside a div with the correct class', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Routes>
          <Route path="*" element={<Layout />}>
            <Route
              path="*"
              element={<div data-testid="test-child">Test Child</div>}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const childElement = getByTestId('test-child');
    const layoutDiv = document.querySelector('.bg-white');

    expect(childElement).not.toBeNull();
    expect(layoutDiv).not.toBeNull();
    expect(layoutDiv?.classList.contains('min-h-screen')).toBeTruthy();
  });
});
