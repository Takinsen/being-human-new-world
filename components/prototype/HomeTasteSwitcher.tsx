"use client";

// PROTOTYPE (home-taste), throwaway: the floating bar. ←/→ cycle ?ht=A|B|C, P flips ?at=guides|page.
// Shows in `next dev`, or in a build with NEXT_PUBLIC_PROTOTYPE=1.

import { useEffect } from "react";
import { VARIANTS, useVariant } from "./HomeTasteVariants";

function setParam(name: string, value: string) {
  const url = new URL(location.href);
  url.searchParams.set(name, value);
  history.replaceState(history.state, "", url);
  window.dispatchEvent(new Event("prototype-params"));
}

export function HomeTasteSwitcher() {
  const { variant, at } = useVariant();
  const i = Math.max(0, VARIANTS.findIndex((v) => v.key === variant));
  const cycle = (step: number) => setParam("ht", VARIANTS[(i + step + VARIANTS.length) % VARIANTS.length].key);
  const flipAt = () => setParam("at", at === "page" ? "guides" : "page");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, [contenteditable]") || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowLeft") cycle(-1);
      else if (e.key === "ArrowRight") cycle(1);
      else if (e.key === "p" || e.key === "P") flipAt();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_PROTOTYPE !== "1") return null;
  return (
    <div className="proto-bar" role="toolbar" aria-label="Prototype: รสชาติบ้าน">
      <button type="button" onClick={() => cycle(-1)} aria-label="แบบก่อนหน้า">←</button>
      <span>
        {VARIANTS[i].key} · {VARIANTS[i].name}
      </span>
      <button type="button" onClick={() => cycle(1)} aria-label="แบบถัดไป">→</button>
      <button type="button" onClick={flipAt} className="proto-at">
        {at === "page" ? "หน้าแยก /home-taste" : "บนสุดหมวดของกิน"}
      </button>
    </div>
  );
}
