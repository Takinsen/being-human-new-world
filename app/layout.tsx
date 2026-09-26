import type { Metadata, Viewport } from "next";
import { TabBar } from "@/components/TabBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "ตั้งหลัก",
  description: "บ้านยังเป็นบ้าน ที่นี่คือที่ตั้งหลัก วิธีใช้ชีวิตแถวจุฬาฯ ที่แผนที่ไม่ได้บอก จากรุ่นพี่ที่เคยมาใหม่เหมือนกัน",
};

export const viewport: Viewport = { themeColor: "#ffffff", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap"
        />
      </head>
      <body>
        <main>{children}</main>
        <footer className="site-footer">
          <p>ข้อมูลแถวจุฬาฯ เขียนโดยทีมตั้งหลักและรุ่นพี่ที่เคยมาใหม่เหมือนกัน</p>
        </footer>
        <TabBar />
      </body>
    </html>
  );
}
