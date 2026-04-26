"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function PageProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setProgress(0);
    setIsVisible(true);

    const timer1 = setTimeout(() => setProgress(30), 50);
    const timer2 = setTimeout(() => setProgress(60), 150);
    const timer3 = setTimeout(() => setProgress(85), 300);
    const timer4 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsVisible(false), 400);
    }, 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [pathname, searchParams]);

  if (!isVisible && progress === 0) return null;

  return (
    <div
      className="fixed left-0 top-0 z-[100] h-1 transition-all duration-300 ease-out"
      style={{
        width: `${progress}%`,
        opacity: isVisible ? 1 : 0,
        background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
        boxShadow: "0 0 8px hsl(var(--primary) / 0.5)",
        transitionDuration: progress === 100 ? "200ms" : "300ms",
      }}
      aria-hidden="true"
    />
  );
}
