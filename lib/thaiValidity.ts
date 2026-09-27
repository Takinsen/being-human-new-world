import type { FormEvent } from "react";

// The browser's own "fill in this field" messages follow the browser's language;
// the site is Thai. Put onInvalidCapture={thaiValidity({...})} and onInput={clearValidity} on the form.
export function thaiValidity(messages: Record<string, string>) {
  return (e: FormEvent<HTMLFormElement>) => {
    const field = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    if (field.validity.valueMissing) field.setCustomValidity(messages[field.name] ?? "กรอกช่องนี้ก่อน");
  };
}

export function clearValidity(e: FormEvent<HTMLFormElement>) {
  const target = e.target as HTMLInputElement;
  target.setCustomValidity?.("");
  // A radio group shares one message; clear it on every radio.
  if (target.type === "radio")
    target.form?.querySelectorAll<HTMLInputElement>(`input[name="${target.name}"]`).forEach((r) => r.setCustomValidity(""));
}
