"use client";

// PROTOTYPE (readable-pages), throwaway: lives only on the prototype/readable-pages branch.
// Variants on the real pages, one axis per thing being judged, kept while you click around:
//   ?list=O|A|B|C   the map drawer's list (O = today, with the dotted path)
//   ?guide=O|N      a Guide's head and "need to know" box (N = the new reading order)
//   ?note=O|A1      a Note card (in the Feed and on a Place card)
//   ?card=O|P1|P2|P3 the Place card on the map
// ←/→ cycle the first axis the page shows. The bar shows only when NEXT_PUBLIC_PROTOTYPE=1.

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const AXES = {
  list: [
    { key: "O", name: "ตอนนี้ มีเส้นประ" },
    { key: "A", name: "รายการธรรมดา ไอคอนเล็ก" },
    { key: "B", name: "การ์ดละหมวด" },
    { key: "C", name: "วงกลมเดิม ไม่มีเส้น" },
  ],
  guide: [
    { key: "O", name: "ตอนนี้" },
    { key: "N", name: "ใจความก่อน กล่องเป็นแถว" },
  ],
  note: [
    { key: "O", name: "ตอนนี้" },
    { key: "A1", name: "ชื่อ • จังหวัด เวลาขวา" },
  ],
  card: [
    { key: "O", name: "ตอนนี้" },
    { key: "P1", name: "แถวข้อมูล แล้วหัวข้อ" },
    { key: "P2", name: "แถบราคา+นำทางติดล่าง" },
    { key: "P3", name: "โน้ตนำ" },
  ],
} as const;
type Axis = keyof typeof AXES;
export const DEFAULTS: Record<Axis, string> = { list: "A", guide: "N", note: "A1", card: "P1" };

const storeKey = (axis: Axis) => `tanglak:prototype-${axis}`;

function apply(axis: Axis, key: string) {
  document.documentElement.dataset[`p${axis[0].toUpperCase()}${axis.slice(1)}`] = key;
  try {
    sessionStorage.setItem(storeKey(axis), key);
  } catch {}
}

function axesFor(path: string): Axis[] {
  if (path === "/") return ["list", "card", "note"];
  if (path.startsWith("/guides/")) return ["guide"];
  if (path.startsWith("/notes")) return ["note"];
  return [];
}

export function VariantSwitcher() {
  const path = usePathname();
  const [state, setState] = useState<Record<Axis, string>>(DEFAULTS);

  useEffect(() => {
    const url = new URLSearchParams(location.search);
    const next = { ...DEFAULTS };
    for (const axis of Object.keys(AXES) as Axis[]) {
      let stored: string | null = null;
      try {
        stored = sessionStorage.getItem(storeKey(axis));
      } catch {}
      next[axis] = (url.get(axis) ?? stored ?? DEFAULTS[axis]).toUpperCase();
      apply(axis, next[axis]);
    }
    setState(next);
  }, []);

  const go = (axis: Axis, step: number) => {
    const list = AXES[axis];
    const i = list.findIndex((v) => v.key === state[axis]);
    const key = list[(i + step + list.length) % list.length].key;
    setState((s) => ({ ...s, [axis]: key }));
    apply(axis, key);
    const url = new URL(location.href);
    url.searchParams.set(axis, key);
    history.replaceState(history.state, "", url);
  };

  const shown = axesFor(path);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (!shown.length || t.closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowLeft") go(shown[0], -1);
      if (e.key === "ArrowRight") go(shown[0], 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (process.env.NEXT_PUBLIC_PROTOTYPE !== "1" || !shown.length) return null;
  return (
    <div className="variant-switcher" aria-label="PROTOTYPE: เลือกแบบ">
      {shown.map((axis) => {
        const current = AXES[axis].find((v) => v.key === state[axis]);
        return (
          <div key={axis} role="group">
            <button type="button" onClick={() => go(axis, -1)} aria-label="แบบก่อนหน้า">
              ←
            </button>
            <span>
              {axis} {current?.key} {current?.name}
            </span>
            <button type="button" onClick={() => go(axis, 1)} aria-label="แบบถัดไป">
              →
            </button>
          </div>
        );
      })}
    </div>
  );
}

/** Set the variants before first paint, so a page doesn't flash today's look */
export const setVariantsScript = `try{var q=new URLSearchParams(location.search),d=${JSON.stringify(DEFAULTS)};for(var a in d){var v=q.get(a)||sessionStorage.getItem("tanglak:prototype-"+a)||d[a];document.documentElement.dataset["p"+a[0].toUpperCase()+a.slice(1)]=v.toUpperCase()}}catch(e){}`;
