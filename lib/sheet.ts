// Google Sheet behind an Apps Script web app (sheet/apps-script.gs, docs/adr/0005).
// Without SHEET_API_URL the site runs on content/*.ts alone.

export const SHEET_TAG = "sheet";

export type SheetRows = {
  prices: { timestamp: string; placeId: string; min: string; max: string; per: string; by: string }[];
  notes: { timestamp: string; placeId: string; seniorId: string; note: string; homeTaste: string }[];
  seniors: {
    timestamp: string;
    id: string;
    name: string;
    hometown: string;
    region: string;
    about: string;
    story: string;
    quote: string;
  }[];
  guides: { timestamp: string; guideId: string; by: string }[];
};

export type Tab = keyof SheetRows;

const empty: SheetRows = { prices: [], notes: [], seniors: [], guides: [] };

export function sheetConfigured(): boolean {
  return Boolean(process.env.SHEET_API_URL);
}

/** Every tab, oldest row first. Falls back to no rows if the Sheet can't be reached. */
export async function readSheet(): Promise<SheetRows> {
  const url = process.env.SHEET_API_URL;
  if (!url) return empty;
  try {
    const res = await fetch(url, {
      next: { revalidate: 30, tags: [SHEET_TAG] },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { ...empty, ...(await res.json()) };
  } catch (err) {
    console.error("Reading the Google Sheet failed; showing content/*.ts only", err);
    return empty;
  }
}

export async function appendRow<T extends Tab>(
  tab: T,
  row: Omit<SheetRows[T][number], "timestamp">,
): Promise<void> {
  const url = process.env.SHEET_API_URL;
  if (!url) throw new Error("SHEET_API_URL is not set");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ tab, row }),
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.ok) throw new Error(`Sheet write failed: ${res.status} ${JSON.stringify(body)}`);
}
