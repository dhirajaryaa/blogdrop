import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/constant";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/feed",
    "/explore",
    "/trending",
    "/about",
    "/contact",
    "/terms",
    "/privacy",
    "/copyright",
    "/cookies",
  ];

  return staticPages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
