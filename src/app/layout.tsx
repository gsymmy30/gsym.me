// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Martian_Mono, Montserrat, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const martianMono = Martian_Mono({
  subsets: ["latin"],
  weight: ["300"], // pick what you want
  variable: "--font-martian",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://gsym.me"),
  title: "Gursimran Singh",
  description:
    "Product Manager at Microsoft Azure. CS + Design at Georgia Tech. Focused on AIOps, observability, devtools, hardware, and fitness.",
  keywords: [
    "Gursimran Singh",
    "gsym",
    "gsymmy",
    "Product Manager",
    "Microsoft Azure",
    "AIOps",
    "Observability",
    "Developer Tools",
    "Georgia Tech",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Gursimran Singh",
    description:
      "Product Manager at Microsoft Azure. CS + Design at Georgia Tech. Focused on AIOps, observability, and devtools.",
    url: "https://gsym.me",
    siteName: "gsym.me",
    images: [
      {
        url: "/og.png", // add a 1200x630 image in /public
        width: 1200,
        height: 630,
        alt: "Gursimran Singh — gsym.me",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gursimran Singh",
    description:
      "Product Manager at Microsoft Azure. CS + Design at Georgia Tech. Focused on AIOps, observability, and devtools.",
    images: ["/og.png"],
    creator: "@gsymmy", // update if different or remove if not used
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // optional, add this in /public
    other: [
      {
        rel: "icon",
        url: "/icon.svg", // optional, if you add an SVG favicon
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD structured data (Person)
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gursimran Singh",
    url: "https://gsym.me",
    jobTitle: "Product Manager",
    worksFor: { "@type": "Organization", name: "Microsoft" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Georgia Tech" },
    sameAs: [
      "https://www.linkedin.com/in/pingthesingh/",
      "https://github.com/gsymmy30",
      "https://x.com/gsymmy" // add if you want
    ],
  };

  return (
    <html lang="en">
     <body  className={`${poppins.className} bg-neutral-950 text-neutral-100 antialiased`}>
        {/* Structured data for rich results */}
        <script
          type="application/ld+json"
          // Avoid hydration mismatch warnings for inline JSON
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
