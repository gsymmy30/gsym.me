"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Martian_Mono } from "next/font/google";

// Martian Mono just for headings / hero lines
const martianMono = Martian_Mono({
  subsets: ["latin"],
  weight: ["400", "700", "800"], // 800 gives you a strong, bold hero
  variable: "--font-martian",
});

export default function Page() {
  // Easter egg: type "gdawg" to show the banner briefly
  useEffect(() => {
    const target = "gdawg";
    let buffer = "";
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      if (!/^[a-z0-9]$/.test(k)) return;
      buffer = (buffer + k).slice(-target.length);
      if (buffer === target) {
        const banner = document.getElementById("team-banner");
        if (banner) {
          banner.classList.remove("opacity-0", "translate-y-2", "pointer-events-none");
          banner.classList.add("opacity-100", "translate-y-0");
          setTimeout(() => {
            banner.classList.remove("opacity-100", "translate-y-0");
            banner.classList.add("opacity-0", "translate-y-2", "pointer-events-none");
          }, 1800);
        }
        buffer = "";
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      

      <div className="mx-auto max-w-[780px] px-6 py-20 md:py-28">
        {/* HERO */}
        <header className="grid items-center gap-8 md:gap-12 md:grid-cols-[1.25fr_1fr]">
          <div>
            <h1
              className={`${martianMono.className} text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]`}
            >
              Gursimran Singh
            </h1>

            <p
              className={`${martianMono.className} mt-4 text-[1.05rem] text-neutral-300/95 max-w-[52ch] leading-relaxed`}
            >
              TPM @{" "}
              <a
                href="https://deepmind.google/"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 decoration-neutral-500/40 transition-colors hover:text-white hover:decoration-neutral-200"
              >
                Google DeepMind
              </a>
            </p>
            <p
              className={`${martianMono.className} mt-2 text-neutral-400`}
            >
              San Francisco, CA
            </p>
          </div>

          <div className="justify-self-start md:justify-self-end">
            <Image
              src="/simmy.jpg"
              alt="Gursimran Singh outdoors at an alpine lake"
              width={280}
              height={280}
              priority
              className="aspect-square rounded-2xl object-cover ring-1 ring-neutral-800/60 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
        </header>

        {/* ABOUT */}
        <section className="mt-20 md:mt-24" id="about">
          <div className="flex items-center gap-4 mb-6">
            <h2
              className={`${martianMono.className} text-[10.5px] uppercase tracking-[0.22em] text-neutral-500`}
            >
              About
            </h2>
            <div className="flex-1 h-px bg-neutral-800/50" />
          </div>
          <div className="space-y-4 text-[1.0625rem] leading-[1.7] text-neutral-100 max-w-[56ch]">
            <p>Technical Program Manager @ Google DeepMind.</p>
            <p>Previously — Product @ Microsoft Azure, working on Azure Observability and AIOps.</p>
            <p>
              CS + Design @ Georgia Tech, focused on computer vision, founded a{" "}
              <a
                href="https://www.youtube.com/watch?v=0-CumFHE8eo"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 decoration-neutral-500 transition-colors hover:text-white hover:decoration-neutral-300"
              >
                scooter-safety startup
              </a>
              , and built a lot at{" "}
              <a
                href="https://devpost.com/gursimransingh"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 decoration-neutral-500 transition-colors hover:text-white hover:decoration-neutral-300"
              >
                HackGT
              </a>
              .
            </p>
            <p>Raised in Delhi, grew up on science fairs &amp; competitive quizzing.</p>
          </div>
        </section>

        {/* PERSONAL */}
        <section className="mt-16 md:mt-20" id="personal">
          <div className="flex items-center gap-4 mb-6">
            <h2
              className={`${martianMono.className} text-[10.5px] uppercase tracking-[0.22em] text-neutral-500`}
            >
              Personal
            </h2>
            <div className="flex-1 h-px bg-neutral-800/50" />
          </div>
          <div className="space-y-5 text-[1.0625rem] leading-[1.7] text-neutral-100 max-w-[56ch]">
            <p>
              In college I pulled off a fun stunt to land an internship — spelling out "Hire Me" with sticky
              notes on my dorm window. It went viral and got covered in{" "}
              <a
                href="https://nypost.com/2019/10/31/college-student-lands-fortune-500-gig-by-writing-hire-me-with-sticky-notes/"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 decoration-neutral-500 transition-colors hover:text-white hover:decoration-neutral-300"
              >
                the New York Post
              </a>
              .
            </p>
            <p>
              I've always loved hardware. My parents bought me my first Raspberry Pi when I was 14 and I built
              wearable glasses to aid the visually impaired. The project earned me an{" "}
              <a
                href="https://yourstory.com/2017/06/gursimran-singh"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 decoration-neutral-500 transition-colors hover:text-white hover:decoration-neutral-300"
              >
                award from Michael Phelps
              </a>
              .
            </p>
            <p>
              Fitness is a huge part of my life. Over the past few years I've lost lbs, built muscle, and
              tracked progress obsessively on Strava and Hevy. I've trained in boxing and CrossFit, and spend a
              lot of time kayaking or on the rowing erg.
            </p>
            <p>
              I'm a big sports fan and love watching live games. My favorite teams are the LA Clippers and the
              Philadelphia Eagles. By pure luck, I've been interviewed a few times on ESPN and TNT during games.
            </p>
          </div>
        </section>

        {/* LINKS */}
        <section className="mt-16 md:mt-20" id="links">
          <div className="flex items-center gap-4 mb-6">
            <h2
              className={`${martianMono.className} text-[10.5px] uppercase tracking-[0.22em] text-neutral-500`}
            >
              Links
            </h2>
            <div className="flex-1 h-px bg-neutral-800/50" />
          </div>
          <nav className="flex flex-wrap gap-3">
            <a
              className="rounded-full border border-neutral-700 bg-neutral-800/50 px-4 py-2 text-sm text-neutral-100 transition-all duration-200 hover:border-neutral-500 hover:bg-neutral-700/60"
              href="https://www.linkedin.com/in/pingthesingh/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="rounded-full border border-neutral-700 bg-neutral-800/50 px-4 py-2 text-sm text-neutral-100 transition-all duration-200 hover:border-neutral-500 hover:bg-neutral-700/60"
              href="https://github.com/gsymmy30"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="rounded-full border border-neutral-700 bg-neutral-800/50 px-4 py-2 text-sm text-neutral-100 transition-all duration-200 hover:border-neutral-500 hover:bg-neutral-700/60"
              href="https://x.com/gsymmy"
              target="_blank"
              rel="noreferrer"
            >
              X
            </a>
            <a
              className="rounded-full border border-neutral-700 bg-neutral-800/50 px-4 py-2 text-sm text-neutral-100 transition-all duration-200 hover:border-neutral-500 hover:bg-neutral-700/60"
              href="mailto:gsymmy@gmail.com"
            >
              Email
            </a>
          </nav>
        </section>

        <footer className="mt-20 md:mt-24 pt-8 border-t border-neutral-800/40 text-sm text-neutral-500">
          © {new Date().getFullYear()} gsym.me
        </footer>
      </div>

      {/* Easter egg banner */}
      <div
        id="team-banner"
        className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full border border-neutral-800 bg-neutral-900/90 px-4 py-2 text-sm text-neutral-200 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.7)] backdrop-blur transition
                   opacity-0 translate-y-2 pointer-events-none"
      >
        Instagram – @gsymmy
      </div>
    </main>
  );
}
