import Image from "next/image";

const pressLinks = [
  {
    href: "https://nypost.com/2019/10/31/college-student-lands-fortune-500-gig-by-writing-hire-me-with-sticky-notes/",
    label: "ny post"
  },
  {
    href: "https://yourstory.com/2017/06/gursimran-singh",
    label: "yourstory"
  },
  {
    href: "https://youtu.be/2wObNkYiBfM?si=-Uza5-bbeiVAJWwq",
    label: "youtube"
  }
];

const socialLinks = [
  { href: "https://www.linkedin.com/in/gsymmy/", label: "linkedin" },
  { href: "https://github.com/gsymmy30", label: "github" },
  { href: "https://x.com/gsymmy", label: "twitter" },
  { href: "mailto:gsymmy@gmail.com", label: "email" }
];

function InlineIcon({
  src,
  alt,
  className = ""
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny brand marks should render from the real source asset, not Next optimization.
    <img
      src={src}
      alt={alt}
      width={18}
      height={18}
      className={`mx-0.5 inline-block size-[18px] align-[-3px] ${className}`}
    />
  );
}

export default function Home() {
  return (
    <main
      className="flex min-h-screen items-center justify-center px-6 py-12"
      itemScope
      itemType="https://schema.org/ProfilePage"
    >
      <section
        className="grid w-full items-start justify-center gap-8 md:w-[720px] md:grid-cols-[168px_520px] md:gap-8"
        aria-label="Gursimran Singh profile"
        itemProp="mainEntity"
        itemScope
        itemType="https://schema.org/Person"
      >
        <Image
          src="/headshot.png"
          alt="Portrait of Gursimran Singh"
          width={4884}
          height={4884}
          priority
          className="mx-auto -mt-2 h-auto w-full max-w-40 md:max-w-48"
          itemProp="image"
        />

        <div className="mx-auto flex max-w-xl flex-col gap-4 text-[15px] leading-7 text-forest md:mx-0">
          <h1
            className="mb-2 font-[var(--font-space-grotesk)] text-xl font-semibold leading-none text-[#273024]"
            itemProp="name"
          >
            gursimran singh
          </h1>

          <p itemProp="description">
            i&apos;m a tpm at{" "}
            <a href="https://deepmind.google/" target="_blank" rel="noopener noreferrer">
              <InlineIcon src="/icons/google-color.svg" alt="Google" />
              <InlineIcon src="/icons/deepmind-color.svg" alt="DeepMind" />
              google deepmind
            </a>
            , managing{" "}
            <InlineIcon src="/icons/gemini.svg" alt="Gemini" />
            gemini releases. before that i was a pm at{" "}
            <InlineIcon src="/icons/microsoft-color.svg" alt="Microsoft" className="mr-1" />
            microsoft, working on{" "}
            <a
              href="https://azure.microsoft.com/en-us/products/monitor/"
              target="_blank"
              rel="noopener noreferrer"
            >
              azure observability
            </a>{" "}
            and diagnostic tooling: the whole “why did this break at 3am” problem space.
          </p>

          <p>
            cs at{" "}
            <a
              href="https://www.gatech.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="mr-1 inline-block h-[18px] w-[32px] overflow-hidden align-[-3px]">
                <Image
                  src="/gt-logo.png"
                  alt=""
                  width={348}
                  height={60}
                  className="h-[18px] w-auto max-w-none"
                />
              </span>
              georgia tech
            </a>
            , class of &apos;23. computer vision is where my brain goes when i get to pick. in
            college i built{" "}
            <a href="https://youtube.com/watch?v=0-CumFHE8eo" target="_blank" rel="noopener noreferrer">
              curbside
            </a>
            , a startup working on rider safety for electric scooters. none of it would have
            happened without my parents buying me a raspberry pi when i was 14. that thing genuinely
            changed what i thought i was allowed to build.
          </p>

          <p>
            outside work: i lift, i hike, i kayak when i get the chance. standup comedy and spy
            fiction on rotation when i&apos;m not doing any of that. concerts are my thing, and{" "}
            <a
              href="https://www.youtube.com/shorts/v-mQWT4ANfc"
              target="_blank"
              rel="noopener noreferrer"
            >
              the good ones
            </a>{" "}
            stay with me for years.
          </p>

          <p>
            some more fun links —{" "}
            {pressLinks.map((link, index) => (
              <span key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
                {index < pressLinks.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>

          <p>
            {socialLinks.map((link, index) => (
              <span key={link.href}>
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? "me" : "me noopener noreferrer"}
                >
                  {link.label}
                </a>
                {index < socialLinks.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
      </section>
    </main>
  );
}
