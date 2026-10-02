"use client";

import { useEffect, useRef, type ReactNode } from "react";

// The redirect after posting is a client navigation, which doesn't move focus to
// the #fresh hash; take it here so the status is read out (UX audit 4, A2).
export function PostedStatus({ id, className, children }: { id?: string; className: string; children: ReactNode }) {
  const status = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    status.current?.focus({ preventScroll: true });
    status.current?.scrollIntoView({ block: "center" });
  }, []);
  return (
    <p className={className} role="status" id={id} tabIndex={-1} ref={status}>
      {children}
    </p>
  );
}
