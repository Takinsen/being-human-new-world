import type { Metadata } from "next";
import { NavLink } from "@/components/NavLink";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { categories } from "@/content/categories";
import { guides } from "@/content/guides";
import { GuideBlock, GuideNeedToKnow } from "@/components/GuideBlock";
import { BrandLogo, CategoryIcon } from "@/components/icons";
import { PageHead } from "@/components/PageHead";
import { FlyingName } from "@/components/PageMotion";
import { TelText } from "@/components/TelText";
import { getContent } from "@/lib/content";
import { keepPhrases } from "@/lib/thaiBreaks";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return guides.map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const guide = guides.find((g) => g.id === id);
  return { title: guide ? `${guide.title} | ตั้งหลัก` : "คู่มือ | ตั้งหลัก" };
}

// One Guide per page, so the Guides list stays short (docs/adr/0006). It reads like an
// article: title, the gist as the lede, the "need to know" box, then the steps (docs/adr/0007).
export default async function GuidePage({ params }: Props) {
  const { id } = await params;
  const guide = (await getContent()).guides.find((g) => g.id === id);
  if (!guide) notFound();
  const category = categories.find((c) => c.id === guide.category);
  return (
    <div className="guide-page" data-line={guide.category}>
      <PageHead
        title={<FlyingName name={`guide-title-${guide.id}`}>{keepPhrases(guide.title)}</FlyingName>}
        back={
          <div className="guide-crumbs">
            <NavLink href={`/guides#${guide.category}`} className="back-link">
              <ArrowLeft weight="bold" aria-hidden="true" /> คู่มือทั้งหมด
            </NavLink>
            {/* A BTS or MRT Guide names its operator with the logo, on white; others show the category's icon */}
            <span className="guide-eyebrow">
              <BrandLogo brand={guide.brand} fallback={<CategoryIcon id={guide.category} />} />
              {category?.name}
            </span>
          </div>
        }
        lede={guide.intro ? <TelText text={guide.intro} /> : guide.summary}
      />
      <div className="guide-body">
        <GuideNeedToKnow guide={guide} />
        <GuideBlock guide={guide} />
      </div>
    </div>
  );
}
