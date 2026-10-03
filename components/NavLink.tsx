"use client";

import Link, { useLinkStatus } from "next/link";
import { type ComponentProps, type RefObject, useEffect, useRef } from "react";
import { endMotion, navType, startMotion } from "./PageMotion";

/**
 * A link to another page of the site: it says which way the page change moves
 * (components/PageMotion.tsx), and pulses while the next page loads; the old page stays on
 * screen, live, until then. A `.back-link` always counts as going back.
 */
export function NavLink({ href, className, onClick, children, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const anchor = useRef<HTMLAnchorElement>(null);
  return (
    <Link
      {...props}
      href={href}
      className={className}
      ref={anchor}
      onClick={(e) => {
        onClick?.(e);
        // A new tab or window, or a download, leaves this page as it is
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || props.target) return;
        const back = className?.split(" ").includes("back-link") ?? false;
        startMotion(navType(new URL(location.href), new URL(href, location.href), back));
      }}
    >
      {children}
      <Going anchor={anchor} />
    </Link>
  );
}

// useLinkStatus only works inside the link, so the mark goes onto it from here
function Going({ anchor }: { anchor: RefObject<HTMLAnchorElement | null> }) {
  const { pending } = useLinkStatus();
  const went = useRef(false);
  useEffect(() => {
    anchor.current?.toggleAttribute("data-going", pending);
    // Arrived, even where the page itself stayed (a Feed category)
    if (went.current && !pending) endMotion();
    went.current = pending;
  }, [anchor, pending]);
  // Gone in the same render that it stopped going (the page it led to has no such link, e.g.
  // "ดูโน้ตจากทุกที่" on a Place's Notes): arrived all the same, so nothing stays armed
  useEffect(
    () => () => {
      if (went.current) endMotion();
    },
    [],
  );
  return null;
}
