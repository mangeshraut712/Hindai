// src/lib/performance.ts
import { track } from "@vercel/analytics";

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window !== "undefined") {
      this.setupObservers();
    }
  }

  private setupObservers() {
    // Core Web Vitals
    if ("PerformanceObserver" in window) {
      // LCP (Largest Contentful Paint)
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.recordMetric({
            name: "LCP",
            value: lastEntry.startTime,
            timestamp: Date.now(),
            metadata: { element: (lastEntry as any).element?.tagName },
          });
        });
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
        this.observers.push(lcpObserver);
      } catch {
        // LCP observer not supported
      }

      // FID (First Input Delay)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            this.recordMetric({
              name: "FID",
              value: (entry as any).processingStart - entry.startTime,
              timestamp: Date.now(),
              metadata: { inputType: (entry as any).name },
            });
          });
        });
        fidObserver.observe({ entryTypes: ["first-input"] });
        this.observers.push(fidObserver);
      } catch {
        // FID observer not supported
      }

      // CLS (Cumulative Layout Shift)
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          });
          this.recordMetric({
            name: "CLS",
            value: clsValue,
            timestamp: Date.now(),
          });
        });
        clsObserver.observe({ entryTypes: ["layout-shift"] });
        this.observers.push(clsObserver);
      } catch {
        // CLS observer not supported
      }
    }

    // Navigation timing
    if ("performance" in window && "getEntriesByType" in performance) {
      window.addEventListener("load", () => {
        const navigation = performance.getEntriesByType(
          "navigation"
        )[0] as PerformanceNavigationTiming;
        if (navigation) {
          this.recordMetric({
            name: "TTFB",
            value: navigation.responseStart - navigation.requestStart,
            timestamp: Date.now(),
          });

          this.recordMetric({
            name: "DOM_Load",
            value: navigation.loadEventEnd - navigation.loadEventStart,
            timestamp: Date.now(),
          });
        }
      });
    }
  }

  recordMetric(metric: PerformanceMetric) {
    this.metrics.push(metric);

    // Track in Vercel Analytics
    track(`performance_${metric.name}`, {
      value: metric.value,
      ...metric.metadata,
    });

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      // Performance metric logged in development
    }
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  getAverageMetric(name: string): number {
    const metrics = this.metrics.filter((m) => m.name === name);
    if (metrics.length === 0) return 0;
    return metrics.reduce((sum, m) => sum + m.value, 0) / metrics.length;
  }

  destroy() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// React hook for performance monitoring
export function usePerformance() {
  return {
    recordMetric: performanceMonitor.recordMetric.bind(performanceMonitor),
    getMetrics: performanceMonitor.getMetrics.bind(performanceMonitor),
    getAverageMetric: performanceMonitor.getAverageMetric.bind(performanceMonitor),
  };
}

// Utility functions
export function measureExecutionTime<T>(name: string, fn: () => T): T {
  const start = performance.now();
  const result = fn();
  const end = performance.now();

  performanceMonitor.recordMetric({
    name,
    value: end - start,
    timestamp: Date.now(),
  });

  return result;
}

export async function measureAsyncExecutionTime<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();

  performanceMonitor.recordMetric({
    name,
    value: end - start,
    timestamp: Date.now(),
  });

  return result;
}
