// src/app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gsym.me";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-03-02"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/press`,
      lastModified: new Date("2026-03-02"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
