"use client";

import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";

const SiteBootSplash = dynamic(
  () => import("@/components/site-boot-splash").then((m) => m.SiteBootSplash),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <MotionConfig reducedMotion="user">
          <SiteBootSplash />
          {children}
        </MotionConfig>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
