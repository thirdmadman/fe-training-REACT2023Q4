import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center w-screen h-screen flex-col">
          <h1 className="text-3xl">Sorry.. there was an error</h1>
          <h3 className="text-gray-500 text-2xl mt-5">Stack:</h3>
          <pre>{this.state?.errorInfo?.componentStack || ''}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
