import * as React from "react";

export function useAnimationFrame<T>(callback: () => T, callbackDeps: any[] = []): T {
  const [result] = React.useState<{ current: T }>(() => ({ current: callback() }));
  const rafId = React.useRef<number>();

  React.useEffect(() => {
    function loop() {
      rafId.current != null && cancelAnimationFrame(rafId.current);
      result.current = callback();
      rafId.current = requestAnimationFrame(loop);
    }

    rafId.current = requestAnimationFrame(loop);
    return () => {
      rafId.current != null && cancelAnimationFrame(rafId.current);
    };
    // Only want to change when the callback _deps_ change, not the function itself
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...callbackDeps]);

  return result.current;
}
