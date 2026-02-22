import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Press",
  description:
    "Press mentions featuring Gursimran Singh, including CNN, New York Post, Entrepreneur, YourStory, and more.",
  alternates: {
    canonical: "https://gsym.me/press",
  },
  openGraph: {
    title: "Press | Gursimran Singh",
    description:
      "Press mentions featuring Gursimran Singh, including CNN, New York Post, Entrepreneur, YourStory, and more.",
    url: "https://gsym.me/press",
    siteName: "Gursimran Singh",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Press mentions featuring Gursimran Singh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Press | Gursimran Singh",
    description:
      "Press mentions featuring Gursimran Singh, including CNN, New York Post, Entrepreneur, YourStory, and more.",
    images: ["/og.png"],
    creator: "@gsymmy",
  },
};

export default function PressPage() {
  const items = [
    {
      outlet: "CNN",
      title: "Georgia Tech student lands internship with sticky note stunt",
      url: "https://www.cnn.com/2019/10/31/us/georgia-tech-student-sticky-note-trnd",
    },
    {
      outlet: "New York Post",
      title: "College student lands Fortune 500 gig by writing 'Hire Me' with sticky notes",
      url: "https://nypost.com/2019/10/31/college-student-lands-fortune-500-gig-by-writing-hire-me-with-sticky-notes/",
    },
    {
      outlet: "Entrepreneur",
      title: "How these teenagers are redefining innovation",
      url: "https://www.entrepreneur.com/en-in/entrepreneurs/how-these-teenagers-are-redefining-innovation/319045",
    },
    {
      outlet: "YourStory",
      title: "Awarded by Michael Phelps for assistive hardware innovation",
      url: "https://yourstory.com/2017/06/gursimran-singh",
    },
    {
      outlet: "Fox 5 Atlanta",
      title: "Georgia Tech student's low-tech way he got a high-tech internship",
      url: "https://www.fox5atlanta.com/news/georgia-tech-students-low-tech-way-he-got-a-high-tech-internship",
    },
    {
      outlet: "11Alive",
      title: "Student's sticky note message lands him interview with Fortune 500 company",
      url: "https://www.11alive.com/article/news/local/georgia-tech-students-sticky-note-message-and-smiley-face-lands-him-interview-with-fortune-500-company/85-3ca5550b-6326-4c24-aa2f-48797b4169ad",
    },
    {
      outlet: "Atlanta Journal-Constitution",
      title: "Georgia Tech student lands internship using sticky notes",
      url: "https://www.ajc.com/lifestyles/hire-tech-student-lands-fortune-500-internship-using-sticky-notes/vxJFwBTPpQiRpMhmDAgY8I/",
    },
    {
      outlet: "NDTV",
      title: "Meet the innovators working towards creating a Behtar India",
      url: "https://swachhindia.ndtv.com/video-details-page/meet-the-innovators-who-are-working-towards-creating-a-behtar-india-464562/",
    },
    {
      outlet: "Financial Express",
      title: "India's top student volunteers felicitated at Pramerica Spirit of Community Awards",
      url: "https://www.financialexpress.com/money/indias-top-student-volunteers-felicitated-in-the-7th-annual-pramerica-spirit-of-community-awards-by-dhfl-pramerica-life-insurance-613081/",
    },
    {
      outlet: "Asian Age",
      title: "Visionary talent spotlight",
      url: "https://www.asianage.com/life/more-features/270417/visionary-talent.html",
    },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://gsym.me" },
      { "@type": "ListItem", position: 2, name: "Press", item: "https://gsym.me/press" },
    ],
  };

  const pressJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://gsym.me/press#webpage",
    url: "https://gsym.me/press",
    name: "Press | Gursimran Singh",
    description:
      "Press mentions featuring Gursimran Singh, including CNN, New York Post, Entrepreneur, YourStory, and more.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: item.url,
        name: `${item.outlet}: ${item.title}`,
      })),
    },
  };

  return (
    <main className="min-h-screen px-6 sm:px-8 pt-20 pb-20 md:pt-24 md:pb-24">
      <div className="mx-auto max-w-[580px] content-area">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pressJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 transition-colors duration-200"
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: "10px",
            letterSpacing: "0.16em",
            color: "#484642",
          }}
        >
          <span style={{ color: "#6BABA0" }}>←</span>
          <span className="hover:text-[#6BABA0] transition-colors duration-200">INDEX</span>
        </Link>

        {/* Heading */}
        <h1
          className="mt-10 leading-none text-[#E4E0D8]"
          style={{
            fontFamily: "var(--font-display, 'Cormorant Garamond', Georgia, serif)",
            fontWeight: 300,
            fontSize: "clamp(52px, 8vw, 76px)",
            letterSpacing: "-0.01em",
          }}
        >
          Press
        </h1>

        {/* Section label */}
        <div className="mt-2 mb-10 flex items-center gap-3">
          <span
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: "7.5px",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "#484642",
            }}
          >
            {items.length} mentions
          </span>
          <span
            style={{
              display: "block",
              width: "36px",
              height: "1px",
              background: "linear-gradient(90deg, rgba(107,171,160,0.35), transparent)",
            }}
          />
        </div>

        {/* Press list */}
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="press-item"
              >
                <span className="press-outlet">{item.outlet}</span>
                <span className="press-title block">{item.title}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-14 pt-8 border-t border-[#1C1D22]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 transition-colors duration-200"
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: "10px",
              letterSpacing: "0.16em",
              color: "#484642",
            }}
          >
            <span style={{ color: "#6BABA0" }}>←</span>
            <span className="hover:text-[#6BABA0] transition-colors duration-200">Back to index</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
