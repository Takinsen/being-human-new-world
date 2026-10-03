"use client";

import { useEffect, useState } from "react";
import { timeAgo } from "@/lib/format";

/** How long ago, counted back all the way, never a full date (docs/adr/0007, amended 2026-10-02).
 * Counted again in the browser, since a page can be built long before it is read. */
export function TimeAgo({ iso, className }: { iso: string; className?: string }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);
  return (
    <time className={className} dateTime={iso} suppressHydrationWarning>
      {timeAgo(iso, now ?? undefined)}
    </time>
  );
}
