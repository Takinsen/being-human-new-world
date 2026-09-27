import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { firstWeek } from "@/content/checklist";
import type { Guide } from "@/content/types";
import { MarkDone } from "./MarkDone";
import { TelText } from "./TelText";

/** A Guide's steps; its page supplies the title (docs/adr/0006). */
export function GuideBlock({ guide }: { guide: Guide }) {
  const List = guide.kind === "options" ? "ul" : "ol";
  const checklistItem = firstWeek.find((i) => i.href === `/guides/${guide.id}`);
  return (
    <section className="guide" data-line={guide.category}>
      {!guide.checked && <p className="draft-tag">ร่าง</p>}
      {guide.intro && <p className="guide-intro">{guide.intro}</p>}
      <List className={guide.kind === "options" ? "options" : "steps"}>
        {guide.steps.map((s) => (
          <li key={s}>
            <span>
              <TelText text={s} />
            </span>
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
