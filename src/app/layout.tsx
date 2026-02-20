// src/app/layout.tsx
import type { Metadata } from "next";
import GridBackground from "@/components/GridBackground";
import "./globals.css";


export const metadata: Metadata = {
  metadataBase: new URL("https://gsym.me"),
  applicationName: "Gursimran Singh",
  title: {
    default: "Gursimran Singh",
    template: "%s | Gursimran Singh",
  },
  description:
    "Gursimran Singh is a Technical Program Manager at Google DeepMind in San Francisco. Previously Product Manager at Microsoft Azure. Georgia Tech CS + Design graduate.",
  keywords: [
    "Gursimran Singh",
    "Gursimran",
    "Singh",
    "gsym",
    "gsymmy",
    "gsym.me",
    "Technical Program Manager",
    "TPM",
    "Google DeepMind",
    "DeepMind",
    "Google",
    "Microsoft Azure",
    "Azure",
    "Microsoft",
    "Georgia Tech",
    "Georgia Institute of Technology",
    "San Francisco",
    "Product Manager",
    "ping the singh",
    "pingthesingh",
  ],
  authors: [{ name: "Gursimran Singh", url: "https://gsym.me" }],
  creator: "Gursimran Singh",
  publisher: "Gursimran Singh",
  category: "Personal Website",
  alternates: { canonical: "https://gsym.me" },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Gursimran Singh — TPM at Google DeepMind",
    description:
      "Gursimran Singh is a Technical Program Manager at Google DeepMind in San Francisco. Previously Product Manager at Microsoft Azure. Georgia Tech CS + Design graduate.",
    url: "https://gsym.me",
    siteName: "Gursimran Singh",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Gursimran Singh — Technical Program Manager at Google DeepMind",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gursimran Singh — TPM at Google DeepMind",
    description:
      "Technical Program Manager at Google DeepMind. Previously Product at Microsoft Azure. Georgia Tech CS + Design.",
    images: ["/og.png"],
    creator: "@gsymmy",
    site: "@gsymmy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these after setting up Google Search Console
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD structured data (Person)
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://gsym.me/#person",
    name: "Gursimran Singh",
    givenName: "Gursimran",
    familyName: "Singh",
    url: "https://gsym.me",
    image: "https://gsym.me/headshot.jpg",
    jobTitle: "Technical Program Manager",
    worksFor: {
      "@type": "Organization",
      name: "Google DeepMind",
      url: "https://deepmind.google",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Georgia Institute of Technology",
      alternateName: "Georgia Tech",
    },
    knowsAbout: ["Product Management", "Technical Program Management", "Computer Vision", "AI", "Machine Learning"],
    sameAs: [
      "https://www.linkedin.com/in/pingthesingh/",
      "https://github.com/gsymmy30",
      "https://x.com/gsymmy",
    ],
  };

  // WebSite schema for sitelinks search box
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://gsym.me/#website",
    url: "https://gsym.me",
    name: "Gursimran Singh",
    description: "Personal website of Gursimran Singh, Technical Program Manager at Google DeepMind",
    publisher: { "@id": "https://gsym.me/#person" },
  };

  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://gsym.me/#profile",
    url: "https://gsym.me",
    name: "Gursimran Singh",
    inLanguage: "en-US",
    mainEntity: { "@id": "https://gsym.me/#person" },
    isPartOf: { "@id": "https://gsym.me/#website" },
  };

  return (
    <html lang="en">
      <body
        className="antialiased"
        suppressHydrationWarning
      >

        {/* Structured data for rich results */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
        />
        <GridBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
