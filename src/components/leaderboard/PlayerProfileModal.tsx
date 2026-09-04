/**
 * PlayerProfileModal — DEPRECATED
 *
 * This component is no longer rendered. The canonical player profile lives at /u/[username].
 * The leaderboard now navigates directly to that route on player click.
 *
 * The file is kept in place to avoid breaking any lingering imports.
 * If you need the old modal UI, check git history.
 */

// No-op export so any forgotten import doesn't cause a build error
export function PlayerProfileModal(_props: {
  player?: unknown;
  selectedUuid?: unknown;
  onClose?: () => void;
  onSelectPlayer?: (player: unknown) => void;
}) {
  return null;
}
