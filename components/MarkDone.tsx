"use client";

import { CheckCircle, Circle } from "@phosphor-icons/react";
import { useChecklist } from "@/lib/useChecklist";

// Lets a Newcomer tick the matching first-week station right after reading a Guide.
export function MarkDone({ itemId, title }: { itemId: string; title: string }) {
  const { done, toggle } = useChecklist();
  const isDone = done.includes(itemId);
  return (
    <button type="button" className={isDone ? "mark-done is-done" : "mark-done"} aria-pressed={isDone} onClick={() => toggle(itemId)}>
      {isDone ? <CheckCircle weight="fill" aria-hidden="true" /> : <Circle weight="bold" aria-hidden="true" />}
      {isDone ? "ทำแล้ว (สัปดาห์แรก)" : "ทำแล้ว ติ๊กในสัปดาห์แรก"}
      <span className="visually-hidden">: {title}</span>
    </button>
  );
}
