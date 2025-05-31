import { Component, ErrorInfo, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// Custom hook to handle 404 errors
export const useNotFound = () => {
  const navigate = useNavigate();
  
  const handleNotFound = (error: any) => {
    if (error?.response?.status === 404) {
      navigate('/404');
    }
  };

  return { handleNotFound };
};

export const withErrorBoundary = (Component: React.ComponentType, FallbackComponent?: React.ComponentType) => {
  return (props: any) => (
    <ErrorBoundary fallback={FallbackComponent ? <FallbackComponent /> : <div>Something went wrong</div>}>
      <Component {...props} />
    </ErrorBoundary>
  );
};
