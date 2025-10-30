"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4 max-w-md px-4">
        <h2 className="text-2xl font-bold text-foreground">Something went wrong!</h2>
        <p className="text-muted-foreground">
          We encountered an error. Please try again or return to the homepage.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={reset}
            className="rounded-2xl bg-[#007AFF] text-white hover:bg-[#0056CC]"
          >
            Try again
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-2xl"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

