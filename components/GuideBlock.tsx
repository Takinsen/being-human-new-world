import Link from "next/link";
import { Check, MapPin, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { firstWeek } from "@/content/checklist";
import type { Guide, GuideFact, GuideStep } from "@/content/types";
import { checkedBy, thaiMonthYear } from "@/lib/format";
import { MarkDone } from "./MarkDone";
import { TelText } from "./TelText";

// A Guide reads like an article (docs/adr/0007, amended 2026-10-02): a calm reading
// column, with what you need at a glance pulled out into one "need to know" box.
// Its page supplies the title and lede (docs/adr/0006).

/**
 * The "need to know" box: facts at a glance (cost, hours, a number to call), where the
 * prices come from in one fine line, and what to bring. Above the article on a phone;
 * beside it, sticky, on a wide screen.
 */
export function GuideNeedToKnow({ guide }: { guide: Guide }) {
  if (!guide.facts && !guide.bring) return null;
  const source = guide.facts && priceSource(guide.facts);
  return (
    <aside className="guide-know" aria-label="รู้ไว้ก่อน">
      {guide.facts && (
        <dl className="guide-facts">
          {guide.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>
                <span className="fact-value">
                  <FactValue fact={f} />
                </span>
                {f.note && <small className="fact-note">{f.note}</small>}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {source && <p className="guide-source">{source}</p>}
      {guide.bring && (
        <section className="guide-bring" aria-labelledby="bring">
          <h2 id="bring">พกไปด้วย</h2>
          <ul>
            {guide.bring.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      )}
    </aside>
  );
}

/** A price shows as a number only with a Price Check, the figure on platform yellow (docs/adr/0001) */
function FactValue({ fact }: { fact: GuideFact }) {
  if (fact.value) return <TelText text={fact.value} />;
  if (!fact.price) return null;
  if (!fact.price.checked) return <span className="fact-pending">รอตรวจราคา</span>;
  const { min, max, per } = fact.price;
  return (
    <>
      <span className="visually-hidden">ราคาปกติ </span>
      <mark className="fact-price">{min === max ? min : `${min}–${max}`} บาท</mark> <small className="fact-per">{per}</small>
    </>
  );
}

/** Where the box's prices come from, said once, in the words a Place card uses (docs/adr/0001) */
function priceSource(facts: GuideFact[]): string | null {
  const checks = facts.flatMap((f) => (f.price?.checked ? [{ label: f.label, check: f.price.checked }] : []));
  if (!checks.length) return null;
  const months = (on: string[]) => [...new Set(on)].sort().map(thaiMonthYear).join(" และ ");
  const web = checks.filter((c) => c.check.how === "web");
  const spot = checks.filter((c) => c.check.how !== "web");
  const lines = spot.map((c) => `ราคา${c.label} ตรวจ ${thaiMonthYear(c.check.on)} โดย${checkedBy(c.check)}`);
  if (web.length) {
    const what = spot.length ? `ราคา${web.map((c) => c.label).join(" ")}` : "ราคา";
    lines.push(`${what}ข้อมูลจากเว็บ ${months(web.map((c) => c.check.on))} ยังไม่มีใครไปดูราคาจริง`);
  }
  return lines.join(" ส่วน");
}

/** The article: intro, the steps along the dotted path (or options between thin rules), then where to read on. */
export function GuideBlock({ guide }: { guide: Guide }) {
  const checklistItem = firstWeek.find((i) => i.href === `/guides/${guide.id}`);
  const options = guide.kind === "options";
  return (
    <article className="guide" data-line={guide.category}>
      {!guide.checked && <p className="draft-tag">ร่าง</p>}
      {guide.intro && (
        <p className="guide-intro">
          <TelText text={guide.intro} />
        </p>
      )}

      {/* Long options: the urgent ones a tap away, before the list (UX audit 7, U2) */}
      {guide.jumps && (
        <nav className="jump-links guide-jumps" aria-label="ไปที่ทางเลือก">
          {guide.jumps.map((j) => (
            <a key={j.to} href={`#${j.to}`} data-urgent={guide.steps.find((s) => s.id === j.to)?.urgent || undefined}>
              {j.label}
            </a>
          ))}
        </nav>
      )}

      <h2 className="guide-steps-title" id="steps">
        {options ? (guide.choose ?? "เลือกแบบที่ใช่") : "ทำตามนี้"}
      </h2>

      {options ? (
        <ul className="guide-options" role="list" aria-labelledby="steps">
          {guide.steps.map((s) => (
            <li key={s.do} id={s.id} data-urgent={s.urgent || undefined}>
              <Step step={s} />
            </li>
          ))}
        </ul>
      ) : (
        <>
          <ol className="guide-steps" role="list" aria-labelledby="steps">
            {guide.steps.map((s, i) => (
              <li key={s.do}>
                <span className="station" aria-hidden="true">
                  {i + 1}
                </span>
                <Step step={s} number={i + 1} />
              </li>
            ))}
          </ol>
          <div className="guide-end">
            <span className="station" aria-hidden="true">
              <Check weight="bold" />
            </span>
            <div>
              <p>เท่านี้เอง</p>
              {checklistItem && <MarkDone itemId={checklistItem.id} title={checklistItem.title} />}
            </div>
          </div>
        </>
      )}

      {options && checklistItem && <MarkDone itemId={checklistItem.id} title={checklistItem.title} />}

      {guide.related && (
        <p className="guide-next">
          <small>อ่านต่อ</small>
          <Link href={guide.related.href}>{guide.related.label}</Link>
        </p>
      )}
    </article>
  );
}

/** One step or option, always in this order: the action line, its points, a link, the words to say, a warning, a tip. */
function Step({ step, number }: { step: GuideStep; number?: number }) {
  return (
    <div className="step">
      <h3 className="step-do">
        {number && <span className="visually-hidden">ขั้นที่ {number}: </span>}
        {step.when && (
          <small className="step-when">
            {step.when}
            <span className="visually-hidden">: </span>
          </small>
        )}
        <TelText text={step.do} />
      </h3>
      {step.points && (
        <ul className="step-points">
          {step.points.map((p) => (
            <li key={p}>
              {/* One flex item, so a phone number inside the line stays in the sentence */}
              <span>
                <TelText text={p} />
              </span>
            </li>
          ))}
        </ul>
      )}
      {step.link && (
        <a className="step-link" href={step.link.href} target="_blank" rel="noreferrer">
          <MapPin weight="bold" aria-hidden="true" />
          {step.link.label}
          <span className="visually-hidden"> (เปิดแท็บใหม่)</span>
        </a>
      )}
      {step.say && (
        <p className="step-say">
          <b>พูดว่า</b> <q>{step.say}</q>
        </p>
      )}
      {step.warn && (
        <p className="step-warn">
          <WarningCircle weight="bold" aria-hidden="true" />
          <span>
            <span className="visually-hidden">ระวัง: </span>
            <TelText text={step.warn} />
          </span>
        </p>
      )}
      {step.tip && (
        <p className="step-tip">
          <span className="visually-hidden">เคล็ดลับ: </span>
          <TelText text={step.tip} />
        </p>
      )}
    </div>
  );
}
