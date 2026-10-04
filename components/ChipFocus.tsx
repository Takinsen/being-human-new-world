"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

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
  useChipFades();
  return null;
}

// A chip row fades only at an edge with more chips past it (app/globals.css, .line-filters[data-more]):
// marked when a page's rows come in, and on every scroll and change of size (fonts landing included).
function useChipFades() {
  const pathname = usePathname();
  useEffect(() => {
    const mark = (row: HTMLElement) => {
      const more = [];
      if (row.scrollLeft > 1) more.push("left");
      if (row.scrollLeft + row.clientWidth < row.scrollWidth - 1) more.push("right");
      row.dataset.more = more.join(" ");
    };
    // Scroll doesn't bubble; caught on the way down, it reaches here from any row
    const onScroll = (e: Event) => {
      if (e.target instanceof HTMLElement && e.target.matches(".line-filters")) mark(e.target);
    };
    // Observing marks each row once at the start too
    // (the chips too: a font landing widens them, not the row)
    const sized = new ResizeObserver((entries) =>
      entries.forEach((e) => mark(e.target.closest<HTMLElement>(".line-filters")!)),
    );
    document.querySelectorAll<HTMLElement>(".line-filters").forEach((row) => {
      sized.observe(row);
      for (const chip of row.children) sized.observe(chip);
    });
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    return () => {
      document.removeEventListener("scroll", onScroll, { capture: true });
      sized.disconnect();
    };
  }, [pathname]);
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
