"use client";

import { type ReactNode, useEffect, useSyncExternalStore, ViewTransition, type ViewTransitionInstance } from "react";
import { usePathname } from "next/navigation";
import { tabs } from "./tabs";

// How a page change moves (docs/adr/0007, amended 2026-10-03): tabs slide sideways in tab order,
// going deeper rises in, going back sinks away, a Feed category moves only its Notes, and a name on
// both sides of the tap flies. app/globals.css says how each one looks. Only a tap inside the site
// moves the page; the browser's own back and forward, and the map's own URL changes, stay still.

/** Named for which way the page goes */
export type NavType = "tab-left" | "tab-right" | "nav-forward" | "nav-back" | "nav-filter";

const tabIndex = (path: string) => tabs.findIndex((t) => t.href === path);

// A tab's own page sits at the top (filtered or not); anything reached from one sits under it.
// A Place's Notes are reached from its card on the map.
const depth = (url: URL) => (tabIndex(url.pathname) < 0 || (url.pathname === "/notes" && url.searchParams.has("place")) ? 1 : 0);

export function navType(from: URL, to: URL, back: boolean): NavType | undefined {
  if (from.pathname === to.pathname && from.search === to.search) return undefined; // A jump within the page
  if (back) return "nav-back";
  const [here, there] = [depth(from), depth(to)];
  if (there < here) return "nav-back";
  if (here === 0 && there === 0) {
    if (from.pathname === to.pathname) return "nav-filter";
    // A tab to the right comes in from the right, so this page leaves to the left
    return tabIndex(to.pathname) > tabIndex(from.pathname) ? "tab-left" : "tab-right";
  }
  return "nav-forward";
}

// The way the coming page change moves, held from the tap until the new page is in. Not React's
// transition types: those wait on the root for whichever transition commits next, and Next commits
// small ones of its own around a tap, which took them about half the time.
let motion: NavType | null = null;
const listeners = new Set<() => void>();

function setMotion(next: NavType | null) {
  if (next === motion) return;
  motion = next;
  listeners.forEach((listener) => listener());
}

/** Say how the page change about to start moves. Nothing moves for anyone who asks for less motion. */
export function startMotion(type: NavType | undefined) {
  setMotion(type && window.matchMedia("(prefers-reduced-motion: no-preference)").matches ? type : null);
}

/** The new page is in (or the tap came to nothing): whatever changes next stays still */
export function endMotion() {
  setMotion(null);
}

function useMotion() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => motion,
    () => null,
  );
}

/** The page under the tab bar, moving as one picture; the tab bar stays where it is */
export function PageFrame({ children }: { children: ReactNode }) {
  const moving = useMotion();
  const pathname = usePathname();
  useEffect(endMotion, [pathname]);
  // The browser's back mid-tap is still the browser's back
  useEffect(() => {
    window.addEventListener("popstate", endMotion);
    return () => window.removeEventListener("popstate", endMotion);
  }, []);
  return (
    <ViewTransition default="none" update={moving && moving !== "nav-filter" ? moving : "none"} onUpdate={keepOldPicture}>
      <div className="page-frame">{children}</div>
    </ViewTransition>
  );
}

/** The Feed's Notes: on a category only they move; the head and chips stay put */
export function FeedMotion({ children }: { children: ReactNode }) {
  const moving = useMotion();
  return (
    <ViewTransition default="none" update={moving === "nav-filter" ? "list-refresh" : "none"} onUpdate={keepOldPicture}>
      {children}
    </ViewTransition>
  );
}

// The new page arrives scrolled (to the top, or to a #section), so the picture's box would slide
// up or down the screen to get there. It goes there at once instead, and the old picture stays
// where it was on screen (--page-shift in app/globals.css); only the pictures move.
function keepOldPicture(instance: ViewTransitionInstance) {
  const { group } = instance as ViewTransitionInstance & { group: Animatable };
  for (const move of group.getAnimations()) {
    const [from, to] = (move.effect as KeyframeEffect).getKeyframes();
    const y = (k?: Keyframe) => (typeof k?.transform === "string" ? new DOMMatrix(k.transform).f : 0);
    document.documentElement.style.setProperty("--page-shift", `${y(from) - y(to)}px`);
    move.cancel();
  }
}

/**
 * A name that is on both sides of a tap, like a Guide's title in a list and as its heading.
 * It flies from one spot to the other, both ways. React leaves the pair alone when either spot
 * is off screen, so going back to a scrolled-away list just sinks. `name` must be unique on a page.
 */
export function FlyingName({ name, children }: { name: string; children: ReactNode }) {
  const moving = useMotion();
  return (
    <ViewTransition name={name} default="none" share={moving === "nav-forward" || moving === "nav-back" ? "fly" : "none"}>
      <span className="flying-name">{children}</span>
    </ViewTransition>
  );
}
