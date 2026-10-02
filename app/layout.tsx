import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { ChipFocus } from "@/components/ChipFocus";
import { SwipeTabs } from "@/components/SwipeTabs";
import { TabBar } from "@/components/TabBar";
import { SHOW_TRANSIT_LOGOS } from "@/lib/brands";
import "./globals.css";

export const metadata: Metadata = {
  title: "ตั้งหลัก",
  description: "บ้านยังเป็นบ้าน ที่นี่คือที่ตั้งหลัก วิธีใช้ชีวิตแถวจุฬาฯ ที่แผนที่ไม่ได้บอก จากรุ่นพี่ที่เคยมาใหม่เหมือนกัน",
};

export const viewport: Viewport = { // The phone's bar takes the canopy's dark leaves (--leaf-dark in globals.css)
  themeColor: "#3f7552", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Next turns smooth scrolling off while changing pages only when told (it opened pages half-scrolled).
    <html lang="th" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@400;500;600;700&family=Mitr:wght@400;500&display=swap"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          ข้ามไปเนื้อหา
        </a>
        <a href="#menu" className="skip-link">
          ไปที่เมนู
        </a>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <p>
            ข้อมูลแถวจุฬาฯ เขียนโดยทีมตั้งหลักและรุ่นพี่ที่เคยมาใหม่เหมือนกัน · <Link href="/contribute">ช่วยเติมข้อมูล</Link>
          </p>
          {SHOW_TRANSIT_LOGOS && (
            <p>
              <small>โลโก้ BTS และ MRT เป็นเครื่องหมายของเจ้าของ ใช้เพื่อบอกว่าเป็นสถานีอะไรเท่านั้น เว็บนี้ไม่ได้เกี่ยวข้องกับผู้ให้บริการ</small>
            </p>
          )}
        </footer>
        <TabBar />
        <ChipFocus />
        <SwipeTabs />
      </body>
    </html>
  );
}
