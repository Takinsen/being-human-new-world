import Link from "next/link";
import { ArrowRight, Backpack, ChatCircleText, Check, Lightbulb, MapPin } from "@phosphor-icons/react/dist/ssr";
import { firstWeek } from "@/content/checklist";
import type { Guide, GuideStep } from "@/content/types";
import { MarkDone } from "./MarkDone";
import { TelText } from "./TelText";

/**
 * A Guide's body; its page supplies the title (docs/adr/0006).
 * Steps are stations on the category's line, each a card you can act on;
 * options are cards side by side to choose from.
 */
export function GuideBlock({ guide }: { guide: Guide }) {
  const checklistItem = firstWeek.find((i) => i.href === `/guides/${guide.id}`);
  const options = guide.kind === "options";
  return (
    <section className="guide" data-line={guide.category}>
      {!guide.checked && <p className="draft-tag">ร่าง</p>}
      {guide.intro && (
        <p className="guide-intro">
          <TelText text={guide.intro} />
        </p>
      )}

      {guide.bring && (
        <section className="guide-card guide-bring" aria-labelledby="bring">
          <h2 id="bring">
            <Backpack weight="bold" aria-hidden="true" /> เตรียมให้พร้อม
          </h2>
          <ul>
            {guide.bring.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      )}

      <h2 className="guide-section-title" id="steps">
        {options ? (guide.choose ?? "เลือกทางที่เหมาะ") : "ทำตามนี้"}
        <small>
          {guide.steps.length} {options ? "ทาง" : "ขั้น"}
        </small>
      </h2>

      {options ? (
        <ul className="option-cards" role="list" aria-labelledby="steps">
          {guide.steps.map((s) => (
            <li key={s.do} className="guide-card">
              <StepHeading step={s} />
              <StepBody step={s} />
            </li>
          ))}
        </ul>
      ) : (
        <>
          <ol className="step-line" role="list" aria-labelledby="steps">
            {guide.steps.map((s, i) => (
              <li key={s.do}>
                <span className="step-no" aria-hidden="true">
                  {i + 1}
                </span>
                <div className="guide-card">
                  <StepHeading step={s} number={i + 1} />
                  <StepBody step={s} />
                </div>
              </li>
            ))}
          </ol>
          <div className="step-end">
            <span className="step-no" aria-hidden="true">
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
        <Link href={guide.related.href} className="detail-guide guide-next">
          <span>
            <small>ต่อจากนี้</small>
            {guide.related.label}
          </span>
          <ArrowRight weight="bold" aria-hidden="true" />
        </Link>
      )}
    </section>
  );
}

function StepHeading({ step, number }: { step: GuideStep; number?: number }) {
  return (
    <h3>
      {number && <span className="visually-hidden">ขั้นที่ {number}: </span>}
      {step.when && (
        <small className="step-when">
          {step.when}
          <span className="visually-hidden">: </span>
        </small>
      )}
      <TelText text={step.do} />
    </h3>
  );
}

function StepBody({ step }: { step: GuideStep }) {
  return (
    <>
      {step.how && (
        <p className="step-how">
          <TelText text={step.how} />
        </p>
      )}
      {step.link && (
        <a className="related-link" href={step.link.href} target="_blank" rel="noreferrer">
          <MapPin weight="bold" aria-hidden="true" />
          {step.link.label}
          <span className="visually-hidden"> (เปิดแท็บใหม่)</span>
        </a>
      )}
      {step.say && (
        <p className="step-say">
          <ChatCircleText weight="bold" aria-hidden="true" />
          <span>
            <b>พูดว่า</b> “{step.say}”
          </span>
        </p>
      )}
      {step.tip && (
        <p className="step-tip">
          <Lightbulb weight="bold" aria-hidden="true" />
          <span>
            <span className="visually-hidden">เคล็ดลับ: </span>
            <TelText text={step.tip} />
          </span>
        </p>
      )}
    </>
  );
}
