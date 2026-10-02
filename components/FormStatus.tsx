"use client";

import { type ReactNode, useEffect, useRef } from "react";

// What came back from sending a form. It takes focus when it changes, so a screen reader
// reads it and a phone shows it, rather than leaving the writer at a button below the fold.
export function FormStatus({ error, children, signal }: { error?: boolean; children: ReactNode; signal: unknown }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (!signal) return;
    ref.current?.focus({ preventScroll: true });
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ref.current?.scrollIntoView({ block: "center", behavior: still ? "auto" : "smooth" });
  }, [signal]);
  return (
    <p ref={ref} tabIndex={-1} className={error ? "form-status is-error" : "form-status"} role={error ? "alert" : "status"}>
      {children}
    </p>
  );
}
