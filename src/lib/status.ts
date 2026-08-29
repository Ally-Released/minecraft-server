import { SERVER_CONFIG } from "./config";

/**
 * Normalised live-status shape consumed by the UI.
 *
 * `state` is deliberately three-valued: we never render a player count we did
 * not actually receive, and "the query API is down" is not the same claim as
 * "the server is down".
 */
export type ServerStatus = {
  state: "online" | "offline" | "unknown";
  players: { online: number; max: number } | null;
  version: string | null;
  motd: string | null;
  checkedAt: string;
};

export const UNKNOWN_STATUS: ServerStatus = {
  state: "unknown",
  players: null,
  version: null,
  motd: null,
  checkedAt: new Date(0).toISOString(),
};

type McStatusResponse = {
  online?: boolean;
  players?: { online?: number; max?: number } | null;
  version?: { name_clean?: string } | null;
  motd?: { clean?: string } | null;
};

/**
 * Queries the configured status API. Swapping providers means rewriting only
 * this function — everything downstream speaks `ServerStatus`.
 */
export async function fetchServerStatus(): Promise<ServerStatus> {
  const target = `${SERVER_CONFIG.status.endpoint}/${SERVER_CONFIG.ip}:${SERVER_CONFIG.port}`;
  const checkedAt = new Date().toISOString();

  try {
    const res = await fetch(target, {
      next: { revalidate: SERVER_CONFIG.status.revalidate },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return { ...UNKNOWN_STATUS, checkedAt };

    const data = (await res.json()) as McStatusResponse;
    if (!data.online) return { ...UNKNOWN_STATUS, state: "offline", checkedAt };

    const online = data.players?.online;
    const max = data.players?.max;

    return {
      state: "online",
      players:
        typeof online === "number" && typeof max === "number"
          ? { online, max }
          : null,
      version: data.version?.name_clean?.trim() || null,
      motd: data.motd?.clean?.trim().split("\n")[0] || null,
      checkedAt,
    };
  } catch {
    return { ...UNKNOWN_STATUS, checkedAt };
  }
}
