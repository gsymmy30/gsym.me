import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gursimran Singh",
    short_name: "Gursimran",
    description: "Personal website of Gursimran Singh.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0d0e",
    theme_color: "#0c0d0e",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
