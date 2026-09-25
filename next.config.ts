import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The category pages and /map folded into the map home and /guides (docs/adr/0006).
  async redirects() {
    return [
      { source: "/map", destination: "/", permanent: false },
      ...["transport", "food", "living"].map((id) => ({
        source: `/${id}`,
        destination: `/guides#${id}`,
        permanent: false,
      })),
    ];
  },
};

export default nextConfig;
