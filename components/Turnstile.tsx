"use client";

import Script from "next/script";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

// Cloudflare Turnstile widget, rendered explicitly so it can be reset after
// each submit (tokens are single-use). The widget's mode (managed, i.e. only
// interactive when Cloudflare is unsure) is set per widget in the Cloudflare
// dashboard, not here.
// https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const LOADED_EVENT = "turnstile:loaded";

interface TurnstileApi {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export interface TurnstileHandle {
  /** Clears the current token and asks Cloudflare for a fresh challenge. */
  reset: () => void;
}

interface TurnstileProps {
  siteKey: string;
  onToken: (token: string | null) => void;
}

/** Runs `cb` once the Turnstile script is available; returns an unsubscribe. */
function whenLoaded(cb: () => void): () => void {
  if (window.turnstile) {
    cb();
    return () => {};
  }
  window.addEventListener(LOADED_EVENT, cb, { once: true });
  return () => window.removeEventListener(LOADED_EVENT, cb);
}

const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(function Turnstile(
  { siteKey, onToken },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  // Latest callback without re-rendering the widget on every parent render.
  const onTokenRef = useRef(onToken);
  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      onTokenRef.current(null);
      if (widgetIdRef.current !== null) {
        window.turnstile?.reset(widgetIdRef.current);
      }
    },
  }));

  useEffect(() => {
    const unsubscribe = whenLoaded(() => {
      const container = containerRef.current;
      if (!container || !window.turnstile) return;
      widgetIdRef.current = window.turnstile.render(container, {
        sitekey: siteKey,
        size: "flexible",
        theme: "light",
        callback: (token: string) => onTokenRef.current(token),
        "expired-callback": () => onTokenRef.current(null),
        "error-callback": () => onTokenRef.current(null),
        "timeout-callback": () => onTokenRef.current(null),
      });
    });
    return () => {
      unsubscribe();
      if (widgetIdRef.current !== null) {
        window.turnstile?.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  return (
    <>
      <Script
        src={SCRIPT_SRC}
        strategy="afterInteractive"
        onLoad={() => window.dispatchEvent(new Event(LOADED_EVENT))}
      />
      <div ref={containerRef} />
    </>
  );
});

export default Turnstile;
