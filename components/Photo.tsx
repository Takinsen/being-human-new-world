"use client";

import { useEffect, useRef, useState } from "react";
import type { Photo as PhotoData } from "@/content/types";
import { commonsImage, commonsPage } from "@/lib/format";

// Hotlinked from Wikimedia Commons. If it fails to load, the slot collapses:
// the page's title already carries the topic's icon (docs/adr/0006).
export function Photo({ photo, className }: { photo?: PhotoData; className?: string }) {
  const [failed, setFailed] = useState(false);
  const img = useRef<HTMLImageElement>(null);

  // An image that failed before React hydrated never fires onError here.
  useEffect(() => {
    const el = img.current;
    if (el?.complete && el.naturalWidth === 0) setFailed(true);
  }, [photo?.file]);

  if (!photo || failed) return null;
  return (
    <figure className={className ? `photo ${className}` : "photo"}>
      <img ref={img} src={commonsImage(photo.file)} alt={photo.alt} loading="lazy" onError={() => setFailed(true)} />
      <figcaption>
        <a
          href={commonsPage(photo.file)}
          target="_blank"
          rel="noreferrer"
          aria-label={`ที่มาของภาพ${photo.alt} บน Wikimedia Commons (เปิดแท็บใหม่)`}
        >
          ภาพ: Wikimedia Commons
        </a>
      </figcaption>
    </figure>
  );
}
