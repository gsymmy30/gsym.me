import type { Metadata, Viewport } from "next";
import { Habibi, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const habibi = Habibi({
  variable: "--font-habibi",
  subsets: ["latin"],
  weight: "400",
  display: "swap"
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: "variable",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gsym.me"),
  applicationName: "Gursimran Singh",
  title: {
    default: "Gursimran Singh",
    template: "%s - Gursimran Singh"
  },
  description:
    "Gursimran Singh is a Technical Program Manager at Google DeepMind working on Gemini releases, with prior product experience at Microsoft Azure.",
  keywords: [
    "Gursimran Singh",
    "gsym",
    "gsymmy",
    "gsym.me",
    "Technical Program Manager",
    "Google DeepMind",
    "Gemini",
    "Microsoft Azure",
    "Georgia Tech",
    "San Francisco",
    "AI Technical Program Manager",
    "Product Management",
    "Computer Vision",
    "Georgia Tech Computer Science"
  ],
  authors: [{ name: "Gursimran Singh", url: "https://gsym.me" }],
  creator: "Gursimran Singh",
  publisher: "Gursimran Singh",
  category: "Personal Website",
  alternates: {
    canonical: "https://gsym.me",
    languages: { "en-US": "https://gsym.me" }
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  openGraph: {
    title: "Gursimran Singh",
    description:
      "Technical Program Manager at Google DeepMind working on Gemini releases, with prior product experience at Microsoft Azure.",
    url: "https://gsym.me",
    siteName: "Gursimran Singh",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Gursimran Singh - Technical Program Manager at Google DeepMind",
        type: "image/png"
      }
    ],
    locale: "en_US",
    type: "profile"
  },
  twitter: {
    card: "summary_large_image",
    title: "Gursimran Singh",
    description:
      "Technical Program Manager at Google DeepMind working on Gemini releases, with prior product experience at Microsoft Azure.",
    images: ["/twitter-image"],
    creator: "@gsymmy",
    site: "@gsymmy"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  other: {
    "geo.region": "US-CA",
    "geo.placename": "San Francisco, California",
    "geo.position": "37.7749;-122.4194",
    ICBM: "37.7749, -122.4194",
    "DC.title": "Gursimran Singh",
    "DC.creator": "Gursimran Singh",
    "DC.subject": "Technical Program Manager, Google DeepMind, Gemini, San Francisco, AI",
    "DC.description": "Personal website of Gursimran Singh, Technical Program Manager at Google DeepMind.",
    "DC.publisher": "Gursimran Singh",
    "DC.contributor": "Gursimran Singh",
    "DC.date": "2026-05-07",
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
    rating: "General",
    "revisit-after": "7 days",
    classification: "Personal Website, Portfolio, Technology",
    coverage: "Worldwide",
    distribution: "Global",
    target: "all",
    HandheldFriendly: "True",
    MobileOptimized: "320",
    thumbnail: "https://gsym.me/headshot.jpg",
    "llms.txt": "https://gsym.me/llms.txt",
    "twitter:image:alt": "Gursimran Singh - Technical Program Manager at Google DeepMind"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#bac8b1"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://gsym.me/#person",
    name: "Gursimran Singh",
    headline: "Technical Program Manager at Google DeepMind",
    givenName: "Gursimran",
    familyName: "Singh",
    alternateName: ["gsymmy", "gsym", "Gursimran S.", "ping the singh"],
    description:
      "Gursimran Singh is a Technical Program Manager at Google DeepMind working on Gemini releases, with prior product experience at Microsoft Azure.",
    url: "https://gsym.me",
    image: {
      "@type": "ImageObject",
      "@id": "https://gsym.me/#headshot",
      url: "https://gsym.me/headshot.jpg",
      contentUrl: "https://gsym.me/headshot.jpg",
      caption: "Gursimran Singh",
      representativeOfPage: true
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
        sameAs: ["https://www.wikidata.org/wiki/Q95"]
      },
      sameAs: [
        "https://www.wikidata.org/wiki/Q22954461",
        "https://www.linkedin.com/company/googledeepmind/"
      ]
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
          "https://www.linkedin.com/school/georgia-institute-of-technology/"
        ]
      }
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Technical Program Manager",
      description:
        "Leads technical programs at the intersection of AI research and product engineering.",
      occupationLocation: {
        "@type": "City",
        name: "San Francisco",
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "California",
          containedInPlace: {
            "@type": "Country",
            name: "United States",
            sameAs: "https://www.wikidata.org/wiki/Q30"
          }
        }
      },
      skills: [
        "Technical Program Management",
        "Product Management",
        "AI/ML Systems",
        "Computer Vision",
        "Cloud Computing",
        "Cross-functional Leadership"
      ]
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US"
    },
    knowsAbout: [
      "Product Management",
      "Technical Program Management",
      "Computer Vision",
      "Artificial Intelligence",
      "Machine Learning",
      "Google DeepMind",
      "Gemini",
      "Microsoft Azure",
      "Cloud Computing",
      "AIOps",
      "Observability"
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "B.S. Computer Science",
        recognizedBy: {
          "@type": "CollegeOrUniversity",
          name: "Georgia Institute of Technology",
          alternateName: "Georgia Tech",
          url: "https://www.gatech.edu"
        }
      }
    ],
    knowsLanguage: [
      { "@type": "Language", name: "English" },
      { "@type": "Language", name: "Punjabi" },
      { "@type": "Language", name: "Hindi" }
    ],
    mainEntityOfPage: { "@id": "https://gsym.me/#profile" },
    sameAs: [
      "https://www.linkedin.com/in/gsymmy/",
      "https://github.com/gsymmy30",
      "https://x.com/gsymmy",
      "https://twitter.com/gsymmy",
      "https://gsym.me"
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://gsym.me/#website",
    url: "https://gsym.me",
    name: "Gursimran Singh",
    description:
      "Canonical personal website and profile for Gursimran Singh, Technical Program Manager at Google DeepMind.",
    inLanguage: "en-US",
    publisher: { "@id": "https://gsym.me/#person" },
    author: { "@id": "https://gsym.me/#person" },
    copyrightHolder: { "@id": "https://gsym.me/#person" },
    copyrightYear: 2026
  };

  const imageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": "https://gsym.me/#headshot",
    url: "https://gsym.me/headshot.jpg",
    contentUrl: "https://gsym.me/headshot.jpg",
    name: "Gursimran Singh",
    description:
      "Photo of Gursimran Singh, Technical Program Manager at Google DeepMind.",
    caption: "Gursimran Singh - Technical Program Manager at Google DeepMind",
    encodingFormat: "image/jpeg",
    width: { "@type": "QuantitativeValue", value: 636, unitCode: "E37" },
    height: { "@type": "QuantitativeValue", value: 636, unitCode: "E37" },
    representativeOfPage: true,
    about: { "@id": "https://gsym.me/#person" },
    creator: { "@id": "https://gsym.me/#person" },
    copyrightHolder: { "@id": "https://gsym.me/#person" },
    copyrightYear: 2026,
    creditText: "Gursimran Singh",
    thumbnailUrl: "https://gsym.me/headshot.jpg",
    inLanguage: "en-US",
    isPartOf: { "@id": "https://gsym.me/#profile" }
  };

  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://gsym.me/#profile",
    url: "https://gsym.me",
    name: "Gursimran Singh",
    headline: "Gursimran Singh | Google DeepMind Technical Program Manager",
    description:
      "Canonical profile for Gursimran Singh: Technical Program Manager at Google DeepMind, former Product Manager at Microsoft Azure, and Georgia Tech Computer Science graduate.",
    inLanguage: "en-US",
    datePublished: "2024-01-01",
    dateModified: "2026-05-07",
    mainEntity: { "@id": "https://gsym.me/#person" },
    isPartOf: { "@id": "https://gsym.me/#website" },
    author: { "@id": "https://gsym.me/#person" },
    primaryImageOfPage: { "@id": "https://gsym.me/#headshot" },
    image: { "@id": "https://gsym.me/#headshot" },
    significantLink: [
      "https://gsym.me/press",
      "https://www.linkedin.com/in/gsymmy/",
      "https://github.com/gsymmy30",
      "https://x.com/gsymmy"
    ],
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Gursimran Singh",
          item: "https://gsym.me"
        }
      ]
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1"]
    }
  };

  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://x.com" />
        <link rel="image_src" href="https://gsym.me/headshot.jpg" />
        <meta property="og:profile:first_name" content="Gursimran" />
        <meta property="og:profile:last_name" content="Singh" />
        <meta property="og:profile:username" content="gsymmy" />
        <meta property="og:profile:gender" content="male" />
        <link rel="me" href="https://www.linkedin.com/in/gsymmy/" />
        <link rel="me" href="https://github.com/gsymmy30" />
        <link rel="me" href="https://x.com/gsymmy" />
        <link rel="me" href="mailto:gsymmy@gmail.com" />
        <link rel="author" href="/humans.txt" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${habibi.variable} ${inter.variable} ${spaceGrotesk.variable}`}
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
