import type { Senior } from "@/content/types";

export function SeniorStory({ senior }: { senior: Senior }) {
  return (
    <article className="story" id={senior.id}>
      <header>
        <span className="avatar" aria-hidden="true">
          {senior.name.replace("พี่", "").slice(0, 1)}
        </span>
        <div>
          <h3>{senior.name}</h3>
          <p className="story-from">
            บ้านอยู่{senior.hometown}
            {senior.about && `, ${senior.about}`}
          </p>
        </div>
      </header>
      <div className="story-body">
        {senior.story.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      {!senior.approved && <p className="draft-tag">ร่างจากบทสัมภาษณ์ รอ{senior.name}ตรวจ</p>}
    </article>
  );
}
