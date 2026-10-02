"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { tabs } from "./TabBar";

// A swipe counts when it's long, mostly sideways and quick, so reading and scrolling never trip it.
const MIN_DISTANCE = 60;
const MIN_SLOPE = 1.5;
const MAX_TIME = 600;
// iOS takes a swipe from the screen's edge as "back"; leave those to it.
const EDGE = 24;
// Places where a sideways drag already means something: chip rows, fields, anything that scrolls sideways
const OWN_DRAG = ".line-filters, input, textarea, select, [contenteditable], .leaflet-container";

/** On a tab's own page (/notes, /guides, /checklist), a sideways swipe moves to the next or previous tab */
export function SwipeTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const arrived = useRef<(() => void) | null>(null);

  // The slide's "after" picture is taken once the new page is on screen
  useLayoutEffect(() => {
    arrived.current?.();
    arrived.current = null;
  }, [pathname]);

  useEffect(() => {
    const index = tabs.findIndex((t) => t.href === pathname);
    // Not on the map (dragging pans it), nor below a tab (a Guide, the Note form), where a swipe could lose what you were doing
    if (index < 1) return;
    const neighbours = [tabs[index - 1], tabs[index + 1]].filter(Boolean);
    neighbours.forEach((t) => router.prefetch(t.href));

    let start: { x: number; y: number; t: number } | null = null;
    // Touch events, not pointer events: the browser cancels a pointer as soon as it starts scrolling
    const onStart = (e: TouchEvent) => {
      start = null;
      if (e.touches.length !== 1) return; // A pinch
      const { clientX: x, clientY: y } = e.touches[0];
      if (x < EDGE || x > window.innerWidth - EDGE) return;
      if (e.target instanceof Element && (e.target.closest(OWN_DRAG) || scrollsSideways(e.target))) return;
      start = { x, y, t: e.timeStamp };
    };
    const onEnd = (e: TouchEvent) => {
      if (!start || e.touches.length > 0) return;
      const { clientX, clientY } = e.changedTouches[0];
      const dx = clientX - start.x;
      const dy = clientY - start.y;
      const quick = e.timeStamp - start.t <= MAX_TIME;
      start = null;
      if (!quick || Math.abs(dx) < MIN_DISTANCE || Math.abs(dx) < MIN_SLOPE * Math.abs(dy)) return;
      if (!(window.getSelection()?.isCollapsed ?? true)) return; // Selecting text, not swiping
      // Finger to the left brings in the tab on the right
      const next = tabs[index + (dx < 0 ? 1 : -1)];
      if (next) go(next.href, dx < 0 ? "left" : "right");
    };
    const onCancel = () => (start = null);

    const go = (href: string, direction: "left" | "right") => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !document.startViewTransition) {
        router.push(href);
        return;
      }
      const root = document.documentElement;
      root.dataset.swipe = direction;
      const transition = document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            arrived.current = resolve;
            router.push(href);
            // A slow page shouldn't hold the screen frozen; slide with what's there
            setTimeout(resolve, 800);
          }),
      );
      transition.finished.finally(() => delete root.dataset.swipe);
    };

    const opts = { passive: true };
    document.addEventListener("touchstart", onStart, opts);
    document.addEventListener("touchend", onEnd, opts);
    document.addEventListener("touchcancel", onCancel, opts);
    return () => {
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchend", onEnd);
      document.removeEventListener("touchcancel", onCancel);
    };
  }, [pathname, router]);

  return null;
}

function scrollsSideways(el: Element | null): boolean {
  for (; el && el !== document.body; el = el.parentElement) {
    const { overflowX } = getComputedStyle(el);
    if ((overflowX === "auto" || overflowX === "scroll") && el.scrollWidth > el.clientWidth) return true;
  }
  return false;
}
