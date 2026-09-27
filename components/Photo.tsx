"use client";

import { useState } from "react";
import type { CategoryId, IconKey, Photo as PhotoData } from "@/content/types";
import { commonsImage, commonsPage } from "@/lib/format";
import { IconFor } from "./icons";

// Hotlinked from Wikimedia Commons. With no photo, or one that fails to load,
// the slot shows the topic's icon on its category colour instead.
export function Photo({
  photo,
  category,
  icon,
  className,
}: {
  photo?: PhotoData;
  category: CategoryId;
  icon: IconKey;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const classes = ["photo", className].filter(Boolean).join(" ");
  if (!photo || failed) {
    return (
      <div className={`${classes} is-illustration`} data-line={category} aria-hidden="true">
        <IconFor name={icon} />
      </div>
    );
  }
  return (
    <figure className={classes} data-line={category}>
      <img src={commonsImage(photo.file)} alt={photo.alt} loading="lazy" onError={() => setFailed(true)} />
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
