import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Gursimran Singh",
    short_name: "Gursimran",
    description: "Personal website of Gursimran Singh.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#001538",
    theme_color: "#001538",
    lang: "en-US",
    dir: "ltr",
    categories: ["personal", "portfolio", "technology"],
    prefer_related_applications: false,
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    shortcuts: [
      {
        name: "Press",
        short_name: "Press",
        description: "Press mentions featuring Gursimran Singh",
        url: "/press",
        icons: [{ src: "/favicon-32x32.png", sizes: "32x32" }],
      },
    ],
  };
}
