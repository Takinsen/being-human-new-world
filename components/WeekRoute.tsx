"use client";

import Link from "next/link";
import { Path } from "@phosphor-icons/react";
import { firstWeek } from "@/content/checklist";
import { useChecklist } from "@/lib/useChecklist";

// Starter Checklist drawn as a line with stations. Ticking a station marks it done.
export function WeekRoute({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  const { done, toggle } = useChecklist();
  const count = firstWeek.filter((i) => done.includes(i.id)).length;
  const next = firstWeek.find((i) => !done.includes(i.id));
  const Heading = heading;
  return (
    <section className="week">
      <div className="week-head">
        <Heading>
          <Path weight="bold" aria-hidden="true" /> สัปดาห์แรก
        </Heading>
        <span>{count === firstWeek.length ? "ครบแล้ว ตั้งหลักได้แล้ว" : `ผ่านมาแล้ว ${count} จาก ${firstWeek.length}`}</span>
      </div>
      <ol className="week-stops" style={{ "--progress": `${(count / firstWeek.length) * 100}%` } as React.CSSProperties}>
        {firstWeek.map((item) => {
          const isDone = done.includes(item.id);
          return (
            <li key={item.id} className={isDone ? "is-done" : undefined} data-line={item.category ?? "general"}>
              <input
                type="checkbox"
                checked={isDone}
                onChange={() => toggle(item.id)}
                aria-label={`ทำแล้ว: ${item.title}`}
              />
              <Link href={item.href}>{item.title}</Link>
              {item === next && <span className="next-badge">ถัดไป</span>}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
