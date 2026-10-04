import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The category pages and /map folded into the map home and /guides (docs/adr/0006).
  // /notes is static so it can be prefetched in full; a category, a Place or a just-posted Note
  // in the query goes to a page that reads it (app/notes/Feed.tsx, .scratch/map-polish/spec.md Q8).
  async rewrites() {
    return {
      beforeFiles: ["line", "place", "posted"].map((key) => ({
        source: "/notes",
        has: [{ type: "query" as const, key }],
        destination: "/notes/view",
      })),
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      { source: "/map", destination: "/", permanent: false },
      // /living was Living Alone, now Health and Household (docs/adr/0008); most of its Guides are household ones.
      ...[["transport", "transport"], ["food", "food"], ["living", "household"]].map(([from, to]) => ({
        source: `/${from}`,
        destination: `/guides#${to}`,
        permanent: false,
      })),
    ];
  },
};

export default nextConfig;
