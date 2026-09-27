import { Fragment } from "react";

// Hotline and phone numbers in text become tap-to-call links.
export function TelText({ text }: { text: string }) {
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
