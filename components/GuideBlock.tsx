import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { firstWeek } from "@/content/checklist";
import type { Guide } from "@/content/types";
import { MarkDone } from "./MarkDone";
import { Photo } from "./Photo";

// Hotline and phone numbers in step text become tap-to-call links.
function withPhoneLinks(text: string) {
  return text.split(/\b(1669|1323|0\d-\d{3}-\d{4})\b/).map((part, i) =>
    i % 2 ? (
      <a key={i} href={`tel:${part.replace(/-/g, "")}`} className="tel">
        {part}
      </a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** A Guide's steps; its page supplies the title (docs/adr/0006). */
export function GuideBlock({ guide }: { guide: Guide }) {
  const List = guide.kind === "options" ? "ul" : "ol";
  const checklistItem = firstWeek.find((i) => i.href === `/guides/${guide.id}`);
  return (
    <section className="guide" data-line={guide.category}>
      {!guide.checked && <p className="draft-tag">ร่าง</p>}
      {guide.intro && <p className="guide-intro">{guide.intro}</p>}
      {guide.photo && <Photo photo={guide.photo} className="guide-photo" />}
      <List className={guide.kind === "options" ? "options" : "steps"}>
        {guide.steps.map((s) => (
          <li key={s}>
            <span>{withPhoneLinks(s)}</span>
          </li>
        ))}
      </List>
      {guide.related && (
        <Link href={guide.related.href} className="related-link">
          {guide.related.label}
          <ArrowRight weight="bold" aria-hidden="true" />
        </Link>
      )}
      {checklistItem && <MarkDone itemId={checklistItem.id} title={checklistItem.title} />}
    </section>
  );
}
