import { getDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

/** GET /api/health — pings MongoDB so a deploy can confirm the connection. */
export async function GET() {
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    return Response.json({ ok: true, db: db.databaseName });
  } catch (err) {
    console.error("MongoDB health check failed", err);
    return Response.json({ ok: false }, { status: 503 });
  }
}
