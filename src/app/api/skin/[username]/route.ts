import { NextRequest, NextResponse } from "next/server";

// Curated high-tier competitive PvP warrior skin textures (all verified 200 PNG)
const PVP_WARRIOR_TEXTURES = [
  "https://minotar.net/skin/Technoblade",
  "https://minotar.net/skin/Dream",
  "https://minotar.net/skin/Purpled",
  "https://minotar.net/skin/Sapnap",
  "https://minotar.net/skin/xNestorio",
];

// In-memory cache to make responses instantaneous (<5ms)
interface CacheEntry {
  buffer: ArrayBuffer;
  contentType: string;
  expires: number;
}
const cache = new Map<string, CacheEntry>();

// Simple deterministic string hash
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Fetch helper with timeout
async function fetchTexture(url: string, timeoutMs = 1500): Promise<ArrayBuffer | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Minecraft-Server-Web/2.0" },
    });
    clearTimeout(timer);
    if (res.ok) {
      const buf = await res.arrayBuffer();
      if (buf.byteLength > 600) {
        return buf;
      }
    }
  } catch {
    // Timeout or network drop
  }
  return null;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  const { username } = await context.params;
  const searchParams = request.nextUrl.searchParams;
  const customUrl = searchParams.get("url");

  if (!username) {
    return new NextResponse("Username required", { status: 400 });
  }

  const cacheKey = customUrl ? `custom:${customUrl}` : username.toLowerCase();
  const now = Date.now();

  // 1. Check in-memory fast cache
  const cached = cache.get(cacheKey);
  if (cached && cached.expires > now) {
    return new NextResponse(cached.buffer, {
      status: 200,
      headers: {
        "Content-Type": cached.contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  // 2. If a direct texture URL was supplied (e.g. from Supabase skin_url)
  if (customUrl && customUrl.startsWith("http")) {
    let secureUrl = customUrl;
    if (secureUrl.startsWith("http://textures.minecraft.net")) {
      secureUrl = secureUrl.replace("http://", "https://");
    }
    const customBuf = await fetchTexture(secureUrl, 2500);
    if (customBuf) {
      cache.set(cacheKey, { buffer: customBuf, contentType: "image/png", expires: now + 3600000 });
      return new NextResponse(customBuf, {
        status: 200,
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=86400, s-maxage=604800",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }

  // 3. Try cracked network (Ely.by) first so cracked players with premium names get their actual cracked skin
  const elyBuf = await fetchTexture(`https://skin.ely.by/skins/${encodeURIComponent(username)}.png`, 1400);
  if (elyBuf) {
    cache.set(cacheKey, { buffer: elyBuf, contentType: "image/png", expires: now + 86400000 });
    return new NextResponse(elyBuf, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, s-maxage=604800",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  // 4. Try premium network (Crafthead) - it will safely return Steve if the user is not found
  const premiumBuf = await fetchTexture(`https://crafthead.net/skin/${encodeURIComponent(username)}`, 2000);
  if (premiumBuf) {
    cache.set(cacheKey, { buffer: premiumBuf, contentType: "image/png", expires: now + 86400000 });
    return new NextResponse(premiumBuf, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, s-maxage=604800",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  // Final fallback to generic Steve if all networks fail
  return NextResponse.redirect("https://crafthead.net/skin/Steve");
}
