import { BookOpenText, ChatCenteredText, ListChecks, MapTrifold } from "@phosphor-icons/react";

/** The tabs in order, left to right (components/TabBar.tsx); swiping and a tab change's slide follow it too */
export const tabs = [
  { href: "/", label: "แผนที่", Icon: MapTrifold },
  { href: "/notes", label: "โน้ต", Icon: ChatCenteredText },
  { href: "/guides", label: "คู่มือ", Icon: BookOpenText },
  { href: "/checklist", label: "สัปดาห์แรก", Icon: ListChecks },
];
