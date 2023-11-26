import { render } from '@testing-library/react';
import { PageLayout } from '../../../components/shared/PageLayout';

describe('Layout test', () => {
  it('renders children inside a div with the correct class', () => {
    const { getByTestId } = render(
      <PageLayout>
        <div data-testid="test-child">Test Child</div>
      </PageLayout>
    );

    const childElement = getByTestId('test-child');
    const layoutDiv = document.querySelector('.bg-white');

    expect(childElement).not.toBeNull();
    expect(layoutDiv).not.toBeNull();
    expect(layoutDiv?.classList.contains('min-h-screen')).toBeTruthy();
  });
});
