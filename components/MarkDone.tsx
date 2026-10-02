"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, Circle } from "@phosphor-icons/react";
import { firstWeek } from "@/content/checklist";
import { useChecklist } from "@/lib/useChecklist";

// Lets a Newcomer tick the matching first-week station right after reading a Guide,
// then carries on to the next one (UX audit 7, U5).
export function MarkDone({ itemId, title }: { itemId: string; title: string }) {
  const { done, toggle } = useChecklist();
  const isDone = done.includes(itemId);
  const next = firstWeek.find((i) => i.id !== itemId && !done.includes(i.id));
  return (
    <>
      <button type="button" className={isDone ? "mark-done is-done" : "mark-done"} aria-pressed={isDone} onClick={() => toggle(itemId)}>
        {isDone ? <CheckCircle weight="fill" aria-hidden="true" /> : <Circle weight="bold" aria-hidden="true" />}
        {/* aria-pressed carries the state, so the name stays the same either way */}
        <span aria-hidden="true">{isDone ? "ทำแล้ว (สัปดาห์แรก)" : "ทำแล้ว ติ๊กในสัปดาห์แรก"}</span>
        <span className="visually-hidden">ทำแล้ว: {title}</span>
      </button>
      {isDone && (
        <Link href={next ? next.href : "/checklist"} className="related-link mark-next">
          {next ? `ข้อถัดไป: ${next.title}` : "ครบแล้ว ดูสัปดาห์แรก"}
          <ArrowRight weight="bold" aria-hidden="true" />
        </Link>
      )}
    </>
  );
}
