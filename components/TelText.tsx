import { Fragment } from "react";
import { keepPhrases } from "@/lib/thaiBreaks";

// Hotline and phone numbers in text become tap-to-call links. Phrases are kept whole after
// the split, so a number is found and dialled as it is written.
export function TelText({ text }: { text: string }) {
  return text.split(/\b(1669|1323|0\d-\d{3,4}-\d{4})\b/).map((part, i) =>
    i % 2 ? (
      <a key={i} href={`tel:${part.replace(/-/g, "")}`} className="tel">
        {keepPhrases(part)}
      </a>
    ) : (
      <Fragment key={i}>{keepPhrases(part)}</Fragment>
    ),
  );
}
