"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { startMotion } from "./PageMotion";
import { tabs } from "./tabs";

// The page follows a sideways drag (.scratch/map-polish/spec.md, Q8). Let go far enough, or with a
// flick, and it carries on out as the next tab slides in (PageMotion.tsx picks it up from where the
// finger left it); otherwise it springs back. A drag that starts mostly up or down is a scroll.
const LOCK = 10; // px moved before deciding which way the drag goes
const MIN_SLOPE = 1.5;
const COMMIT = 0.25; // of the screen's width
const FLICK = 0.4; // px per ms, over at least FLICK_DISTANCE
const FLICK_DISTANCE = 30;
// Past the last tab the page only gives a little
const RESIST = 0.3;
// iOS takes a swipe from the screen's edge as "back"; leave those to it.
const EDGE = 24;
// Places where a sideways drag already means something: chip rows, fields, anything that scrolls sideways
const OWN_DRAG = ".line-filters, input, textarea, select, [contenteditable], .leaflet-container";

/** On a tab's own page (/notes, /guides, /checklist), a sideways swipe moves to the next or previous tab */
export function SwipeTabs() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const index = tabs.findIndex((t) => t.href === pathname);
    // Not on the map (dragging pans it), nor below a tab (a Guide, the Note form), where a swipe could lose what you were doing
    if (index < 1) return;
    const neighbours = [tabs[index - 1], tabs[index + 1]].filter(Boolean);
    neighbours.forEach((t) => router.prefetch(t.href));

    let drag: { x: number; y: number; dx: number; on: "unsure" | "sideways"; last: { x: number; t: number }; v: number } | null = null;
    const frame = () => document.querySelector<HTMLElement>(".page-frame");
    const moves = () => window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    const shift = (dx: number) => {
      const f = frame();
      if (!f) return;
      f.style.transition = "";
      f.style.transform = dx ? `translateX(${dx}px)` : "";
    };
    const springBack = () => {
      const f = frame();
      if (!f?.style.transform) return;
      f.style.transition = "transform 0.2s ease-out";
      f.style.transform = "";
      f.addEventListener("transitionend", () => (f.style.transition = ""), { once: true });
    };

    // Touch events, not pointer events: the browser cancels a pointer as soon as it starts scrolling
    const onStart = (e: TouchEvent) => {
      drag = null;
      if (e.touches.length !== 1) return; // A pinch
      const { clientX: x, clientY: y } = e.touches[0];
      if (x < EDGE || x > window.innerWidth - EDGE) return;
      if (e.target instanceof Element && (e.target.closest(OWN_DRAG) || scrollsSideways(e.target))) return;
      drag = { x, y, dx: 0, on: "unsure", last: { x, t: e.timeStamp }, v: 0 };
    };
    const onMove = (e: TouchEvent) => {
      if (!drag || e.touches.length !== 1) return;
      const { clientX, clientY } = e.touches[0];
      const dx = clientX - drag.x;
      const dy = clientY - drag.y;
      if (drag.on === "unsure") {
        if (Math.abs(dx) < LOCK && Math.abs(dy) < LOCK) {
          // Mostly sideways so far: keep the browser from starting its own swipe back meanwhile
          if (Math.abs(dx) > Math.abs(dy)) e.preventDefault();
          return;
        }
        if (Math.abs(dx) < MIN_SLOPE * Math.abs(dy) || !(window.getSelection()?.isCollapsed ?? true)) {
          drag = null; // A scroll, or selecting text
          return;
        }
        drag.on = "sideways";
      }
      e.preventDefault(); // Sideways now: the page doesn't scroll under the finger
      const dt = e.timeStamp - drag.last.t;
      if (dt > 0) drag.v = (clientX - drag.last.x) / dt;
      drag.last = { x: clientX, t: e.timeStamp };
      drag.dx = dx;
      const next = tabs[index + (dx < 0 ? 1 : -1)];
      if (moves()) shift(next ? dx : dx * RESIST);
    };
    const onEnd = (e: TouchEvent) => {
      if (!drag || e.touches.length > 0) return;
      const { dx, v, on } = drag;
      drag = null;
      if (on !== "sideways") return;
      // A flick counts only if it's still going the way the page went
      const flick = Math.abs(dx) >= FLICK_DISTANCE && Math.abs(v) >= FLICK && Math.sign(v) === Math.sign(dx);
      // Finger to the left brings in the tab on the right
      const next = tabs[index + (dx < 0 ? 1 : -1)];
      if (!next || !(flick || Math.abs(dx) >= COMMIT * window.innerWidth)) return springBack();
      // The page stays where the finger left it until the slide takes it from there
      startMotion(dx < 0 ? "tab-left" : "tab-right");
      router.push(next.href);
    };
    const onCancel = () => {
      drag = null;
      springBack();
    };

    // Nor the browser's swipe back, which some take from anywhere on the page, not just the edge
    const root = document.documentElement.style;
    root.overscrollBehaviorX = "none";
    document.addEventListener("touchstart", onStart, { passive: true });
    // Not passive: once the drag is sideways it holds the page still vertically
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", onEnd, { passive: true });
    document.addEventListener("touchcancel", onCancel, { passive: true });
    return () => {
      root.overscrollBehaviorX = "";
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchmove", onMove);
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
