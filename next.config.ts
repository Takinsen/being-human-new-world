import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The category pages and /map folded into the map home and /guides (docs/adr/0006).
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
