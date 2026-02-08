"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Page() {
  // Easter egg: type "gdawg" to show the banner
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
    <main className="min-h-screen px-8 py-20 md:py-32">
      <div className="mx-auto max-w-[620px]">
        {/* Header */}
        <header className="flex items-start justify-between gap-8">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-[-0.04em] leading-none pt-3 pb-2 bg-gradient-to-r from-white to-[#a3a3a3] bg-clip-text text-transparent">
              Gursimran
              <br />
              Singh
            </h1>
            <div className="mt-6 space-y-1">
              <p className="text-[#fafafa] font-medium tracking-tight">
                Technical Program Manager
              </p>
              <p className="text-[#737373]">
                <a
                  href="https://deepmind.google/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-300 transition-colors duration-300"
                >
                  Google DeepMind
                </a>
                <span className="mx-2 text-[#404040]">/</span>
                <span className="text-[#525252]">San Francisco</span>
              </p>
            </div>
          </div>
          <div className="relative group shrink-0">
            <div className="absolute -inset-3 bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-transparent rounded-3xl blur-xl transition-all duration-700 group-hover:from-indigo-500/30 group-hover:via-purple-500/20" />
            <div className="absolute -inset-[1px] bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-2xl" />
            <Image
              src="/headshot.jpg"
              alt="Gursimran Singh"
              width={170}
              height={170}
              priority
              className="relative rounded-2xl transition-all duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </header>

        {/* About */}
        <section className="mt-16">
          <h2 className="section-label mb-6">About</h2>
          <div className="space-y-4 text-[15px] leading-[1.75] text-[#a3a3a3]">
            <p>
              Previously Product Manager at Microsoft Azure, working on
              Azure Observability and AIOps.
            </p>
            <p>
              CS + Design at Georgia Tech. Founded a{" "}
              <a
                href="https://www.youtube.com/watch?v=0-CumFHE8eo"
                target="_blank"
                rel="noreferrer"
                className="text-[#e5e5e5] underline decoration-[#404040] hover:text-white hover:decoration-indigo-400/50 transition-all duration-300"
              >
                scooter-safety startup
              </a>
              , built a lot at{" "}
              <a
                href="https://devpost.com/gursimransingh"
                target="_blank"
                rel="noreferrer"
                className="text-[#e5e5e5] underline decoration-[#404040] hover:text-white hover:decoration-indigo-400/50 transition-all duration-300"
              >
                HackGT
              </a>
              , and did computer vision research.
            </p>
            <p>Raised in Delhi, grew up on science fairs and competitive quizzing.</p>
          </div>
        </section>

        {/* Personal */}
        <section className="mt-14">
          <h2 className="section-label mb-6">Personal</h2>
          <div className="space-y-4 text-[15px] leading-[1.75] text-[#a3a3a3]">
            <p>
              In college I spelled out "Hire Me" with sticky notes on my dorm
              window. It went viral and got covered in{" "}
              <a
                href="https://nypost.com/2019/10/31/college-student-lands-fortune-500-gig-by-writing-hire-me-with-sticky-notes/"
                target="_blank"
                rel="noreferrer"
                className="text-[#e5e5e5] underline decoration-[#404040] hover:text-white hover:decoration-indigo-400/50 transition-all duration-300"
              >
                the New York Post
              </a>
              .
            </p>
            <p>
              At 14, I built wearable glasses to aid the visually impaired using a
              Raspberry Pi. The project earned me an{" "}
              <a
                href="https://yourstory.com/2017/06/gursimran-singh"
                target="_blank"
                rel="noreferrer"
                className="text-[#e5e5e5] underline decoration-[#404040] hover:text-white hover:decoration-indigo-400/50 transition-all duration-300"
              >
                award from Michael Phelps
              </a>
              .
            </p>
            <p>
              Fitness is a big part of my life. Over the past few years I've lost
              weight, built muscle, and tracked progress obsessively on Strava and
              Hevy. I've trained in boxing and CrossFit, and spend a lot of time
              kayaking or on the rowing erg.
            </p>
            <p>
              I'm a big sports fan and love watching live games. My favorite teams
              are the LA Clippers and the Philadelphia Eagles. By pure luck, I've
              been interviewed a few times on ESPN and TNT during games.
            </p>
          </div>
        </section>

        {/* Links */}
        <nav className="mt-14 pt-8 border-t border-[#262626] flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#737373]">
          <a
            href="https://www.linkedin.com/in/pingthesingh/"
            target="_blank"
            rel="noreferrer"
            className="link-hover hover:text-white"
          >
            LinkedIn
          </a>
          <span className="text-[#404040]">·</span>
          <a
            href="https://github.com/gsymmy30"
            target="_blank"
            rel="noreferrer"
            className="link-hover hover:text-white"
          >
            GitHub
          </a>
          <span className="text-[#404040]">·</span>
          <a
            href="https://x.com/gsymmy"
            target="_blank"
            rel="noreferrer"
            className="link-hover hover:text-white"
          >
            X
          </a>
          <span className="text-[#404040]">·</span>
          <a href="mailto:gsymmy@gmail.com" className="link-hover hover:text-white">
            Email
          </a>
        </nav>

        {/* Footer */}
        <footer className="mt-16 flex items-center justify-between text-xs text-[#525252]">
          <span>© {new Date().getFullYear()}</span>
          <span className="font-mono tracking-widest text-[#404040] hover:text-indigo-400 transition-colors duration-300 cursor-default">GS</span>
        </footer>
      </div>

      {/* Easter egg banner */}
      <div
        id="team-banner"
        className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full border border-[#262626] bg-[#171717]/90 px-4 py-2 text-sm text-white shadow-lg backdrop-blur transition
                   opacity-0 translate-y-2 pointer-events-none"
      >
        Instagram @gsymmy
      </div>
    </main>
  );
}
