import { useCallback, useLayoutEffect, useRef } from "react";

// From https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md
export function useEvent<Args extends unknown[], Return>(
  handler: (...args: Args) => Return
) {
  const handlerRef = useRef<((...args: Args) => Return) | null>(null);

  // In a real implementation, this would run before layout effects
  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: Args) => {
    // In a real implementation, this would throw if called during render
    const fn = handlerRef.current;
    if (fn === null) {
      throw new Error("function should be defined");
    }

    return fn(...args);
  }, []);
}
