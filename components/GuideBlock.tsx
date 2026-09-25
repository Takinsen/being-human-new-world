import type { Guide } from "@/content/types";

export function GuideBlock({ guide }: { guide: Guide }) {
  return (
    <section className="guide" id={guide.id}>
      <h3>
        {guide.title}
        {!guide.checked && <span className="draft-tag">ร่าง รอทีมลองทำจริง</span>}
      </h3>
      {guide.intro && <p>{guide.intro}</p>}
      <ol>
        {guide.steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
    </section>
  );
}
