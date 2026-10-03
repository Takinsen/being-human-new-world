"use client";

// PROTOTYPE (type-and-spacing, Q17–Q19), throwaway: lives only on the prototype/type-and-spacing branch.
// With html[data-wrap="phrase"], a Thai line breaks only at a space: inside each space-separated
// phrase a word joiner (U+2060) goes before every character a Thai word can start with, so the
// browser's dictionary break never splits it. A phrase longer than MAX_PHRASE letters is left alone,
// so it still breaks between words rather than overflowing or breaking mid-word.
// It edits React's own text nodes in place (node.data), never replacing them, so React's later
// updates still land. Copying strips the joiners. The real version would join at render instead.

import { useEffect } from "react";

const MAX_PHRASE = 24;
const WJ = "\u2060";
// Where a Thai word can start: consonants, ฯ, leading vowels, ๆ, Thai digits. Never before a
// combining mark, so no vowel or tone mark is pulled off its consonant.
const JOIN = /(?<=[\u0E00-\u0E7F])(?=[\u0E01-\u0E2F\u0E40-\u0E44\u0E46\u0E50-\u0E59])/g;
const LETTER = /[\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46A-Za-z0-9]/g;
const SKIP = "script, style, textarea, input, select, code, pre, .type-switcher";

const originals = new WeakMap<Text, string>();
// What this pass last wrote into a node, to tell its own edits from React's
const written = new WeakMap<Text, string>();

function joinPhrases(text: string) {
  return text
    .split(/(\s+)/)
    .map((part) => {
      if (!/[\u0E00-\u0E7F]/.test(part)) return part;
      const plain = part.replaceAll(WJ, "");
      if ((plain.match(LETTER)?.length ?? 0) > MAX_PHRASE) return part;
      return plain.replace(JOIN, WJ);
    })
    .join("");
}

function textNodes(root: Node) {
  const out: Text[] = [];
  const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) =>
      /[\u0E00-\u0E7F]/.test(n.nodeValue ?? "") && !n.parentElement?.closest(SKIP)
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT,
  });
  for (let n = walk.nextNode(); n; n = walk.nextNode()) out.push(n as Text);
  return out;
}

function apply(root: Node) {
  const on = document.documentElement.dataset.wrap === "phrase";
  for (const t of textNodes(root)) {
    if (on) {
      const joined = joinPhrases(t.data);
      if (joined !== t.data) {
        if (!originals.has(t)) originals.set(t, t.data);
        written.set(t, joined);
        t.data = joined;
      }
    } else if (originals.has(t)) {
      const back = originals.get(t)!;
      originals.delete(t);
      written.set(t, back);
      t.data = back;
    }
  }
}

export function PhraseWrap() {
  useEffect(() => {
    const body = document.body;
    apply(body);
    const seen = new MutationObserver((records) => {
      for (const r of records) {
        if (r.type === "attributes") apply(body);
        else if (r.type === "characterData") {
          // React set new text: it is the new original
          const t = r.target as Text;
          if (written.get(t) === t.data) continue;
          originals.delete(t);
          apply(t);
        } else r.addedNodes.forEach((n) => apply(n));
      }
    });
    seen.observe(body, { childList: true, subtree: true, characterData: true });
    seen.observe(document.documentElement, { attributes: true, attributeFilter: ["data-wrap"] });
    const onCopy = (e: ClipboardEvent) => {
      const text = document.getSelection()?.toString();
      if (!text?.includes(WJ) || !e.clipboardData) return;
      e.clipboardData.setData("text/plain", text.replaceAll(WJ, ""));
      e.preventDefault();
    };
    document.addEventListener("copy", onCopy);
    return () => {
      seen.disconnect();
      document.removeEventListener("copy", onCopy);
    };
  }, []);
  return null;
}
