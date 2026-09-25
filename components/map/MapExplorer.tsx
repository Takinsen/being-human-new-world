"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CaretDown, CaretUp, ChatCenteredText, X } from "@phosphor-icons/react";
import Link from "next/link";
import type { Category } from "@/content/categories";
import type { CategoryId } from "@/content/types";
import { CategoryIcon } from "../icons";
import { Wordmark } from "../PageHead";
import { StationCode } from "../StationCode";
import { PlaceDetail } from "./PlaceDetail";
import type { MapStop } from "./types";

// Leaflet touches `window`, so the map renders only in the browser.
const ExplorerMap = dynamic(() => import("./ExplorerMap"), {
  ssr: false,
  loading: () => <div className="explorer-map map-loading">กำลังโหลดแผนที่</div>,
});

const SIDEBAR = 380; // px, wide screens
const SHEET_PEEK = 0.45; // share of the viewport the open sheet covers on phones

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

export function MapExplorer({ stops, lines }: { stops: MapStop[]; lines: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const wide = useWide();
  const viewportHeight = useViewportHeight();

  // State lives in the URL so category pages can link straight to a line or a Place.
  const selectedId = params.get("place") ?? undefined;
  const lineParam = params.get("line");
  const active = useMemo<CategoryId[]>(() => {
    const fromUrl = lineParam?.split(",").filter((l): l is CategoryId => lines.some((c) => c.id === l));
    return fromUrl?.length ? fromUrl : lines.map((l) => l.id);
  }, [lineParam, lines]);

  const withNotes = params.get("notes") === "1";
  const [sheetOpen, setSheetOpen] = useState(true);
  const welcome = useWelcome();

  const update = useCallback(
    (next: { place?: string | null; line?: CategoryId[]; notes?: boolean }) => {
      const q = new URLSearchParams(params.toString());
      if (next.place !== undefined) {
        if (next.place) q.set("place", next.place);
        else q.delete("place");
      }
      if (next.line) {
        if (next.line.length === lines.length) q.delete("line");
        else q.set("line", next.line.join(","));
      }
      if (next.notes !== undefined) {
        if (next.notes) q.set("notes", "1");
        else q.delete("notes");
      }
      router.replace(`${pathname}${q.size ? `?${q}` : ""}`, { scroll: false });
    },
    [params, pathname, router, lines.length],
  );

  // Lines are alternatives; "มีโน้ต" narrows whatever lines are on.
  const visible = stops.filter((s) => active.includes(s.place.category) && (!withNotes || s.notes.length > 0));
  const selected = stops.find((s) => s.place.id === selectedId);

  const select = (id: string) => {
    const stop = stops.find((s) => s.place.id === id);
    const line = stop && !active.includes(stop.place.category) ? [...active, stop.place.category] : undefined;
    update({ place: id, line, notes: stop && withNotes && !stop.notes.length ? false : undefined });
    setSheetOpen(true);
  };

  const toggleLine = (id: CategoryId) => {
    const next = active.includes(id) ? active.filter((a) => a !== id) : [...active, id];
    const dropSelected = selected && !next.includes(selected.place.category);
    update({ line: next, place: dropSelected ? null : undefined });
  };

  const inset = wide
    ? { left: SIDEBAR + 16, bottom: 0 }
    : { left: 0, bottom: sheetOpen ? Math.round(viewportHeight * SHEET_PEEK) : 72 };

  const filters = (
    <div className="line-filters" role="group" aria-label="เลือกสายที่จะแสดง">
      {lines.map((l) => (
        <button
          key={l.id}
          type="button"
          className="line-chip"
          data-line={l.id}
          aria-pressed={active.includes(l.id)}
          onClick={() => toggleLine(l.id)}
        >
          <CategoryIcon id={l.id} />
          {l.name}
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

  const list = (
    <div className="stop-list">
      {visible.length === 0 && (
        <p className="status-note">
          {withNotes ? (
            <>
              ยังไม่มีใครเขียนโน้ตไว้ที่ไหนบนสายที่เลือก <Link href="/notes/new">เขียนโน้ตแรก</Link>
            </>
          ) : (
            "เลือกอย่างน้อยหนึ่งสายด้านบน เพื่อดูที่ต่างๆ"
          )}
        </p>
      )}
      {lines
        .filter((l) => active.includes(l.id))
        .map((l) => {
          const onLine = visible.filter((s) => s.place.category === l.id);
          if (!onLine.length) return null;
          return (
            <section key={l.id} data-line={l.id} className="stop-group">
              <h2>{l.name}</h2>
              <ul>
                {onLine.map(({ place, code, notes }) => (
                  <li key={place.id}>
                    <button type="button" onClick={() => select(place.id)}>
                      <StationCode code={code} />
                      <span>
                        <b>{place.name}</b>
                        <small>{place.summary}</small>
                        {notes.length > 0 && (
                          <small className="note-count">
                            <ChatCenteredText weight="bold" aria-hidden="true" /> {notes.length} โน้ต
                          </small>
                        )}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
    </div>
  );

  const welcomeNote = welcome.show && !selected && (
    <p className="welcome">
      <Link href="/checklist">
        เพิ่งมาใหม่? เริ่มที่ สัปดาห์แรก <ArrowRight weight="bold" aria-hidden="true" />
      </Link>
      <button type="button" onClick={welcome.dismiss} aria-label="ปิดคำแนะนำ">
        <X weight="bold" aria-hidden="true" />
      </button>
    </p>
  );

  const panelBody = selected ? (
    <PlaceDetail stop={selected} onBack={() => update({ place: null })} />
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

  return (
    <div className="explorer">
      <ExplorerMap stops={visible} selectedId={selectedId} onSelect={select} inset={inset} />

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
          <section
            className={sheetOpen ? "explorer-sheet is-open" : "explorer-sheet"}
            style={{ height: sheetOpen ? `${SHEET_PEEK * 100}dvh` : 72 }}
            aria-label="รายการบนแผนที่"
          >
            <button type="button" className="sheet-handle" aria-expanded={sheetOpen} onClick={() => setSheetOpen((o) => !o)}>
              <span>{selected ? selected.place.name : `แผนที่ย่านจุฬาฯ ${visible.length} ที่`}</span>
              {sheetOpen ? <CaretDown weight="bold" aria-hidden="true" /> : <CaretUp weight="bold" aria-hidden="true" />}
            </button>
            {sheetOpen && <div className="sheet-body">{panelBody}</div>}
          </section>
        </>
      )}
    </div>
  );
}
