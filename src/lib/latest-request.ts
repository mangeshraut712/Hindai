/**
 * Keeps only the most recent async request. begin() invalidates the previous
 * handle so a late finally cannot clear a newer loading flag or overwrite
 * later results.
 */
export type LatestRequest = {
  signal: AbortSignal;
  isCurrent: () => boolean;
};

export function createLatestRequest() {
  let generation = 0;
  let controller: AbortController | null = null;

  return {
    begin(): LatestRequest {
      controller?.abort();
      controller = new AbortController();
      const id = ++generation;
      const signal = controller.signal;
      return {
        signal,
        isCurrent: () => id === generation,
      };
    },
  };
}
