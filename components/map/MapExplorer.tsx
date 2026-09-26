"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ArrowsInSimple, ArrowsOutSimple, BowlSteam, CaretDown, CaretUp, ChatCenteredText, X } from "@phosphor-icons/react";
import Link from "next/link";
import type { Category } from "@/content/categories";
import type { CategoryId } from "@/content/types";
import { CategoryIcon } from "../icons";
import { Wordmark } from "../PageHead";
import { PlaceDetail } from "./PlaceDetail";
import type { MapStop } from "./types";

// Leaflet touches `window`, so the map renders only in the browser.
const ExplorerMap = dynamic(() => import("./ExplorerMap"), {
  ssr: false,
  loading: () => <div className="explorer-map map-loading">กำลังโหลดแผนที่</div>,
});

const SIDEBAR = 380; // px, wide screens
const SHEET_CLOSED = 60; // px: just the handle
// Share of the map the sheet covers on phones; less on short screens so the map stays usable.
const sheetShare = (vh: number, full: boolean) => (full ? 0.85 : vh < 700 ? 0.36 : 0.45);

function useViewportHeight() {
  const [h, setH] = useState(800);
  useEffect(() => {
    const update = () => setH(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return h;
}

// The first-visit pointer to the Starter Checklist stays dismissed in this browser.
const WELCOME_KEY = "tanglak:welcome-dismissed";

function useWelcome() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      setShow(window.localStorage.getItem(WELCOME_KEY) !== "1");
    } catch {
      setShow(true);
    }
  }, []);
  const dismiss = () => {
    setShow(false);
    try {
      window.localStorage.setItem(WELCOME_KEY, "1");
    } catch {
      // Storage blocked: hidden until the page reloads.
    }
  };
  return { show, dismiss };
}

function useWide() {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return wide;
}

function priceText(stop: MapStop): string | undefined {
  const p = stop.place.price;
  if (!p?.checked) return undefined;
  return `${p.min === p.max ? p.min : `${p.min}–${p.max}`} บาท`;
}

export function MapExplorer({ stops, categories }: { stops: MapStop[]; categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const wide = useWide();
  const viewportHeight = useViewportHeight();

  // State lives in the URL so other pages can link straight to a category or a Place.
  const selectedId = params.get("place") ?? undefined;
  const posted = params.get("posted") === "1";
  const lineParam = params.get("line");
  // No category chosen means every Place shows (docs/adr/0006).
  const active = useMemo<CategoryId[]>(
    () => lineParam?.split(",").filter((l): l is CategoryId => categories.some((c) => c.id === l)) ?? [],
    [lineParam, categories],
  );
  const withNotes = params.get("notes") === "1";

  const [sheetOpen, setSheetOpen] = useState(true);
  const [sheetFull, setSheetFull] = useState(false);
  const welcome = useWelcome();
  const sheetBody = useRef<HTMLDivElement>(null);
  const returnTo = useRef<string | undefined>(undefined);

  const update = useCallback(
    (next: { place?: string | null; line?: CategoryId[]; notes?: boolean }) => {
      const q = new URLSearchParams(params.toString());
      q.delete("posted");
      if (next.place !== undefined) {
        if (next.place) q.set("place", next.place);
        else q.delete("place");
      }
      if (next.line) {
        if (next.line.length === 0) q.delete("line");
        else q.set("line", next.line.join(","));
      }
      if (next.notes !== undefined) {
        if (next.notes) q.set("notes", "1");
        else q.delete("notes");
      }
      router.replace(`${pathname}${q.size ? `?${q}` : ""}`, { scroll: false });
    },
    [params, pathname, router],
  );

  const shows = (id: CategoryId) => active.length === 0 || active.includes(id);
  // Categories are alternatives; "มีโน้ต" narrows whatever categories are on.
  const visible = stops.filter((s) => shows(s.place.category) && (!withNotes || s.notes.length > 0));
  const selected = stops.find((s) => s.place.id === selectedId);

  const select = (id: string) => {
    const stop = stops.find((s) => s.place.id === id);
    const line = stop && !shows(stop.place.category) ? [...active, stop.place.category] : undefined;
    update({ place: id, line, notes: stop && withNotes && !stop.notes.length ? false : undefined });
    setSheetOpen(true);
    sheetBody.current?.scrollTo({ top: 0 });
  };

  const back = () => {
    returnTo.current = selectedId;
    update({ place: null });
  };

  // Back from a card: focus returns to that Place in the list.
  useEffect(() => {
    if (selected || !returnTo.current) return;
    document.querySelector<HTMLButtonElement>(`[data-place="${returnTo.current}"]`)?.focus();
    returnTo.current = undefined;
  }, [selected]);

  const toggleCategory = (id: CategoryId) => {
    const next = active.includes(id) ? active.filter((a) => a !== id) : [...active, id];
    const hidesSelected = selected && next.length > 0 && !next.includes(selected.place.category);
    update({ line: next, place: hidesSelected ? null : undefined });
  };

  const sheetHeight = sheetOpen ? Math.round(viewportHeight * sheetShare(viewportHeight, sheetFull)) : SHEET_CLOSED;
  const inset = wide ? { left: SIDEBAR + 16, bottom: 0 } : { left: 0, bottom: sheetHeight };

  const filters = (
    <div className="line-filters" role="group" aria-label="กรองตามหมวด">
      {categories.map((c) => (
        <button
          key={c.id}
          type="button"
          className="line-chip"
          data-line={c.id}
          aria-pressed={active.includes(c.id)}
          onClick={() => toggleCategory(c.id)}
        >
          <CategoryIcon id={c.id} />
          {c.name}
        </button>
      ))}
      <button
        type="button"
        className="line-chip"
        data-line="general"
        aria-pressed={withNotes}
        onClick={() => update({ notes: !withNotes, place: withNotes ? undefined : null })}
      >
        <ChatCenteredText weight="bold" aria-hidden="true" />
        มีโน้ต
      </button>
    </div>
  );

  const count = (
    <p className="visually-hidden" aria-live="polite">
      แสดง {visible.length} ที่
    </p>
  );

  const list = (
    <div className="stop-list">
      {visible.length === 0 && (
        <p className="status-note">
          ยังไม่มีใครเขียนโน้ตไว้ที่ไหนในหมวดที่เลือก <Link href="/notes/new">เขียนโน้ตแรก</Link>
        </p>
      )}
      {categories
        .filter((c) => shows(c.id))
        .map((c) => {
          const inCategory = visible.filter((s) => s.place.category === c.id);
          if (!inCategory.length) return null;
          return (
            <section key={c.id} data-line={c.id} className="stop-group">
              <h2>{c.name}</h2>
              <ul>
                {inCategory.map((stop) => {
                  const { place, notes } = stop;
                  const price = priceText(stop);
                  return (
                    <li key={place.id}>
                      <button type="button" data-place={place.id} onClick={() => select(place.id)}>
                        <span className="place-icon">
                          <CategoryIcon id={place.category} />
                        </span>
                        <span>
                          <b>{place.name}</b>
                          <small>{place.summary}</small>
                          <span className="stop-tags">
                            {price && <mark className="price-strip">{price}</mark>}
                            {place.homeTaste && (
                              <small className="home-taste-tag">
                                <BowlSteam weight="bold" aria-hidden="true" /> รสชาติบ้าน{place.homeTaste}
                              </small>
                            )}
                            {notes.length > 0 && (
                              <small className="note-count">
                                <ChatCenteredText weight="bold" aria-hidden="true" /> {notes.length} โน้ต
                              </small>
                            )}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
    </div>
  );

  const welcomeNote = welcome.show && !selected && visible.length > 0 && (
    <p className="welcome">
      <Link href="/checklist">
        <span>
          เพิ่งมาใหม่? เริ่มที่ <b>สัปดาห์แรก</b>
        </span>
        <ArrowRight weight="bold" aria-hidden="true" />
      </Link>
      <button type="button" onClick={welcome.dismiss} aria-label="ปิดคำแนะนำ">
        <X weight="bold" aria-hidden="true" />
      </button>
    </p>
  );

  const panelBody = selected ? (
    <PlaceDetail stop={selected} posted={posted} onBack={back} />
  ) : (
    <>
      {welcomeNote}
      {list}
    </>
  );

  const brand = (
    <div className="brand">
      <h1 className="visually-hidden">ตั้งหลัก แผนที่ย่านจุฬาฯ</h1>
      <Wordmark />
      <p className="tagline">บ้านยังเป็นบ้าน ที่นี่คือที่ตั้งหลัก</p>
    </div>
  );

  const categoryName = selected && categories.find((c) => c.id === selected.place.category)?.name;

  // The panel comes before the map in the page, so Tab reaches the filters before the pins.
  return (
    <div className="explorer">
      {count}
      {wide ? (
        <aside className="explorer-panel" aria-label="แผงแผนที่" style={{ width: SIDEBAR }}>
          {brand}
          {filters}
          {panelBody}
        </aside>
      ) : (
        <>
          <div className="explorer-top">
            {brand}
            {filters}
          </div>
          <section className="explorer-sheet" style={{ height: sheetHeight }} aria-label="รายการบนแผนที่">
            <div className="sheet-bar">
              <button type="button" className="sheet-handle" aria-expanded={sheetOpen} onClick={() => setSheetOpen((o) => !o)}>
                <span>{selected ? `หมวด${categoryName}` : `แผนที่ย่านจุฬาฯ ${visible.length} ที่`}</span>
                {sheetOpen ? <CaretDown weight="bold" aria-hidden="true" /> : <CaretUp weight="bold" aria-hidden="true" />}
              </button>
              {sheetOpen && (
                <button
                  type="button"
                  className="sheet-size"
                  aria-pressed={sheetFull}
                  onClick={() => setSheetFull((f) => !f)}
                >
                  {sheetFull ? <ArrowsInSimple weight="bold" aria-hidden="true" /> : <ArrowsOutSimple weight="bold" aria-hidden="true" />}
                  <span className="visually-hidden">ขยายเต็มจอ</span>
                </button>
              )}
            </div>
            {sheetOpen && (
              <div className="sheet-body" ref={sheetBody}>
                {panelBody}
              </div>
            )}
          </section>
        </>
      )}
      <ExplorerMap stops={visible} selectedId={selectedId} onSelect={select} inset={inset} />
    </div>
  );
}
