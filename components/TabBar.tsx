"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenText, ChatCenteredText, ListChecks, MapTrifold } from "@phosphor-icons/react";

const tabs = [
  { href: "/", label: "แผนที่", Icon: MapTrifold },
  { href: "/notes", label: "โน้ต", Icon: ChatCenteredText },
  { href: "/guides", label: "วิธี", Icon: BookOpenText },
  { href: "/checklist", label: "สัปดาห์แรก", Icon: ListChecks },
];

// The site's only navigation (docs/adr/0006): within thumb reach on a phone.
export function TabBar() {
  const pathname = usePathname();
  const current = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  return (
    <nav className="tab-bar" aria-label="เมนูหลัก">
      {tabs.map(({ href, label, Icon }) => (
        <Link key={href} href={href} aria-current={current(href) ? "page" : undefined}>
          <Icon weight={current(href) ? "fill" : "bold"} aria-hidden="true" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
