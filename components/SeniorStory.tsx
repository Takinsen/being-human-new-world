import type { Senior } from "@/content/types";

export function SeniorStory({ senior }: { senior: Senior }) {
  return (
    <article className="story" id={senior.id}>
      <header>
        <span className="avatar" aria-hidden="true">
          {initial(senior.name)}
        </span>
        <div>
          <h2>{senior.name}</h2>
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

// The first consonant of the name after "พี่": leading vowels (เ แ โ ใ ไ) can't stand alone.
function initial(name: string): string {
  return name.replace(/^พี่\s*/, "").replace(/^[เแโใไ]/, "").slice(0, 1);
}
