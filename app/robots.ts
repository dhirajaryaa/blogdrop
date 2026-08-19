import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/constant";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "*",
        disallow: ["/api/", "/auth/", "/settings/", "/saved/", "/history/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
