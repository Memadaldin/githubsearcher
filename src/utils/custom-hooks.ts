import { useState, useCallback } from "react";

export function useRetryVariable(): [number, () => void] {
  const [n, setRetry] = useState(0);
  const forceRetry = useCallback(() => setRetry((n) => n + 1), [setRetry]);
  return [n, forceRetry];
}
