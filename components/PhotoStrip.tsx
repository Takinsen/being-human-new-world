"use client";

import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/content/types";
import { commonsImage, commonsPage } from "@/lib/format";

/**
 * PROTOTYPE (.scratch/place-photos/spec.md, Q9): three looks for the strip, switched with
 * `?variant=` on the map. Once one is picked, keep only that one and drop `variant`.
 * - a: one photo the card's width at a time, dots on it
 * - b: each about 82% wide so the next one peeks in, a 1/5 counter on it
 * - c: a row of small squares
 */
export type StripVariant = "a" | "b" | "c";

export function stripVariant(value: string | null | undefined): StripVariant {
  return value === "a" || value === "c" ? value : "b";
}

// Photos to swipe through sideways at the top of a Place card, hotlinked from Wikimedia
// Commons. One that fails to load drops out; with none left, the strip collapses and the
// card's icon beside the name carries it (docs/adr/0006). One line under the strip credits
// the photo on screen.
export function PhotoStrip({ photos, label, variant }: { photos: Photo[]; label: string; variant: StripVariant }) {
  const [failed, setFailed] = useState<string[]>([]);
  const [at, setAt] = useState(0);
  const track = useRef<HTMLUListElement>(null);
  const shown = photos.filter((p) => !failed.includes(p.file));
  const key = photos.map((p) => p.file).join("|");

  // Back to the first photo when the card shows another Place
  useEffect(() => {
    setFailed([]);
    setAt(0);
    track.current?.scrollTo({ left: 0 });
  }, [key]);

  // An image that failed before React hydrated never fires onError here.
  useEffect(() => {
    const broken = [...(track.current?.querySelectorAll("img") ?? [])]
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.dataset.file!);
    if (broken.length) setFailed((f) => [...f, ...broken]);
  }, [key]);

  // The photo on screen is the one nearest the track's start edge
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const start = el.getBoundingClientRect().left + parseFloat(getComputedStyle(el).scrollPaddingLeft || "0");
    let best = 0;
    let gap = Infinity;
    [...el.children].forEach((li, i) => {
      const d = Math.abs(li.getBoundingClientRect().left - start);
      if (d < gap) [best, gap] = [i, d];
    });
    // At the end of the track the last photo can't reach the start edge
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) best = el.children.length - 1;
    setAt(best);
  };

  if (!shown.length) return null;
  const current = shown[Math.min(at, shown.length - 1)];
  const many = shown.length > 1;

  return (
    <figure className={`strip strip-${variant}`}>
      <div className="strip-frame">
        <ul
          ref={track}
          className="strip-track"
          onScroll={onScroll}
          // Scrollable, so reachable by keyboard: arrow keys move along it
          tabIndex={many ? 0 : undefined}
          aria-label={many ? `รูปของ${label} ${shown.length} รูป ปัดหรือกดลูกศรเพื่อดูต่อ` : undefined}
        >
          {shown.map((photo, i) => (
            <li key={photo.file}>
              <img
                src={commonsImage(photo.file, variant === "c" ? 480 : 960)}
                alt={photo.alt}
                data-file={photo.file}
                loading={i === 0 ? undefined : "lazy"}
                draggable={false}
                onError={() => setFailed((f) => [...f, photo.file])}
              />
            </li>
          ))}
        </ul>
        {many && variant === "b" && (
          <span className="strip-count" aria-hidden="true">
            {at + 1}/{shown.length}
          </span>
        )}
        {many && variant === "a" && (
          <span className="strip-dots" aria-hidden="true">
            {shown.map((p, i) => (
              <span key={p.file} className={i === at ? "is-on" : undefined} />
            ))}
          </span>
        )}
      </div>
      <figcaption>
        <a
          href={commonsPage(current.file)}
          target="_blank"
          rel="noreferrer"
          aria-label={`ที่มาของภาพ${current.alt} บน Wikimedia Commons (เปิดแท็บใหม่)`}
        >
          ภาพจาก Wikimedia Commons
        </a>
      </figcaption>
    </figure>
  );
}
