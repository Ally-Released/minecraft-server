"use client";

import { useEffect, useState } from "react";
import type { ServerStatus } from "./status";

/**
 * Keeps the server-rendered status fresh. The route it polls is HTTP-cached,
 * so multiple consumers on one page cost one request per cache window.
 */
export function useLiveStatus(initial: ServerStatus): ServerStatus {
  const [status, setStatus] = useState(initial);

  useEffect(() => {
    let alive = true;

    const load = async () => {
      try {
        const res = await fetch("/api/status");
        if (!res.ok || !alive) return;
        setStatus((await res.json()) as ServerStatus);
      } catch {
        /* keep the last known value rather than inventing one */
      }
    };

    // A prerendered page can be minutes old; correct it as soon as we mount.
    load();
    const id = setInterval(load, 60_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  return status;
}
