"use client";

import { useEffect } from "react";

// A chip half under a scrolling row's edge fade gets focus without the browser
// scrolling it in, since part of it already shows. Bring it fully into view (UX audit 4, A4).
export function ChipFocus() {
  useEffect(() => {
    const onFocus = (e: FocusEvent) => {
      if (!(e.target instanceof HTMLElement)) return;
      if (e.target.matches(".line-chip")) e.target.scrollIntoView({ inline: "nearest", block: "nearest" });
      // The browser counts something under the floating tab bar as in view; lift it clear (audit 9, N4)
      if (e.target.closest(".tab-bar")) return; // The bar's own links are meant to be on it
      // A bar slid away while scrolling covers nothing (and may still be mid-slide)
      const bar = document.querySelector(".tab-bar:not([data-hidden])")?.getBoundingClientRect();
      const r = e.target.getBoundingClientRect();
      if (bar && r.bottom > bar.top && r.top < bar.bottom) window.scrollBy({ top: r.bottom - bar.top + 16 });
    };
    document.addEventListener("focusin", onFocus);
    return () => document.removeEventListener("focusin", onFocus);
  }, []);
  return null;
}

/** Put inside a chip row, keyed by the current filter: the chip for the page you're on starts in view (audit 8, R7) */
// Scrolls only the row: scrollIntoView would also move where the first Tab starts,
// skipping the skip link (audit 9, N1).
export function ChipInView() {
  useEffect(() => {
    const chip = document.querySelector<HTMLElement>(".line-filters [aria-current='page']");
    const row = chip?.closest<HTMLElement>(".line-filters");
    if (!chip || !row) return;
    const hidden = chip.offsetLeft < row.scrollLeft || chip.offsetLeft + chip.offsetWidth > row.scrollLeft + row.clientWidth;
    if (hidden) row.scrollLeft = chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2;
  }, []);
  return null;
}
