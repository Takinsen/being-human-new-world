"use client";

// PROTOTYPE (type-and-spacing), throwaway: lives only on the prototype/type-and-spacing branch.
// Fonts, scale and wordmark on the real pages, kept while you click around (.scratch/type-and-spacing/spec.md):
//   ?font=O|A|B|C   O today (Mitr + IBM Plex Sans Thai Looped), A Anuphan, B Google Sans,
//                   C LINE Seed Sans TH headings + IBM Plex Sans Thai text
//   ?scale=old|new  today's sizes, weights and spacing, or the new scale (Q8, Q12–Q14, Q16)
//   ?mark=mitr|new  the wordmark in Mitr, or in the font's heading face (Q15)
// Keys: ←/→ font, S scale, M wordmark. The bar shows only when NEXT_PUBLIC_PROTOTYPE=1.

import { useEffect, useState } from "react";

const FONTS = [
  { key: "O", name: "ตอนนี้: Mitr + Plex Looped" },
  { key: "A", name: "Anuphan" },
  { key: "B", name: "Google Sans" },
  { key: "C", name: "LINE Seed + Plex Thai" },
];
type State = { font: string; scale: string; mark: string };
const KEY = "tanglak:prototype-type";
const DEFAULTS: State = { font: "A", scale: "new", mark: "new" };

/** Runs before first paint (app/layout.tsx), so a page never flashes the wrong font */
export const typeBoot = `try{var q=new URLSearchParams(location.search),s={};try{s=JSON.parse(sessionStorage.getItem("${KEY}")||"{}")}catch(e){}
var d=document.documentElement.dataset;d.font=(q.get("font")||s.font||"${DEFAULTS.font}").toUpperCase();d.scale=q.get("scale")||s.scale||"${DEFAULTS.scale}";d.mark=q.get("mark")||s.mark||"${DEFAULTS.mark}"}catch(e){}`;

function apply(s: State) {
  const d = document.documentElement.dataset;
  d.font = s.font;
  d.scale = s.scale;
  d.mark = s.mark;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(s));
  } catch {}
  const url = new URL(location.href);
  url.searchParams.set("font", s.font);
  url.searchParams.set("scale", s.scale);
  url.searchParams.set("mark", s.mark);
  history.replaceState(history.state, "", url);
}

export function TypeSwitcher() {
  const [s, setS] = useState<State>(DEFAULTS);
  useEffect(() => {
    const d = document.documentElement.dataset;
    setS({ font: d.font ?? DEFAULTS.font, scale: d.scale ?? DEFAULTS.scale, mark: d.mark ?? DEFAULTS.mark });
  }, []);

  const set = (next: State) => {
    setS(next);
    apply(next);
  };
  const cycle = (step: number) => {
    const i = FONTS.findIndex((f) => f.key === s.font);
    set({ ...s, font: FONTS[(i + step + FONTS.length) % FONTS.length].key });
  };
  const flipScale = () => set({ ...s, scale: s.scale === "new" ? "old" : "new" });
  const flipMark = () => set({ ...s, mark: s.mark === "new" ? "mitr" : "new" });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, [contenteditable]") || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowLeft") cycle(-1);
      else if (e.key === "ArrowRight") cycle(1);
      else if (e.key === "s" || e.key === "S") flipScale();
      else if (e.key === "m" || e.key === "M") flipMark();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (process.env.NEXT_PUBLIC_PROTOTYPE !== "1") return null;
  const font = FONTS.find((f) => f.key === s.font);
  return (
    <div className="type-switcher" role="group" aria-label="PROTOTYPE: ฟอนต์และขนาด">
      <button type="button" onClick={() => cycle(-1)} aria-label="ฟอนต์ก่อนหน้า">
        ←
      </button>
      <span>
        {font?.key} · {font?.name}
      </span>
      <button type="button" onClick={() => cycle(1)} aria-label="ฟอนต์ถัดไป">
        →
      </button>
      <button type="button" onClick={flipScale} aria-pressed={s.scale === "new"}>
        ขนาด: {s.scale === "new" ? "ใหม่" : "เดิม"}
      </button>
      <button type="button" onClick={flipMark} aria-pressed={s.mark === "new"}>
        โลโก้: {s.mark === "new" ? "ฟอนต์ใหม่" : "Mitr"}
      </button>
    </div>
  );
}
