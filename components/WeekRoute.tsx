"use client";

import Link from "next/link";
import { ArrowRight, CaretRight } from "@phosphor-icons/react";
import { firstWeek } from "@/content/checklist";
import { Peeps } from "./People";
import { guides } from "@/content/guides";
import { useChecklist } from "@/lib/useChecklist";

// Starter Checklist drawn as a line with stations; the page supplies the title.
// Progress leads, then the next station opens up to say what it's about (UX audit 5, D3).
export function WeekRoute() {
  const { done, toggle } = useChecklist();
  const count = firstWeek.filter((i) => done.includes(i.id)).length;
  const next = firstWeek.find((i) => !done.includes(i.id));
  const nextSummary = next && guides.find((g) => `/guides/${g.id}` === next.href)?.summary;
  return (
    <section className="week">
      <div className="week-progress">
        <p aria-live="polite">
          {count === firstWeek.length ? (
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
        <p className="week-hint">กดวงกลมเมื่อทำแล้ว กดชื่อเพื่ออ่านวิธี</p>
      </div>
      {/* All seven: the people come out to cheer */}
      {count === firstWeek.length && <Peeps className="week-cheer" />}
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
