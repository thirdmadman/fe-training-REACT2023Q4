import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../../components/ErrorBoundaries';

interface TestErrorComponentProps {
  throwError?: boolean;
}

const TestErrorComponent: React.FC<TestErrorComponentProps> = ({
  throwError,
}) => {
  if (throwError) {
    throw new Error('Test error');
  }
  return <div>Component without error</div>;
};

describe('ErrorBoundary test', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <TestErrorComponent />
      </ErrorBoundary>
    );

    const componentWithoutError = screen.getByText('Component without error');
    expect(componentWithoutError).not.toBeNull();
  });

  it('renders error message and stack trace when an error occurs', () => {
    render(
      <ErrorBoundary>
        <TestErrorComponent throwError={true} />
      </ErrorBoundary>
    );

    const errorMessage = screen.getByText('Sorry.. there was an error');
    const stackTraceHeader = screen.getByText('Stack:');

    expect(errorMessage).not.toBeNull();
    expect(stackTraceHeader).not.toBeNull();
  });

  it('displays component stack in the error message', () => {
    render(
      <ErrorBoundary>
        <TestErrorComponent throwError={true} />
      </ErrorBoundary>
    );

    const stackTrace = screen.getByTestId('stack');
    expect(stackTrace).not.toBeNull();
  });
});
