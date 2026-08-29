# Clasher Network

The website for the Clasher Network Minecraft server. Next.js App Router, Tailwind v4, Motion.

```bash
npm run dev
```

## Changing server information

Everything server-specific lives in one file: [`src/lib/config.ts`](src/lib/config.ts). Address,
port, version, Discord invite, rules, features, and all section copy are read from `SERVER_CONFIG`.
No component contains a hardcoded server value — change it there and it changes everywhere.

Copy strings may contain `{ip}`, `{port}` and `{version}` placeholders; `fill()` resolves them.

## Live status

Player counts and online state are queried from a third-party status API, never invented.

- `src/lib/status.ts` — the adapter. It normalises whatever the provider returns into
  `ServerStatus`. Swapping providers means rewriting only `fetchServerStatus`.
- `src/app/api/status/route.ts` — the endpoint the browser polls once a minute.
- `SERVER_CONFIG.status` — endpoint URL and cache window.

`state` is three-valued on purpose: `online`, `offline`, and `unknown` (the query API itself failed).
When a value is missing the UI shows an em dash and says where its fallback came from, rather than
displaying a number nobody measured.

## The world

The hero landscape, the section dividers and the terrain inside the feature panels are all generated
by [`src/lib/terrain.ts`](src/lib/terrain.ts) — no image assets. `ridge()` produces stepped,
axis-aligned silhouettes from a seed; `treeline()` does the same for conifers. Because it is seeded,
server and client render identical markup.

`Ridge`'s `height` prop is the viewBox height and needs to roughly match the aspect ratio of the box
it is placed in — the SVG uses `slice`, so a tall viewBox inside a short band crops to solid fill.

## Structure

```
src/app/          layout, page composition, status route, OG image
src/components/scene/   the hero environment (WorldScene, Motes)
src/components/site/    page sections
src/components/ui/      Action, CopyIp, Reveal, Ridge
src/lib/          config, status adapter, terrain generator
```
