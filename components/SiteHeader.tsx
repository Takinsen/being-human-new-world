"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/content/categories";

// On a category page the header takes that line's colour.
export function SiteHeader() {
  const pathname = usePathname();
  const line = categories.find((c) => pathname === `/${c.id}`)?.id;
  return (
    <header className="site-header" data-line={line}>
      <Link href="/" className="wordmark">
        <span className="wordmark-lines" aria-hidden="true">
          <i data-line="transport" />
          <i data-line="food" />
          <i data-line="living" />
        </span>
        ตั้งหลัก
      </Link>
      <nav aria-label="หมวด">
        {categories.map((c) => (
          <Link key={c.id} href={`/${c.id}`} aria-current={line === c.id ? "page" : undefined}>
            {c.name}
          </Link>
        ))}
        <Link href="/checklist" aria-current={pathname === "/checklist" ? "page" : undefined}>
          สัปดาห์แรก
        </Link>
        <Link href="/seniors" aria-current={pathname === "/seniors" ? "page" : undefined}>
          รุ่นพี่
        </Link>
      </nav>
    </header>
  );
}
