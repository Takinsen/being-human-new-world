import type { Guide } from "@/content/types";
import { IconFor } from "./icons";
import { Photo } from "./Photo";

export function GuideBlock({ guide }: { guide: Guide }) {
  return (
    <section className="guide" id={guide.id}>
      <h3>
        <span className="guide-icon">
          <IconFor name={guide.icon} />
        </span>
        <span>{guide.title}</span>
      </h3>
      {!guide.checked && <p className="draft-tag">ร่าง รอทีมลองทำจริง</p>}
      {guide.intro && <p className="guide-intro">{guide.intro}</p>}
      {guide.photo && <Photo photo={guide.photo} className="guide-photo" />}
      <ol>
        {guide.steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
    </section>
  );
}
