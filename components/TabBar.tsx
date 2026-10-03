"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenText, ChatCenteredText, ListChecks, MapTrifold } from "@phosphor-icons/react";

/** The tabs in order, left to right; swiping between pages follows it too (components/SwipeTabs.tsx) */
export const tabs = [
  { href: "/", label: "แผนที่", Icon: MapTrifold },
  { href: "/notes", label: "โน้ต", Icon: ChatCenteredText },
  { href: "/guides", label: "คู่มือ", Icon: BookOpenText },
  { href: "/checklist", label: "สัปดาห์แรก", Icon: ListChecks },
];

// The site's only navigation (docs/adr/0006): within thumb reach on a phone.
export function TabBar() {
  const pathname = usePathname();
  const nav = useRef<HTMLElement>(null);
  const hidden = useHideOnScroll(nav, pathname);
  // Senior Stories are reached from the Feed, so they sit under โน้ต.
  const current = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href) || (href === "/notes" && pathname.startsWith("/seniors"));
  return (
    <nav ref={nav} className="tab-bar" id="menu" aria-label="เมนูหลัก" data-hidden={hidden || undefined}>
      {tabs.map(({ href, label, Icon }) => (
        <Link key={href} href={href} aria-current={current(href) ? "page" : undefined}>
          <Icon weight={current(href) ? "fill" : "bold"} aria-hidden="true" />
          {label}
          <Pending />
        </Link>
      ))}
    </nav>
  );
}

// Scrolling down to read, the bar slides away so the page gets the whole screen; any
// move back up, the end of the page, or keyboard focus on the bar brings it back.
// The map never scrolls, and its sheet sits on the bar, so there it always shows.
function useHideOnScroll(nav: RefObject<HTMLElement | null>, pathname: string) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    setHidden(false); // Every page starts with the bar in view
    if (pathname === "/") return;
    let last = window.scrollY;
    let peak = last; // The lowest point since the last move down, to measure a move up from
    let keepUntil = 0; // While the page scrolls itself to the bar, it stays
    const focused = () => nav.current?.contains(document.activeElement) ?? false;
    const onScroll = () => {
      const y = window.scrollY;
      const atEnd = window.innerHeight + y >= document.documentElement.scrollHeight - 2;
      if (y <= 12 || atEnd) setHidden(false);
      else if (y > last) {
        peak = y;
        if (!focused() && performance.now() > keepUntil) setHidden(true);
      } else if (peak - y >= 8) setHidden(false);
      last = y;
    };
    const show = () => setHidden(false);
    // "ไปที่เมนู" scrolls down to the bar without focusing a link in it
    const onSkip = (e: MouseEvent) => {
      if (!(e.target instanceof Element && e.target.closest('a[href="#menu"]'))) return;
      keepUntil = performance.now() + 1500;
      show();
    };
    const bar = nav.current;
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onSkip);
    bar?.addEventListener("focusin", show);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onSkip);
      bar?.removeEventListener("focusin", show);
    };
  }, [nav, pathname]);
  return hidden;
}

// On a slow connection a tap can take seconds; show that it registered.
function Pending() {
  const { pending } = useLinkStatus();
  return pending ? <span className="tab-pending" aria-hidden="true" /> : null;
}
