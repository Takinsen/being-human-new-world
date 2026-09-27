"use client";

import Link from "next/link";
import { firstWeek } from "@/content/checklist";
import { useChecklist } from "@/lib/useChecklist";

// Starter Checklist drawn as a line with stations; the page supplies the title.
export function WeekRoute() {
  const { done, toggle } = useChecklist();
  const count = firstWeek.filter((i) => done.includes(i.id)).length;
  const next = firstWeek.find((i) => !done.includes(i.id));
  return (
    <section className="week">
      <div className="week-head">
        <span aria-live="polite">
          {count === firstWeek.length ? "ครบแล้ว ตั้งหลักได้แล้ว" : `ผ่านมาแล้ว ${count} จาก ${firstWeek.length}`}
        </span>
      </div>
      <ol className="week-stops">
        {firstWeek.map((item) => {
          const isDone = done.includes(item.id);
          return (
            <li key={item.id} className={isDone ? "is-done" : undefined} data-line={item.category ?? "general"}>
              <label className="tick">
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => toggle(item.id)}
                  aria-label={`ทำแล้ว: ${item.title}`}
                />
              </label>
              <Link href={item.href}>{item.title}</Link>
              {item === next && <span className="next-badge">ถัดไป</span>}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
