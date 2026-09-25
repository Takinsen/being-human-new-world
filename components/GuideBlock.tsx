import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { firstWeek } from "@/content/checklist";
import type { Guide } from "@/content/types";
import { IconFor } from "./icons";
import { MarkDone } from "./MarkDone";
import { Photo } from "./Photo";

// Hotline numbers in step text become tap-to-call links.
function withPhoneLinks(text: string) {
  return text.split(/\b(1669|1323)\b/).map((part, i) =>
    i % 2 ? (
      <a key={i} href={`tel:${part}`} className="tel">
        {part}
      </a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export function GuideBlock({ guide }: { guide: Guide }) {
  const List = guide.kind === "options" ? "ul" : "ol";
  const checklistItem = firstWeek.find((i) => i.href.endsWith(`#${guide.id}`));
  return (
    <section className="guide" id={guide.id}>
      <h3>
        <span className="guide-icon">
          <IconFor name={guide.icon} />
        </span>
        <span>{guide.title}</span>
      </h3>
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
