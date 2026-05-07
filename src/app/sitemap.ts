import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://gsym.me",
      lastModified: new Date("2026-05-07"),
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: "https://gsym.me/press",
      lastModified: new Date("2026-05-07"),
      changeFrequency: "yearly",
      priority: 0.7
    }
  ];
}
