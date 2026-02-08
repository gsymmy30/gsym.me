import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Press",
  description:
    "Press mentions featuring Gursimran Singh, including CNN, New York Post, Entrepreneur, YourStory, and more.",
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

  return (
    <main className="min-h-screen px-8 py-20 md:py-32">
      <div className="mx-auto max-w-[540px]">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[#525252] hover:text-white transition-colors"
        >
          <span>←</span> Back
        </Link>

        <h1 className="mt-8 text-4xl md:text-5xl font-bold tracking-[-0.04em] bg-gradient-to-r from-white to-[#a3a3a3] bg-clip-text text-transparent">Press</h1>

        <ul className="mt-10 space-y-4 text-[15px]">
          {items.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group block p-3 -mx-3 rounded-lg transition-colors hover:bg-[#171717]"
              >
                <span className="text-[#525252] text-sm">{item.outlet}</span>
                <span className="block mt-0.5 text-[#a3a3a3] group-hover:text-white">
                  {item.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
