import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { categories } from "@/content/categories";
import { guides } from "@/content/guides";
import { GuideBlock } from "@/components/GuideBlock";
import { PageHead } from "@/components/PageHead";
import { Photo } from "@/components/Photo";
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
    <div className="guide-page" data-line={guide.category}>
      <PageHead
        title={guide.title}
        back={
          <Link href={`/guides#${guide.category}`} className="back-link">
            <ArrowLeft weight="bold" aria-hidden="true" /> วิธีทั้งหมด · {category?.name}
          </Link>
        }
      />
      <div className="inner">
        <Photo photo={guide.photo} category={guide.category} icon={guide.icon} className="guide-photo" />
        <GuideBlock guide={guide} />
      </div>
    </div>
  );
}
