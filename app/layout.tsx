import type { Metadata, Viewport } from "next";
import { ChipFocus } from "@/components/ChipFocus";
import { TabBar } from "@/components/TabBar";
import { LookSwitcher } from "@/components/prototype/LookSwitcher";
import "./globals.css";
import "./prototype-looks.css";

export const metadata: Metadata = {
  title: "ตั้งหลัก",
  description: "บ้านยังเป็นบ้าน ที่นี่คือที่ตั้งหลัก วิธีใช้ชีวิตแถวจุฬาฯ ที่แผนที่ไม่ได้บอก จากรุ่นพี่ที่เคยมาใหม่เหมือนกัน",
};

export const viewport: Viewport = { themeColor: "#ffffff", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Next turns smooth scrolling off while changing pages only when told (it opened pages half-scrolled).
    <html lang="th" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,400;0,500;0,600;0,700;1,500&family=IBM+Plex+Sans+Thai+Looped:wght@400;500;600;700&family=Mitr:wght@400;500;600&display=swap"
        />
      </head>
      <body>
        {/* PROTOTYPE: set the look before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var l=new URLSearchParams(location.search).get("look")||sessionStorage.getItem("tanglak:prototype-look")||"B";document.documentElement.dataset.look=l.toUpperCase()}catch(e){document.documentElement.dataset.look="B"}`,
          }}
        />
        <a href="#main" className="skip-link">
          ข้ามไปเนื้อหา
        </a>
        <a href="#menu" className="skip-link">
          ไปที่เมนู
        </a>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <p>ข้อมูลแถวจุฬาฯ เขียนโดยทีมตั้งหลักและรุ่นพี่ที่เคยมาใหม่เหมือนกัน</p>
        </footer>
        <TabBar />
        <ChipFocus />
        <LookSwitcher />
      </body>
    </html>
  );
}
