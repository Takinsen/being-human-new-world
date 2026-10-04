"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { StripVariant } from "../PhotoStrip";

const VARIANTS: { id: StripVariant; label: string }[] = [
  { id: "a", label: "A เต็มกว้าง" },
  { id: "b", label: "B เห็นรูปถัดไป" },
  { id: "c", label: "C รูปเล็ก" },
];

// PROTOTYPE (.scratch/place-photos/spec.md, Q9): floats over an open Place card to switch the
// photo strip's look. Delete it with the variants once one is picked.
export function StripVariantBar({ variant }: { variant: StripVariant }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const pick = (id: StripVariant) => {
    const q = new URLSearchParams(params.toString());
    q.set("variant", id);
    router.replace(`${pathname}?${q}`, { scroll: false });
  };

  return (
    <div className="proto-bar" role="group" aria-label="Prototype: แบบแถบรูป">
      {VARIANTS.map((v) => (
        <button key={v.id} type="button" aria-pressed={v.id === variant} onClick={() => pick(v.id)}>
          {v.label}
        </button>
      ))}
    </div>
  );
}
