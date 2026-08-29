import { fetchServerStatus } from "@/lib/status";

export async function GET() {
  const status = await fetchServerStatus();
  return Response.json(status, {
    headers: { "cache-control": "public, max-age=30, stale-while-revalidate=120" },
  });
}
