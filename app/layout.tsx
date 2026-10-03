import type { Metadata, Viewport } from "next";
import { ChipFocus } from "@/components/ChipFocus";
import { NavLink } from "@/components/NavLink";
import { PageFrame } from "@/components/PageMotion";
import { Splash } from "@/components/Splash";
import { SwipeTabs } from "@/components/SwipeTabs";
import { TabBar } from "@/components/TabBar";
import { LOGO_NOTICE, SHOW_TRANSIT_LOGOS } from "@/lib/brands";
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
        <Splash />
        <a href="#main" className="skip-link">
          ข้ามไปเนื้อหา
        </a>
        <a href="#menu" className="skip-link">
          ไปที่เมนู
        </a>
        <main id="main">
          <PageFrame>{children}</PageFrame>
        </main>
        <footer className="site-footer">
          <p>
            ข้อมูลแถวจุฬาฯ ทีมตั้งหลักกับรุ่นพี่ที่เคยมาใหม่ช่วยกันเขียน รู้อะไรที่ยังไม่มี <NavLink href="/contribute">ช่วยเติมได้เลย</NavLink>
          </p>
          {SHOW_TRANSIT_LOGOS && (
            <p className="logo-notice">
              <small>{LOGO_NOTICE}</small>
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
