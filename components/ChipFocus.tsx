"use client";

import { useEffect } from "react";

// A chip half under a scrolling row's edge fade gets focus without the browser
// scrolling it in, since part of it already shows. Bring it fully into view (UX audit 4, A4).
export function ChipFocus() {
  useEffect(() => {
    const onFocus = (e: FocusEvent) => {
      if (e.target instanceof HTMLElement && e.target.matches(".line-chip"))
        e.target.scrollIntoView({ inline: "nearest", block: "nearest" });
    };
    document.addEventListener("focusin", onFocus);
    return () => document.removeEventListener("focusin", onFocus);
  }, []);
  return null;
}

/** Put inside a chip row, keyed by the current filter: the chip for the page you're on starts in view (audit 8, R7) */
export function ChipInView() {
  useEffect(() => {
    document.querySelector(".line-filters [aria-current='page']")?.scrollIntoView({ inline: "center", block: "nearest" });
  }, []);
  return null;
}
