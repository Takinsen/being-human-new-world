import type { FormEvent } from "react";

// The browser's own "fill in this field" messages follow the browser's language;
// the site is Thai. Put onInvalidCapture={thaiValidity({...})} and onInput={clearValidity} on the form.
export function thaiValidity(messages: Record<string, string>) {
  return (e: FormEvent<HTMLFormElement>) => {
    const field = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const v = field.validity;
    if (v.valueMissing) field.setCustomValidity(messages[field.name] ?? "ช่องนี้ยังว่างอยู่");
    // Number fields: the browser's own messages are English
    else if (v.badInput || v.stepMismatch) field.setCustomValidity("ใส่เป็นเลขเต็ม ไม่ต้องมีทศนิยม");
    else if (v.rangeUnderflow && "min" in field) field.setCustomValidity(`ใส่ตั้งแต่ ${field.min} ขึ้นไป`);
    else if (v.rangeOverflow && "max" in field) field.setCustomValidity(`ใส่ไม่เกิน ${field.max}`);
  };
}

export function clearValidity(e: FormEvent<HTMLFormElement>) {
  const target = e.target as HTMLInputElement;
  target.setCustomValidity?.("");
  // A radio group shares one message; clear it on every radio.
  if (target.type === "radio")
    target.form?.querySelectorAll<HTMLInputElement>(`input[name="${target.name}"]`).forEach((r) => r.setCustomValidity(""));
}
