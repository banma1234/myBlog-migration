import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/**/*", "/admin/*", "/admin", "/404"],
    },
    sitemap: "https://chocoham.dev/sitemap.xml",
  };
}
