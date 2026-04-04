// src/app/layout.tsx
import type { Metadata } from "next";
import { Parkinsans } from "next/font/google";
import "./globals.css";

const parkinsans = Parkinsans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-parkinsans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gsym.me"),
  applicationName: "Gursimran Singh",
  title: {
    default: "Gursimran Singh",
    template: "%s — Gursimran Singh",
  },
  description:
    "Gursimran Singh is a Technical Program Manager at Google DeepMind. Previously PM at Microsoft Azure. Georgia Tech CS + Design.",
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
    "Gursimran Singh Google",
    "Gursimran Singh DeepMind",
    "Gursimran Singh TPM",
    "Gursimran Singh Microsoft",
    "Gursimran Singh Georgia Tech",
    "Gursimran Singh San Francisco",
    "Gursimran Singh personal website",
    "Gursimran Singh portfolio",
    "Gursimran Singh sticky note",
    "gsymmy30",
    "AI Technical Program Manager",
    "AI TPM San Francisco",
    "Technical Program Manager AI ML",
    "Google DeepMind TPM",
    "Google DeepMind Technical Program Manager",
    "Microsoft Azure Product Manager",
    "Georgia Tech Computer Science",
    "Georgia Tech CS Design",
    "Computer Vision AI product",
    "AI program manager",
    "ML program manager",
  ],
  authors: [{ name: "Gursimran Singh", url: "https://gsym.me" }],
  creator: "Gursimran Singh",
  publisher: "Gursimran Singh",
  category: "Personal Website",
  alternates: {
    canonical: "https://gsym.me",
    languages: { "en-US": "https://gsym.me" },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Gursimran Singh",
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
      {
        url: "/headshot.jpg",
        width: 1563,
        height: 1563,
        alt: "Gursimran Singh — Technical Program Manager at Google DeepMind",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gursimran Singh",
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
  other: {
    "geo.region": "US-CA",
    "geo.placename": "San Francisco, California",
    "geo.position": "37.7749;-122.4194",
    "ICBM": "37.7749, -122.4194",
    "DC.title": "Gursimran Singh",
    "DC.creator": "Gursimran Singh",
    "DC.subject": "Technical Program Manager, Google DeepMind, San Francisco, AI, Machine Learning",
    "DC.description": "Personal website of Gursimran Singh, Technical Program Manager at Google DeepMind in San Francisco.",
    "DC.publisher": "Gursimran Singh",
    "DC.contributor": "Gursimran Singh",
    "DC.date": "2026-03-02",
    "DC.type": "Text",
    "DC.format": "text/html",
    "DC.identifier": "https://gsym.me",
    "DC.language": "en",
    "DC.rights": "Copyright 2026 Gursimran Singh",
    "DC.coverage": "San Francisco, California, United States",
    "profile:first_name": "Gursimran",
    "profile:last_name": "Singh",
    "profile:username": "gsymmy",
    "article:author": "https://gsym.me",
    "rating": "General",
    "revisit-after": "7 days",
    "classification": "Personal Website, Portfolio, Technology",
    "category": "Personal Website",
    "coverage": "Worldwide",
    "distribution": "Global",
    "target": "all",
    "HandheldFriendly": "True",
    "MobileOptimized": "320",
    "thumbnail": "https://gsym.me/headshot.jpg",
    "twitter:image:alt": "Gursimran Singh — Technical Program Manager at Google DeepMind",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://gsym.me/#person",
    name: "Gursimran Singh",
    givenName: "Gursimran",
    familyName: "Singh",
    alternateName: ["gsymmy", "gsym", "Gursimran S.", "ping the singh"],
    description: "Technical Program Manager at Google DeepMind. Previously Product Manager at Microsoft Azure. Georgia Tech CS + Design graduate.",
    url: "https://gsym.me",
    image: {
      "@type": "ImageObject",
      "@id": "https://gsym.me/#headshot",
      url: "https://gsym.me/headshot.jpg",
      contentUrl: "https://gsym.me/headshot.jpg",
      caption: "Gursimran Singh",
      representativeOfPage: true,
    },
    jobTitle: "Technical Program Manager",
    worksFor: {
      "@type": "Organization",
      "@id": "https://deepmind.google/#organization",
      name: "Google DeepMind",
      url: "https://deepmind.google",
      parentOrganization: {
        "@type": "Organization",
        name: "Google",
        url: "https://google.com",
        sameAs: ["https://www.wikidata.org/wiki/Q95"],
      },
      sameAs: [
        "https://www.wikidata.org/wiki/Q22954461",
        "https://www.linkedin.com/company/googledeepmind/",
      ],
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        "@id": "https://www.gatech.edu/#organization",
        name: "Georgia Institute of Technology",
        alternateName: "Georgia Tech",
        url: "https://www.gatech.edu",
        sameAs: [
          "https://www.wikidata.org/wiki/Q193168",
          "https://www.linkedin.com/school/georgia-institute-of-technology/",
        ],
      },
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Technical Program Manager",
      occupationalCategory: "15-1299.09",
      description: "Leads technical programs at the intersection of AI research and product engineering.",
      occupationLocation: {
        "@type": "City",
        name: "San Francisco",
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "California",
          containedInPlace: {
            "@type": "Country",
            name: "United States",
            sameAs: "https://www.wikidata.org/wiki/Q30",
          },
        },
      },
      skills: [
        "Technical Program Management",
        "Product Management",
        "AI/ML Systems",
        "Computer Vision",
        "Cloud Computing",
        "Cross-functional Leadership",
      ],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US",
    },
    homeLocation: {
      "@type": "Place",
      name: "San Francisco, California",
      geo: {
        "@type": "GeoCoordinates",
        latitude: 37.7749,
        longitude: -122.4194,
      },
    },
    knowsAbout: [
      "Product Management",
      "Technical Program Management",
      "Computer Vision",
      "Artificial Intelligence",
      "Machine Learning",
      "Google DeepMind",
      "Microsoft Azure",
      "Cloud Computing",
      "Software Engineering",
      "UX Design",
      "AIOps",
      "Observability",
    ],
    knowsLanguage: [
      { "@type": "Language", name: "English" },
      { "@type": "Language", name: "Punjabi" },
      { "@type": "Language", name: "Hindi" },
    ],
    mainEntityOfPage: { "@id": "https://gsym.me/#profile" },
    sameAs: [
      "https://www.linkedin.com/in/gsymmy/",
      "https://github.com/gsymmy30",
      "https://x.com/gsymmy",
      "https://twitter.com/gsymmy",
      "https://gsym.me",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://gsym.me/#website",
    url: "https://gsym.me",
    name: "Gursimran Singh",
    description: "Personal website of Gursimran Singh, Technical Program Manager at Google DeepMind",
    inLanguage: "en-US",
    publisher: { "@id": "https://gsym.me/#person" },
    author: { "@id": "https://gsym.me/#person" },
    copyrightHolder: { "@id": "https://gsym.me/#person" },
    copyrightYear: 2026,
  };

  const imageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": "https://gsym.me/#headshot",
    url: "https://gsym.me/headshot.jpg",
    contentUrl: "https://gsym.me/headshot.jpg",
    name: "Gursimran Singh",
    description: "Professional photo of Gursimran Singh, Technical Program Manager at Google DeepMind in San Francisco.",
    caption: "Gursimran Singh — Technical Program Manager at Google DeepMind",
    encodingFormat: "image/jpeg",
    width: { "@type": "QuantitativeValue", value: 1563, unitCode: "E37" },
    height: { "@type": "QuantitativeValue", value: 1563, unitCode: "E37" },
    representativeOfPage: true,
    about: { "@id": "https://gsym.me/#person" },
    creator: { "@id": "https://gsym.me/#person" },
    copyrightHolder: { "@id": "https://gsym.me/#person" },
    copyrightYear: 2024,
    creditText: "Gursimran Singh",
    thumbnailUrl: "https://gsym.me/headshot.jpg",
    inLanguage: "en-US",
    isPartOf: { "@id": "https://gsym.me/#profile" },
  };

  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://gsym.me/#profile",
    url: "https://gsym.me",
    name: "Gursimran Singh",
    inLanguage: "en-US",
    datePublished: "2024-01-01",
    dateModified: "2026-03-15",
    mainEntity: { "@id": "https://gsym.me/#person" },
    isPartOf: { "@id": "https://gsym.me/#website" },
    author: { "@id": "https://gsym.me/#person" },
    primaryImageOfPage: { "@id": "https://gsym.me/#headshot" },
    image: { "@id": "https://gsym.me/#headshot" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Gursimran Singh",
          item: "https://gsym.me",
        },
      ],
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]"],
    },
  };

  return (
    <html lang="en" dir="ltr" className={parkinsans.variable}>
      <head>
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://x.com" />
        {/* Preload LCP image */}
        <link rel="preload" href="/gsymmy.webp" as="image" type="image/webp" fetchPriority="high" />
        {/* Primary representative image */}
        <link rel="image_src" href="https://gsym.me/headshot.jpg" />
        {/* OG profile fields */}
        <meta property="og:profile:first_name" content="Gursimran" />
        <meta property="og:profile:last_name" content="Singh" />
        <meta property="og:profile:username" content="gsymmy" />
        <meta property="og:profile:gender" content="male" />
        {/* Identity / rel-me */}
        <link rel="me" href="https://www.linkedin.com/in/gsymmy/" />
        <link rel="me" href="https://github.com/gsymmy30" />
        <link rel="me" href="https://x.com/gsymmy" />
        <link rel="me" href="mailto:gsymmy@gmail.com" />
        {/* Humans */}
        <link rel="author" href="/humans.txt" />
        {/* Canonical */}
        <link rel="canonical" href="https://gsym.me" />
        {/* Theme color */}
        <meta name="theme-color" content="#ebeaea" />
        {/* Format detection */}
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: "var(--font-parkinsans), 'Parkinsans', sans-serif",
          backgroundColor: "#000",
        }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
