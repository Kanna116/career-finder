import { Component, type ErrorInfo, type ReactNode } from 'react';

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error loading component:', error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error.name}</pre>
          <pre>{this.state.error.message}</pre>
          <pre>{this.state.error.stack}</pre>
          <button onClick={this.handleRetry}>Retry</button>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
