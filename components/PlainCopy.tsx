"use client";

import { useEffect } from "react";
import { stripJoiners } from "@/lib/thaiBreaks";

// Copying gives the plain text back, without the invisible characters keepPhrases puts in to
// hold Thai phrases whole on a line (lib/thaiBreaks.ts).
export function PlainCopy() {
  useEffect(() => {
    const onCopy = (e: ClipboardEvent) => {
      const text = document.getSelection()?.toString();
      if (!text || !e.clipboardData) return;
      const plain = stripJoiners(text);
      if (plain === text) return;
      e.clipboardData.setData("text/plain", plain);
      e.preventDefault();
    };
    document.addEventListener("copy", onCopy);
    return () => document.removeEventListener("copy", onCopy);
  }, []);
  return null;
}
