"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowsInSimple, ArrowsOutSimple, BowlSteam, CaretDown, CaretUp, ChatCenteredText, FirstAidKit, Phone, X } from "@phosphor-icons/react";
import Link from "next/link";
import type { Category } from "@/content/categories";
import { firstWeek } from "@/content/checklist";
import type { CategoryId } from "@/content/types";
import { useChecklist } from "@/lib/useChecklist";
import { CategoryIcon, PlaceIcon } from "../icons";
import { LOGO_NOTICE, SHOW_TRANSIT_LOGOS } from "@/lib/brands";
import { Wordmark } from "../PageHead";
import { Canopy } from "../Canopy";
import { PlaceDetail } from "./PlaceDetail";
import type { MapStop } from "./types";

// Leaflet touches `window`, so the map renders only in the browser.
const ExplorerMap = dynamic(() => import("./ExplorerMap"), {
  ssr: false,
  loading: () => <div className="explorer-map map-loading">กำลังโหลดแผนที่</div>,
});

// px, wide screens; wider on projector-size screens where the text is larger
const sidebarWidth = (vw: number) => (vw >= 1600 ? 460 : 380);
const SHEET_CLOSED = 60; // px: just the handle
// Share of the map the sheet covers on phones; less on short screens so the map stays usable,
// but more on the shortest (large text), where a smaller half sheet can't fit one list row.
const sheetShare = (areaHeight: number, full: boolean) =>
  full ? 0.94 : areaHeight < 480 ? 0.6 : areaHeight < 620 ? 0.42 : 0.5;

function useViewport() {
  const [size, setSize] = useState({ w: 390, h: 800 });
  useEffect(() => {
    const update = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
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
  const { w: viewportWidth } = useViewport();
  const sidebar = sidebarWidth(viewportWidth);
  // The sheet is sized from the map area itself (the screen minus the tab bar),
  // which at large text sizes is much less than the window.
  const explorer = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const [area, setArea] = useState({ h: 700, top: 120 });
  useEffect(() => {
    const measure = () =>
      setArea({ h: explorer.current?.clientHeight ?? 700, top: top.current ? top.current.offsetTop + top.current.offsetHeight : 0 });
    measure();
    const ro = new ResizeObserver(measure);
    if (explorer.current) ro.observe(explorer.current);
    if (top.current) ro.observe(top.current);
    return () => ro.disconnect();
  }, [wide]);
  const short = area.h < 620;

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
  const checklist = useChecklist();
  const sheetBody = useRef<HTMLDivElement>(null);
  const returnTo = useRef<string | undefined>(undefined);
  // A card opened by the user takes focus; one opened by the URL on load doesn't.
  const userOpened = useRef(false);

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
    userOpened.current = true;
    setSheetOpen(true);
    // Short phones: a half sheet shows only the name, so open the card full.
    if (short) setSheetFull(true);
    sheetBody.current?.scrollTo({ top: 0 });
  };

  const back = () => {
    returnTo.current = selectedId;
    setSheetFull(false);
    update({ place: null });
  };

  // Opened from a link on a short phone, or just after posting a Note there:
  // show the card full, as select() does, so the Note is in view.
  const opensFull = Boolean(selectedId) && (short || posted);
  useEffect(() => {
    if (opensFull) setSheetFull(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opensFull]);

  // Esc closes an open card, like its back button.
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Back from a card: focus returns to that Place in the list.
  useEffect(() => {
    if (selected || !returnTo.current) return;
    const button = document.querySelector<HTMLButtonElement>(`[data-place="${returnTo.current}"]`);
    button?.focus({ preventScroll: true });
    // The sheet may still be shrinking back from full; scroll once it has.
    setTimeout(() => button?.scrollIntoView({ block: "nearest" }), 250);
    returnTo.current = undefined;
  }, [selected]);

  const toggleCategory = (id: CategoryId) => {
    const next = active.includes(id) ? active.filter((a) => a !== id) : [...active, id];
    const hidesSelected = selected && next.length > 0 && !next.includes(selected.place.category);
    update({ line: next, place: hidesSelected ? null : undefined });
  };

  const covered = !wide && sheetOpen && sheetFull;
  const sheetHeight = sheetOpen ? Math.round(area.h * sheetShare(area.h, sheetFull)) : SHEET_CLOSED;
  const inset = wide ? { left: sidebar + 16, top: 16, bottom: 0 } : { left: 0, top: area.top, bottom: sheetHeight };

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
          {active.length ? "หมวดนี้ยังไม่มีใครเขียนโน้ตไว้" : "ยังไม่มีโน้ตที่ไหนบนแผนที่เลย"}{" "}
          <Link href="/notes/new">เขียนเป็นคนแรกเลย</Link>
        </p>
      )}
      {categories
        .filter((c) => shows(c.id))
        .map((c) => {
          const inCategory = visible.filter((s) => s.place.category === c.id);
          if (!inCategory.length) return null;
          return (
            <section key={c.id} data-line={c.id} className="stop-group">
              {/* app/page.tsx sorts food cheapest first; say so */}
              <h2>
                {c.name}
                {c.id === "food" && <small> เรียงจากถูกไปแพง</small>}
              </h2>
              <ul>
                {inCategory.map((stop) => {
                  const { place, notes } = stop;
                  const price = priceText(stop);
                  return (
                    <li key={place.id}>
                      <button type="button" data-place={place.id} onClick={() => select(place.id)}>
                        <span className="place-icon">
                          <PlaceIcon place={place} />
                        </span>
                        <span>
                          <b>{place.name}</b>
                          <span className="visually-hidden">: </span>
                          <small>{place.summary}</small>
                          <span className="stop-tags">
                            {price && <b className="stop-price">{price}</b>}
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
      <Link href="/guides/sick" className="list-help">
        <FirstAidKit weight="bold" aria-hidden="true" /> ไม่สบาย ไปไหนดี
      </Link>{" "}
      <Link href="/seniors#help" className="list-help">
        <Phone weight="bold" aria-hidden="true" /> เหงาหรือเครียด คุยกับคนได้
      </Link>
      {SHOW_TRANSIT_LOGOS && <p className="fine-print">{LOGO_NOTICE}</p>}
    </div>
  );

  // Coming back mid-week: point at the next item instead of the start (UX audit 7, U4).
  const doneCount = firstWeek.filter((i) => checklist.done.includes(i.id)).length;
  const nextItem = firstWeek.find((i) => !checklist.done.includes(i.id));
  const welcomeNote = welcome.show && !selected && visible.length > 0 && nextItem && (
    <p className="welcome">
      {doneCount === 0 ? (
        <Link href="/checklist">
          <span>
            เพิ่งย้ายมา เริ่มจาก<b>สัปดาห์แรก</b>ก่อนก็ได้
          </span>
        </Link>
      ) : (
        <Link href={nextItem.href}>
          <span>
            {/* No <b>: .welcome b doesn't wrap, and a title can be long */}
            สัปดาห์แรกทำไปแล้ว {doneCount} จาก {firstWeek.length}&nbsp;ข้อ ต่อไปคือ{nextItem.title}
          </span>
        </Link>
      )}
      <button type="button" onClick={welcome.dismiss} aria-label="ปิดคำแนะนำ">
        <X weight="bold" aria-hidden="true" />
      </button>
    </p>
  );

  const panelBody = selected ? (
    <PlaceDetail stop={selected} posted={posted} focusOnOpen={userOpened.current} onBack={wide ? back : undefined} />
  ) : (
    <>
      {count}
      {welcomeNote}
      {list}
    </>
  );

  const brand = (
    <div className="brand">
      <h1 className="visually-hidden">ตั้งหลัก แผนที่ย่านจุฬาฯ</h1>
      <Wordmark />
    </div>
  );

  // The panel comes before the map in the page, so Tab reaches the filters before the pins.
  return (
    <div className="explorer" ref={explorer}>
      <Canopy />
      {wide ? (
        <aside className="explorer-panel" aria-label="แผงแผนที่" style={{ width: sidebar }}>
          {brand}
          {filters}
          {panelBody}
        </aside>
      ) : (
        <>
          {/* A full sheet covers these; keep them out of the Tab order while it does */}
          <div className="explorer-top" ref={top} inert={covered}>
            {brand}
            {filters}
          </div>
          <section className="explorer-sheet" style={{ height: sheetHeight }} aria-label="รายการบนแผนที่">
            <div className="sheet-bar">
              {selected ? (
                // With a card open, the sheet's top bar is its way back (saves a row on phones).
                <button type="button" className="sheet-handle" onClick={back}>
                  <span>
                    <ArrowLeft weight="bold" aria-hidden="true" /> ดูที่อื่น
                  </span>
                </button>
              ) : (
                <button type="button" className="sheet-handle" aria-expanded={sheetOpen} onClick={() => setSheetOpen((o) => !o)}>
                  <span>แถวจุฬาฯ {visible.length} ที่</span>
                  {sheetOpen ? <CaretDown weight="bold" aria-hidden="true" /> : <CaretUp weight="bold" aria-hidden="true" />}
                </button>
              )}
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
      <ExplorerMap stops={visible} selectedId={selectedId} onSelect={select} inset={inset} covered={covered} />
    </div>
  );
}
