"use client";

import Link from "next/link";
import { ArrowRight, CaretRight, PencilSimpleLine, Receipt } from "@phosphor-icons/react";
import { firstWeek } from "@/content/checklist";
import { Peeps } from "./People";
import { guides } from "@/content/guides";
import { useChecklist } from "@/lib/useChecklist";

// Starter Checklist drawn as a line with stations; the page supplies the title.
// Progress leads, then the next station opens up to say what it's about (UX audit 5, D3).
export function WeekRoute() {
  const { done, toggle } = useChecklist();
  const count = firstWeek.filter((i) => done.includes(i.id)).length;
  const complete = count === firstWeek.length;
  const next = firstWeek.find((i) => !done.includes(i.id));
  const nextSummary = next && guides.find((g) => `/guides/${g.id}` === next.href)?.summary;
  return (
    <section className="week">
      {/* All done: the progress turns into a sunny card and the people come out to cheer */}
      <div className={complete ? "week-progress is-complete" : "week-progress"}>
        {complete && <Peeps className="week-cheer" set="cheer" />}
        <p aria-live="polite">
          {complete ? (
            "ครบแล้ว ตั้งหลักได้แล้ว"
          ) : (
            <>
              <b>{count}</b> / {firstWeek.length} <span>ทำแล้ว</span>
            </>
          )}
        </p>
        <span className="week-bar" aria-hidden="true">
          <i style={{ width: `${(count / firstWeek.length) * 100}%` }} />
        </span>
        {!complete && <p className="week-hint">กดวงกลมเมื่อทำแล้ว กดชื่อเพื่ออ่านวิธี</p>}
        {/* Whoever finished is the best person to help the next Newcomers (UX audit 7, U6) */}
        {complete && (
          <div className="week-after">
            <Link href="/notes/new" className="action is-primary">
              <PencilSimpleLine weight="bold" aria-hidden="true" /> เขียนโน้ตบอกคนมาใหม่รุ่นถัดไป
            </Link>
            <Link href="/contribute#price" className="action">
              <Receipt weight="bold" aria-hidden="true" /> ไปมาแล้ว ช่วยตรวจราคา
            </Link>
          </div>
        )}
      </div>
      <ol className="week-stops">
        {firstWeek.map((item) => {
          const isDone = done.includes(item.id);
          const isNext = item === next;
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
                  aria-label={`ทำแล้ว: ${item.title}`}
                />
              </label>
              {isNext ? (
                <div className="week-next">
                  <span className="next-badge">ถัดไป</span>
                  <Link href={item.href}>{item.title}</Link>
                  {nextSummary && <p>{nextSummary}</p>}
                  <span className="week-read" aria-hidden="true">
                    อ่านวิธี <ArrowRight weight="bold" />
                  </span>
                </div>
              ) : (
                <Link href={item.href}>
                  {item.title}
                  <CaretRight weight="bold" aria-hidden="true" />
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
