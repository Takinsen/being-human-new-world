"use client";

// PROTOTYPE (look-and-feel), throwaway: lives only on the prototype/look-and-feel branch.
// Three looks on the real pages, picked with ?look=O|A|B and kept while you click around:
//   O = today's site, A = the transit theme reduced to a trace, B = "ใต้ร่มจามจุรี".
// The bar shows only when NEXT_PUBLIC_PROTOTYPE=1, so a stray merge can't ship it.

import { useEffect, useState } from "react";

const LOOKS = [
  { key: "O", name: "ตอนนี้" },
  { key: "A", name: "รถไฟฟ้าแค่ร่องรอย" },
  { key: "B", name: "ใต้ร่มจามจุรี" },
];
const KEY = "tanglak:prototype-look";

function apply(look: string) {
  document.documentElement.dataset.look = look;
  try {
    sessionStorage.setItem(KEY, look);
  } catch {}
}

export function LookSwitcher() {
  const [look, setLook] = useState("B");
  useEffect(() => {
    const fromUrl = new URLSearchParams(location.search).get("look");
    let stored: string | null = null;
    try {
      stored = sessionStorage.getItem(KEY);
    } catch {}
    const start = (fromUrl ?? stored ?? "B").toUpperCase();
    setLook(start);
    apply(start);
  }, []);

  const go = (step: number) => {
    const i = LOOKS.findIndex((l) => l.key === look);
    const next = LOOKS[(i + step + LOOKS.length) % LOOKS.length].key;
    setLook(next);
    apply(next);
    const url = new URL(location.href);
    url.searchParams.set("look", next);
    history.replaceState(history.state, "", url);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (process.env.NEXT_PUBLIC_PROTOTYPE !== "1") return null;
  const current = LOOKS.find((l) => l.key === look);
  return (
    <div className="look-switcher" role="group" aria-label="PROTOTYPE: เลือกหน้าตา">
      <button type="button" onClick={() => go(-1)} aria-label="แบบก่อนหน้า">
        ←
      </button>
      <span>
        {current?.key} · {current?.name}
      </span>
      <button type="button" onClick={() => go(1)} aria-label="แบบถัดไป">
        →
      </button>
    </div>
  );
}
