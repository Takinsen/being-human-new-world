"use client";

import { NavLink } from "./NavLink";
import { useState } from "react";
import { ArrowRight, CheckCircle, Circle } from "@phosphor-icons/react";
import { firstWeek } from "@/content/checklist";
import { keepPhrases } from "@/lib/thaiBreaks";
import { useChecklist } from "@/lib/useChecklist";

// Lets a Newcomer tick the matching first-week station right after reading a Guide,
// then carries on to the next one (UX audit 7, U5). Once ticked, that next station is
// the page's one "next" card; the Guide's own "อ่านต่อ" steps aside (audit 8, R4).
export function MarkDone({ itemId, title }: { itemId: string; title: string }) {
  const { done, toggle } = useChecklist();
  const isDone = done.includes(itemId);
  // Pops only when ticked here, not when the page opens on a Guide that is already done.
  const [popped, setPopped] = useState(false);
  const next = firstWeek.find((i) => i.id !== itemId && !done.includes(i.id));
  return (
    <>
      <button
        type="button"
        className={isDone ? (popped ? "mark-done is-done just-done" : "mark-done is-done") : "mark-done"}
        aria-pressed={isDone}
        onClick={() => {
          setPopped(!isDone);
          toggle(itemId);
        }}
      >
        {isDone ? <CheckCircle weight="fill" aria-hidden="true" /> : <Circle weight="bold" aria-hidden="true" />}
        {/* aria-pressed carries the state, so the name stays the same either way */}
        <span aria-hidden="true">{isDone ? "ติ๊กแล้วในสัปดาห์แรก" : "ทำแล้ว ติ๊กไว้ในสัปดาห์แรก"}</span>
        <span className="visually-hidden">ทำแล้ว: {title}</span>
      </button>
      {isDone && (
        <NavLink href={next ? next.href : "/checklist"} className="detail-guide guide-next mark-next">
          <span>
            <small>{next ? "ถัดไปในสัปดาห์แรก" : "ครบแล้ว"}</small>
            {next ? keepPhrases(next.title) : "ดูสัปดาห์แรก"}
          </span>
          <ArrowRight weight="bold" aria-hidden="true" />
        </NavLink>
      )}
    </>
  );
}
