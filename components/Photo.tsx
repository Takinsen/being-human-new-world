"use client";

import { useState } from "react";
import type { Photo as PhotoData } from "@/content/types";
import { commonsImage, commonsPage } from "@/lib/format";

// Hotlinked from Wikimedia Commons. If it fails to load, the slot collapses.
export function Photo({ photo, className }: { photo: PhotoData; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <figure className={className ? `photo ${className}` : "photo"}>
      <img src={commonsImage(photo.file)} alt={photo.alt} loading="lazy" onError={() => setFailed(true)} />
      <figcaption>
        <a href={commonsPage(photo.file)} target="_blank" rel="noreferrer">
          ภาพ: Wikimedia Commons
        </a>
      </figcaption>
    </figure>
  );
}
