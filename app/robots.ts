import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: ["/api/", "/search", "/admin/", "/admin", "/auth/", "/404"],
    },
    sitemap: "https://chocoham.dev/sitemap.xml",
  };
}
