"use client";

import { Component, type ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@vercel/analytics";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
  errorId: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorId: this.generateErrorId(),
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorId: Math.random().toString(36).substring(7),
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Enhanced error logging
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Track error in Vercel Analytics
    track("error_boundary", {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      url: typeof window !== "undefined" ? window.location.href : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      timestamp: new Date().toISOString(),
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // Send to error reporting service
    this.reportError(error, errorInfo);

    this.setState({ errorInfo });
  }

  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  private reportError(error: Error, errorInfo: React.ErrorInfo) {
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      url: typeof window !== "undefined" ? window.location.href : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      version: process.env.NEXT_PUBLIC_VERSION || "1.0.0",
    };

    console.error("Error Report:", JSON.stringify(errorReport, null, 2));
  }

  private handleRetry = () => {
    track("error_boundary_retry", { errorId: this.state.errorId });
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleGoHome = () => {
    track("error_boundary_go_home", { errorId: this.state.errorId });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
          <div className="mx-4 w-full max-w-md">
            <div className="rounded-lg bg-white p-6 text-center shadow-lg dark:bg-gray-900">
              <div className="mb-4 flex justify-center">
                <AlertTriangle className="h-16 w-16 text-red-500" />
              </div>

              <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                Something went wrong
              </h1>

              <p className="mb-6 text-gray-600 dark:text-gray-300">
                We encountered an unexpected error. Our team has been notified
                and is working to fix this issue.
              </p>

              <div className="space-y-3">
                <Button
                  onClick={this.handleRetry}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>

                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="w-full"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </div>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm font-medium text-gray-500 hover:text-gray-700">
                    Error Details (Development)
                  </summary>
                  <pre className="mt-2 max-h-40 overflow-auto rounded bg-gray-100 p-3 text-xs dark:bg-gray-800">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}

              <p className="mt-4 text-xs text-gray-500">
                Error ID: {this.state.errorId}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
}

// Hook for manual error reporting
export function useErrorReporting() {
  return {
    reportError: (error: Error, context?: Record<string, any>) => {
      track("manual_error_report", {
        error: error.message,
        stack: error.stack,
        ...context,
        timestamp: new Date().toISOString(),
      });

      console.error("Manual error report:", error, context);
    },
  };
}
