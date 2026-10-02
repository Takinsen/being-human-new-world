import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { categories } from "@/content/categories";
import { guides } from "@/content/guides";
import { GuideBlock } from "@/components/GuideBlock";
import { IconFor } from "@/components/icons";
import { PageHead } from "@/components/PageHead";
import { Price } from "@/components/Price";
import { TelText } from "@/components/TelText";
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
      <div className="guide-hero">
        <PageHead
          title={
            <span className="title-with-icon">
              <span className="guide-icon">
                <IconFor name={guide.icon} />
              </span>
              {guide.title}
            </span>
          }
          back={
            <Link href={`/guides#${guide.category}`} className="back-link">
              <ArrowLeft weight="bold" aria-hidden="true" /> วิธีทั้งหมด · {category?.name}
            </Link>
          }
          lede={guide.summary}
        >
          {guide.facts && (
            <dl className="guide-facts">
              {guide.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>
                    {f.value && <TelText text={f.value} />}
                    {f.price && <Price price={f.price} short />}
                    {f.note && <small>{f.note}</small>}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </PageHead>
      </div>
      <div className="guide-body">
        <div className="inner">
          <GuideBlock guide={guide} />
        </div>
      </div>
    </div>
  );
}
