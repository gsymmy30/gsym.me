import { Metadata } from "next";
import CornerBackLink from "@/components/CornerBackLink";

const pressDescription =
  "Press mentions for Gursimran Singh, including coverage from CNN, New York Post, Entrepreneur, YourStory, Fox 5 Atlanta, 11Alive, AJC, and NDTV.";

const items = [
  {
    outlet: "CNN",
    title: "Georgia Tech student lands internship with sticky note stunt",
    url: "https://www.cnn.com/2019/10/31/us/georgia-tech-student-sticky-note-trnd",
    datePublished: "2019-10-31",
  },
  {
    outlet: "New York Post",
    title: "College student lands Fortune 500 gig by writing 'Hire Me' with sticky notes",
    url: "https://nypost.com/2019/10/31/college-student-lands-fortune-500-gig-by-writing-hire-me-with-sticky-notes/",
    datePublished: "2019-10-31",
  },
  {
    outlet: "Entrepreneur",
    title: "How these teenagers are redefining innovation",
    url: "https://www.entrepreneur.com/en-in/entrepreneurs/how-these-teenagers-are-redefining-innovation/319045",
    datePublished: "2017-01-01",
  },
  {
    outlet: "YourStory",
    title: "Awarded by Michael Phelps for assistive hardware innovation",
    url: "https://yourstory.com/2017/06/gursimran-singh",
    datePublished: "2017-06-01",
  },
  {
    outlet: "Fox 5 Atlanta",
    title: "Georgia Tech student's low-tech way he got a high-tech internship",
    url: "https://www.fox5atlanta.com/news/georgia-tech-students-low-tech-way-he-got-a-high-tech-internship",
    datePublished: "2019-10-31",
  },
  {
    outlet: "11Alive",
    title: "Student's sticky note message lands him interview with Fortune 500 company",
    url: "https://www.11alive.com/article/news/local/georgia-tech-students-sticky-note-message-and-smiley-face-lands-him-interview-with-fortune-500-company/85-3ca5550b-6326-4c24-aa2f-48797b4169ad",
    datePublished: "2019-10-31",
  },
  {
    outlet: "Atlanta Journal-Constitution",
    title: "Georgia Tech student lands internship using sticky notes",
    url: "https://www.ajc.com/lifestyles/hire-tech-student-lands-fortune-500-internship-using-sticky-notes/vxJFwBTPpQiRpMhmDAgY8I/",
    datePublished: "2019-10-31",
  },
  {
    outlet: "NDTV",
    title: "Meet the innovators working towards creating a Behtar India",
    url: "https://swachhindia.ndtv.com/video-details-page/meet-the-innovators-who-are-working-towards-creating-a-behtar-india-464562/",
    datePublished: "2017-06-01",
  },
  {
    outlet: "Financial Express",
    title: "India's top student volunteers felicitated at Pramerica Spirit of Community Awards",
    url: "https://www.financialexpress.com/money/indias-top-student-volunteers-felicitated-in-the-7th-annual-pramerica-spirit-of-community-awards-by-dhfl-pramerica-life-insurance-613081/",
    datePublished: "2017-01-01",
  },
  {
    outlet: "Asian Age",
    title: "Visionary talent spotlight",
    url: "https://www.asianage.com/life/more-features/270417/visionary-talent.html",
    datePublished: "2017-04-27",
  },
];

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export const metadata: Metadata = {
  title: "Press",
  description: pressDescription,
  alternates: {
    canonical: "https://gsym.me/press",
  },
  openGraph: {
    title: "Press | Gursimran Singh",
    description: pressDescription,
    url: "https://gsym.me/press",
    siteName: "Gursimran Singh",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Press mentions featuring Gursimran Singh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Press | Gursimran Singh",
    description: pressDescription,
    images: ["/twitter-image"],
    creator: "@gsymmy",
  },
};

export default function PressPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Gursimran Singh", item: "https://gsym.me" },
      { "@type": "ListItem", position: 2, name: "Press", item: "https://gsym.me/press" },
    ],
  };

  const pressJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://gsym.me/press#webpage",
    url: "https://gsym.me/press",
    name: "Press | Gursimran Singh",
    inLanguage: "en-US",
    description: pressDescription,
    about: { "@id": "https://gsym.me/#person" },
    author: { "@id": "https://gsym.me/#person" },
    publisher: { "@id": "https://gsym.me/#person" },
    isPartOf: { "@id": "https://gsym.me/#website" },
    dateModified: "2026-05-07",
    mainEntity: {
      "@type": "ItemList",
      name: "Press Mentions — Gursimran Singh",
      description: "Media coverage and press mentions of Gursimran Singh.",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: item.url,
        name: `${item.outlet}: ${item.title}`,
        item: {
          "@type": "NewsArticle",
          headline: item.title,
          url: item.url,
          datePublished: item.datePublished,
          publisher: {
            "@type": "Organization",
            name: item.outlet,
          },
          about: { "@id": "https://gsym.me/#person" },
          mentions: { "@id": "https://gsym.me/#person" },
          mainEntityOfPage: item.url,
        },
      })),
    },
  };

  const personMentionJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://gsym.me/#person",
    name: "Gursimran Singh",
    url: "https://gsym.me",
    sameAs: [
      "https://www.linkedin.com/in/gsymmy/",
      "https://github.com/gsymmy30",
      "https://x.com/gsymmy",
    ],
  };

  return (
    <main className="min-h-screen px-6 sm:px-8 pt-20 pb-20 md:pt-24 md:pb-24">
      <CornerBackLink />
      <div className="mx-auto max-w-[580px] content-area">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pressJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personMentionJsonLd) }}
        />

        <h1
          className="mt-10 leading-none"
          style={{
            fontFamily: "'Parkinsans', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(32px, 6vw, 48px)",
            letterSpacing: "-0.02em",
            color: "#111",
          }}
        >
          Press
        </h1>

        <p className="mt-4 mb-10 text-[15px] leading-7 text-forest">
          A source list of interviews and media coverage about Gursimran Singh, including
          the Georgia Tech sticky note campaign, student innovation work, and public
          recognition from technology and entrepreneurship outlets.
        </p>

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
                <time
                  className="block text-[13px] leading-6 text-forest/75"
                  dateTime={item.datePublished}
                >
                  {dateFormatter.format(new Date(item.datePublished))}
                </time>
              </a>
            </li>
          ))}
        </ul>

      </div>
    </main>
  );
}
