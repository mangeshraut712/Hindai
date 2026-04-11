import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <BookOpen className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-6 text-4xl font-bold tracking-tight">404</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Page not found
        </p>
        <p className="mt-4 max-w-md text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
