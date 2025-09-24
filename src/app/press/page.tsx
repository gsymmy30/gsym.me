// src/app/press/page.tsx
import { Metadata } from "next";
import { Martian_Mono } from "next/font/google";

const martianMono = Martian_Mono({
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "Press – Gursimran Singh",
  description:
    "Press mentions and publications featuring Gursimran Singh, including CNN, New York Post, Entrepreneur, YourStory, and more.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PressPage() {
  const items = [
    {
      title:
        "CNN – Georgia Tech student lands internship with sticky note stunt",
      url: "https://www.cnn.com/2019/10/31/us/georgia-tech-student-sticky-note-trnd",
    },
    {
      title:
        "New York Post – College student lands Fortune 500 gig by writing 'Hire Me' with sticky notes",
      url: "https://nypost.com/2019/10/31/college-student-lands-fortune-500-gig-by-writing-hire-me-with-sticky-notes/",
    },
    {
      title:
        "Atlanta Journal-Constitution – Georgia Tech student lands internship using sticky notes",
      url: "https://www.ajc.com/lifestyles/hire-tech-student-lands-fortune-500-internship-using-sticky-notes/vxJFwBTPpQiRpMhmDAgY8I/",
    },
    {
      title:
        "Fox 5 Atlanta – Georgia Tech student’s low-tech way he got a high-tech internship",
      url: "https://www.fox5atlanta.com/news/georgia-tech-students-low-tech-way-he-got-a-high-tech-internship",
    },
    {
      title:
        "11Alive – Georgia Tech student’s sticky note message and smiley face lands him interview",
      url: "https://www.11alive.com/article/news/local/georgia-tech-students-sticky-note-message-and-smiley-face-lands-him-interview-with-fortune-500-company/85-3ca5550b-6326-4c24-aa2f-48797b4169ad",
    },
    {
      title:
        "YourStory – Awarded by Michael Phelps for assistive hardware innovation",
      url: "https://yourstory.com/2017/06/gursimran-singh",
    },
    {
      title: "Asian Age – Visionary talent spotlight",
      url: "https://www.asianage.com/life/more-features/270417/visionary-talent.html",
    },
    {
      title:
        "Financial Express – India’s top student volunteers felicitated at Pramerica Spirit of Community Awards",
      url: "https://www.financialexpress.com/money/indias-top-student-volunteers-felicitated-in-the-7th-annual-pramerica-spirit-of-community-awards-by-dhfl-pramerica-life-insurance-613081/",
    },
    {
      title:
        "Pramerica Life – India’s top student volunteers felicitated at the 7th Annual Pramerica Spirit of Community Awards",
      url: "https://pramericalife.in/media-center/indias-top-student-volunteers-felicitated-in-the-7th-annual-pramerica-spirit-of-community-awards",
    },
    {
      title:
        "Entrepreneur – How these teenagers are redefining innovation",
      url: "https://www.entrepreneur.com/en-in/entrepreneurs/how-these-teenagers-are-redefining-innovation/319045",
    },
    {
      title:
        "NDTV Swachh India – Meet the innovators working towards creating a Behtar India",
      url: "https://swachhindia.ndtv.com/video-details-page/meet-the-innovators-who-are-working-towards-creating-a-behtar-india-464562/",
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-[760px]">
        <h1
          className={`${martianMono.className} text-3xl font-bold tracking-tight mb-8`}
        >
          Press Mentions
        </h1>
        <ul className="space-y-5 leading-relaxed text-neutral-200">
          {items.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 decoration-neutral-500/40 hover:text-white hover:decoration-neutral-200"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
