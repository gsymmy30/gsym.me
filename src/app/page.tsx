"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Page() {
  // Konami: ↑ ↑ ↓ ↓ ← → ← → b a -> show banner briefly
// Konami: ↑ ↑ ↓ ↓ ← → ← → b a
useEffect(() => {
  const seq = [
    "g","d","a","w","g"
  ];
  let i = 0;

  const onKey = (e: KeyboardEvent) => {
    // normalize to lowercase so 'B' or 'b' both work
    const key = e.key.toLowerCase();

    // ignore modifier keys so they don't reset progress
    const ignore = ["shift","meta","control","alt","capslock","tab","escape"];
    if (ignore.includes(key)) return;

    if (key === seq[i]) {
      i += 1;
      if (i === seq.length) {
        const el = document.getElementById("team-banner");
        if (el) {
          el.classList.remove("opacity-0","translate-y-2","pointer-events-none");
          el.classList.add("opacity-100","translate-y-0");
          setTimeout(() => {
            el.classList.remove("opacity-100","translate-y-0");
            el.classList.add("opacity-0","translate-y-2","pointer-events-none");
          }, 1800);
        }
        i = 0; // reset for next time
      }
    } else {
      // if current key happens to be the first in the sequence, start over at 1
      i = key === seq[0] ? 1 : 0;
    }
  };

  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, []);


  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-[760px] px-6 py-16 md:py-24">
        {/* HERO */}
        <header className="grid items-center gap-10 md:grid-cols-[1.25fr_1fr]">
          <div>
            <h1 className="text-5xl md:text-5xl font-semibold tracking-tight leading-tight">
              Gursimran Singh
            </h1>
            <p className="mt-3 text-lg text-neutral-300 max-w-[52ch]">
              Product Manager @ Microsoft Azure
            </p>
            <p className="mt-4 text-neutral-300/90 leading-relaxed max-w-[60ch]">
              Seattle, WA
            </p>
          </div>

          <div className="justify-self-start md:justify-self-end">
            <Image
              src="/simmy.jpg"
              alt="Gursimran Singh"
              width={280}
              height={280}
              priority
              className="rounded-2xl ring-1 ring-neutral-800 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)] object-cover aspect-square transition-transform duration-300 hover:scale-105"
            />
          </div>
        </header>

        {/* ABOUT */}
        <section className="mt-12">
          <h2 className="text-[11px] font-medium uppercase tracking-[0.20em] text-neutral-400">
            About
          </h2>
          <ul className="mt-4 list-disc pl-5 space-y-2 leading-relaxed text-neutral-200 marker:text-neutral-500">
            <li>
              Product @ Microsoft Azure, building developer tools in AIOps/Observability.
            </li>
            <li>
              CS + Design @ Georgia Tech, focused on computer vision, founded a{" "}
              <a
                href="https://www.youtube.com/watch?v=0-CumFHE8eo"
                target="_blank"
                className="underline underline-offset-4 decoration-neutral-400/40 hover:text-white hover:decoration-neutral-200"
              >
                scooter-safety startup
              </a>
              , and built a lot at{" "}
              <a
                href="https://devpost.com/gursimransingh"
                target="_blank"
                className="underline underline-offset-4 decoration-neutral-400/40 hover:text-white hover:decoration-neutral-200"
              >
                HackGT
              </a>
              .
            </li>
            <li>Raised in Delhi, grew up on science fairs &amp; competitive quizzing.</li>
          </ul>
        </section>

        {/* PERSONAL */}
        <section className="mt-12">
          <h2 className="text-[11px] font-medium uppercase tracking-[0.20em] text-neutral-400">
            Personal
          </h2>
          <ul className="mt-4 list-disc pl-5 space-y-4 leading-relaxed text-neutral-200 marker:text-neutral-500">
            <li>
              In college I pulled off a fun stunt to land an internship - spelling out “Hire Me” with sticky
              notes on my dorm window. It went viral and got covered in{" "}
              <a
                href="https://nypost.com/2019/10/31/college-student-lands-fortune-500-gig-by-writing-hire-me-with-sticky-notes/"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 decoration-neutral-400/40 hover:text-white hover:decoration-neutral-200"
              >
                the New York Post
              </a>
              .
            </li>
            <li>
              I’ve always loved hardware. My parents bought me my first Raspberry Pi when I was 14 and I
              built wearable glasses to aid the visually impaired. The project earned me an{" "}
              <a
                href="https://yourstory.com/2017/06/gursimran-singh"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 decoration-neutral-400/40 hover:text-white hover:decoration-neutral-200"
              >
                award from
                Michael Phelps
              </a>
              .
            </li>
            <li>
              Fitness is a huge part of my life. Over the past few years I’ve lost 70+ lbs, built muscle,
              and tracked progress obsessively on Strava and Hevy. I’ve also trained in boxing and CrossFit,
              and spend a lot of time kayaking or on the rowing erg.
            </li>
            <li>
              Living in the Pacific Northwest means endless trails - I spend weekends hiking and rating
              routes on{" "}
              <a
                href="https://www.alltrails.com/members/gursimran-singh-33"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 decoration-neutral-400/40 hover:text-white hover:decoration-neutral-200"
              >
                AllTrails
              </a>
              .
            </li>
            <li>
              I’m a big sports fan and love watching live games. My favorite teams are the LA Clippers and the
              Philadelphia Eagles. By pure luck, I’ve even been interviewed a few times on ESPN and TNT during
              games.
            </li>
          </ul>
        </section>

        {/* LINKS */}
        <section className="mt-12">
          <nav className="flex flex-wrap gap-2">
            <a
              className="rounded-full border border-neutral-800 px-3 py-1.5 text-sm text-neutral-200 transition hover:bg-neutral-900 hover:border-neutral-700"
              href="https://www.linkedin.com/in/pingthesingh/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="rounded-full border border-neutral-800 px-3 py-1.5 text-sm text-neutral-200 transition hover:bg-neutral-900 hover:border-neutral-700"
              href="https://github.com/gsymmy30"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="rounded-full border border-neutral-800 px-3 py-1.5 text-sm text-neutral-200 transition hover:bg-neutral-900 hover:border-neutral-700"
              href="mailto:gsymmy@gmail.com"
            >
              Email
            </a>
          </nav>
        </section>

        <footer className="mt-16 border-t border-neutral-900 pt-6 text-sm text-neutral-500">
          © {new Date().getFullYear()} gsym.me
        </footer>
      </div>

      {/* Easter egg banner (hidden until Konami sequence) */}
      <div
        id="team-banner"
        className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full border border-neutral-800 bg-neutral-900/90 px-4 py-2 text-sm text-neutral-200 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.7)] backdrop-blur transition
                  opacity-0 translate-y-2 pointer-events-none"
      >
        Instagram - @gsymmy
      </div>
    </main>
  );
}
