"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Links from before each Guide had its own page pointed at /guides#<id>.
// A hash never reaches the server, so the redirect happens here.
export function OldGuideLinks({ ids }: { ids: string[] }) {
  const router = useRouter();
  useEffect(() => {
    const follow = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (ids.includes(id)) router.replace(`/guides/${id}`);
    };
    follow();
    window.addEventListener("hashchange", follow);
    return () => window.removeEventListener("hashchange", follow);
  }, [ids, router]);
  return null;
}
