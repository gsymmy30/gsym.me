// src/app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gsym.me";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-02-21"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/press`,
      lastModified: new Date("2026-02-21"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
