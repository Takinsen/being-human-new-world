import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { categories } from "@/content/categories";
import { guides } from "@/content/guides";
import { GuideBlock } from "@/components/GuideBlock";
import { IconFor } from "@/components/icons";
import { Wordmark } from "@/components/PageHead";
import { getContent } from "@/lib/content";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return guides.map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const guide = guides.find((g) => g.id === id);
  return { title: guide ? `${guide.title} | ตั้งหลัก` : "วิธี | ตั้งหลัก" };
}

// One Guide per page, so the Guides list stays short (docs/adr/0006).
export default async function GuidePage({ params }: Props) {
  const { id } = await params;
  const guide = (await getContent()).guides.find((g) => g.id === id);
  if (!guide) notFound();
  const category = categories.find((c) => c.id === guide.category);
  return (
    <div className="inner page guide-page" data-line={guide.category}>
      <Wordmark />
      <Link href={`/guides#${guide.category}`} className="related-link back-link">
        <ArrowLeft weight="bold" aria-hidden="true" /> วิธีหมวด{category?.name}
      </Link>
      <h1 className="guide-title">
        <span className="guide-icon">
          <IconFor name={guide.icon} />
        </span>
        {guide.title}
      </h1>
      <GuideBlock guide={guide} />
    </div>
  );
}
