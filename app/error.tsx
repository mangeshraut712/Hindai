"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Error page caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <AlertCircle className="mx-auto h-16 w-16 text-destructive" />
        <h1 className="mt-6 text-3xl font-bold tracking-tight">
          Something went wrong
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          We apologize for the inconvenience. An unexpected error has occurred.
          Our team has been notified.
        </p>
        {error.message && (
          <div className="mt-6 rounded-lg bg-muted p-4">
            <p className="text-sm font-medium text-muted-foreground">
              Error details:
            </p>
            <code className="mt-2 block max-w-md overflow-auto text-xs text-destructive">
              {error.message}
            </code>
            {error.digest && (
              <p className="mt-2 text-xs text-muted-foreground">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button onClick={reset} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
          <Button asChild>
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
