import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: ["/admin/", "/admin"],
    },
    sitemap: "https://chocoham.dev/sitemap.xml",
  };
}
