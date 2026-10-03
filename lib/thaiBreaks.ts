// A Thai line breaks only at a space (docs/adr/0007, type and spacing): the browser's dictionary
// would split a phrase anywhere between two words ("กินเซเว่น┃เยอะ"). keepPhrases puts a word
// joiner (U+2060) inside each space-separated phrase, when text is shown and never in stored or
// sent text: not in content/, the Sheet, a form's value, an href or an id, or anything compared.

const WJ = "\u2060";
const ZWSP = "\u200B";

/** Letters a phrase may have and still be kept whole; a longer one wouldn't fit a phone's line */
const MAX_PHRASE = 24;

/**
 * Words the browser's dictionary splits (loanwords, names, compounds), kept whole even inside a
 * phrase too long to keep whole. To add one: write it here as it is spelled, without joiners;
 * the scan in .scratch/type-and-spacing/issues/04-thai-line-breaks.md finds them ("แพ็ก┃เกจ").
 * Leave out a pair that also starts a longer word ("ไม่ได้" in "ไม่ได้ยิน").
 */
const KEEP_WHOLE = [
  "แพ็กเกจ",
  "มหิตลาธิเบศร",
  "ใบอนุญาต",
  "ศาลาพระเกี้ยว",
  "สามย่าน",
  "สามย่านมิตรทาวน์",
  "จามจุรีสแควร์",
  "อาคาร",
  "มหาลัย",
  "ต่างจังหวัด",
  "ส่วนต่าง",
  "ข้าวราดแกง",
  "โรงพยาบาล",
  "โรงเรียนแพทย์",
  "ผู้ให้บริการ",
  "รูปคลื่นแตะจ่าย",
];

// Where a Thai word can start: consonants and ฯ, leading vowels, ๆ, Thai digits, after a Thai
// character. Never before a combining mark or ำ, so no vowel or tone mark leaves its consonant.
const WORD_START = /(?<=[\u0E00-\u0E7F])(?=[\u0E01-\u0E2F\u0E40-\u0E44\u0E46\u0E50-\u0E59])/g;
const THAI = /[\u0E00-\u0E7F]/;
const MARK = /[\u0E31\u0E33-\u0E3A\u0E47-\u0E4E]/;
// After a dash or slash inside a phrase ("จันทร์–เสาร์", "7:00–19:00", "บาท/เที่ยว")
const AFTER_DASH = /(?<=[-\u2013/])(?=[^\s\u0E31\u0E34-\u0E3A\u0E47-\u0E4E])/g;
// Thai base characters, Latin letters and digits: what makes a phrase long
const LETTER = /[\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59A-Za-z0-9]/g;
// A space a line may break at: any whitespace but the no-break ones ("สาย\u00A01" stays one phrase)
const BREAKABLE = /([^\S\u00A0\u2007\u202F]+)/;
// Longest first, so สามย่านมิตรทาวน์ is matched before สามย่าน
const WHOLE = new RegExp([...KEEP_WHOLE].sort((a, b) => b.length - a.length).join("|"), "g");

/** Text with its phrases kept whole on a line; joiners already in it are placed again */
export function keepPhrases(text: string): string {
  return stripJoiners(text)
    .split(BREAKABLE)
    .map((part, i) => (i % 2 ? part : joinPhrase(part)))
    .join("");
}

/** Text as it was before keepPhrases: for copying and for whatever is stored */
export function stripJoiners(text: string): string {
  return text.replace(/[\u2060\u200B]/g, "");
}

function joinPhrase(phrase: string): string {
  if ((phrase.match(LETTER)?.length ?? 0) <= MAX_PHRASE) return phrase.replace(WORD_START, WJ).replace(AFTER_DASH, WJ);
  // Too long for a line: it breaks between words, but not inside the words kept whole. A kept
  // word also gets a zero-width space at each Thai edge: a joiner cuts the dictionary's run of
  // Thai, and a run ending in half a word ("…สูงกว่าต่า") would break mid-word ("สู┃งกว่า").
  return phrase.replace(WHOLE, (word, at: number) => {
    const before = phrase[at - 1] ?? "";
    const after = phrase[at + word.length] ?? "";
    // Only part of a longer word: its last letter takes a mark
    if (MARK.test(after)) return word;
    return (THAI.test(before) ? ZWSP : "") + word.replace(WORD_START, WJ) + (THAI.test(after) ? ZWSP : "");
  });
}
