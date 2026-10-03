"use client";

import { NavLink } from "./NavLink";
import { PencilSimpleLine, Receipt } from "@phosphor-icons/react";
import { firstWeek } from "@/content/checklist";
import { FlyingName } from "./PageMotion";
import { Peeps } from "./People";
import { guides } from "@/content/guides";
import { keepPhrases } from "@/lib/thaiBreaks";
import { useChecklist } from "@/lib/useChecklist";

// Starter Checklist drawn as a line with stations; the page supplies the title.
// Progress leads, then the next station opens up to say what it's about (UX audit 5, D3).
export function WeekRoute() {
  const { done, toggle } = useChecklist();
  const count = firstWeek.filter((i) => done.includes(i.id)).length;
  const complete = count === firstWeek.length;
  const next = firstWeek.find((i) => !done.includes(i.id));
  const guideAt = (href: string) => guides.find((g) => `/guides/${g.id}` === href);
  const nextSummary = next && guideAt(next.href)?.summary;
  return (
    <section className="week">
      {/* All done: the progress turns into a sunny card and the people come out to cheer */}
      <div className={complete ? "week-progress is-complete" : "week-progress"}>
        {complete && <Peeps className="week-cheer" set="cheer" />}
        <p aria-live="polite">
          {complete ? (
            keepPhrases("ครบแล้ว ตั้งหลักได้แล้ว")
          ) : (
            <>
              <span>ทำไปแล้ว</span> <b>{count}</b> <span>จาก</span> {firstWeek.length}
            </>
          )}
        </p>
        <span className="week-bar" aria-hidden="true">
          <i style={{ width: `${(count / firstWeek.length) * 100}%` }} />
        </span>
        {!complete && <p className="week-hint">ทำอันไหนแล้วติ๊กวงกลมไว้</p>}
        {/* Whoever finished is the best person to help the next Newcomers (UX audit 7, U6) */}
        {complete && (
          <div className="week-after">
            <NavLink href="/notes/new" className="action is-primary">
              <PencilSimpleLine weight="bold" aria-hidden="true" /> เขียนโน้ตบอกน้องรุ่นหน้า
            </NavLink>
            <NavLink href="/contribute#price" className="action">
              <Receipt weight="bold" aria-hidden="true" /> ไปมาแล้ว บอกราคาที่เห็น
            </NavLink>
          </div>
        )}
      </div>
      <ol className="week-stops">
        {firstWeek.map((item) => {
          const isDone = done.includes(item.id);
          const isNext = item === next;
          // The stop's title flies into the Guide's heading only where it is the Guide's own title
          // (compared as written, before keepPhrases)
          const guide = guideAt(item.href);
          const shown = keepPhrases(item.title);
          const title = guide?.title === item.title ? <FlyingName name={`guide-title-${guide.id}`}>{shown}</FlyingName> : shown;
          return (
            <li
              key={item.id}
              className={[isDone && "is-done", isNext && "is-next"].filter(Boolean).join(" ") || undefined}
              data-line={item.category ?? "general"}
            >
              <label className="tick">
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => toggle(item.id)}
                  aria-label={`ทำแล้ว ${item.title}`}
                />
              </label>
              {isNext ? (
                <div className="week-next">
                  <NavLink href={item.href}>{title}</NavLink>
                  {nextSummary && <p>{keepPhrases(nextSummary)}</p>}
                  <span className="week-read" aria-hidden="true">
                    อ่านคู่มือ
                  </span>
                </div>
              ) : (
                <NavLink href={item.href}>{title}</NavLink>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
