import React, { Component, ErrorInfo, ReactNode } from 'react';
import { errorHandler, SanitizedError } from '../../services/errorHandler';
import { ErrorView } from './ErrorView';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  sanitizedError: SanitizedError | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    sanitizedError: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    const sanitized = errorHandler.sanitize(error);
    return { hasError: true, sanitizedError: sanitized };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log privately without exposing stack traces to the user
    console.warn('[CropDoctor Guarded Recovery]: Application state recovered.');
  }

  private handleReset = () => {
    this.setState({ hasError: false, sanitizedError: null });
    window.location.reload();
  };

  private handleGoHome = () => {
    this.setState({ hasError: false, sanitizedError: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError && this.state.sanitizedError) {
      return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
          <ErrorView
            error={this.state.sanitizedError}
            onRetry={this.handleReset}
            onGoHome={this.handleGoHome}
          />
        </div>
      );
    }

    return this.props.children;
  }
}
