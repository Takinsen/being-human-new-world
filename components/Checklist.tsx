"use client";

import Link from "next/link";
import { firstWeek } from "@/content/checklist";
import { useChecklist } from "@/lib/useChecklist";

export function Checklist() {
  const { done, toggle } = useChecklist();
  return (
    <ol className="checklist">
      {firstWeek.map((item) => {
        const isDone = done.includes(item.id);
        return (
          <li key={item.id} className={isDone ? "is-done" : undefined}>
            <label>
              <input type="checkbox" checked={isDone} onChange={() => toggle(item.id)} />
              <span>{item.title}</span>
            </label>
            <Link href={item.href}>อ่านวิธี</Link>
          </li>
        );
      })}
    </ol>
  );
}

export function ChecklistProgress() {
  const { done } = useChecklist();
  const count = firstWeek.filter((i) => done.includes(i.id)).length;
  const total = firstWeek.length;
  return (
    <Link href="/checklist" className="progress">
      <span className="progress-text">
        {count === 0
          ? `สัปดาห์แรก: เริ่มจาก ${total} เรื่องนี้ก่อน`
          : count === total
            ? "สัปดาห์แรก: ครบแล้ว ตั้งหลักได้แล้ว"
            : `สัปดาห์แรก: ทำไปแล้ว ${count} จาก ${total}`}
      </span>
      <span className="progress-bar" aria-hidden="true">
        {firstWeek.map((i) => (
          <span key={i.id} className={done.includes(i.id) ? "tick is-done" : "tick"} />
        ))}
      </span>
    </Link>
  );
}
