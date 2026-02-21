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

  // Scroll progress bar
  useEffect(() => {
    const bar = document.getElementById("scroll-bar");
    const onScroll = () => {
      if (!bar) return;
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const pct = scrollHeight <= clientHeight ? 0 : (scrollTop / (scrollHeight - clientHeight)) * 100;
      bar.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Photo 3D tilt
  const handlePhotoMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 11;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -11;
    e.currentTarget.style.transition = "none";
    e.currentTarget.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg)`;
  };
  const handlePhotoLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transition = "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
    e.currentTarget.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <main className="min-h-screen px-6 sm:px-8 py-20 md:py-32">

      {/* Scroll progress bar */}
      <div
        id="scroll-bar"
        className="fixed top-0 left-0 h-px pointer-events-none"
        style={{ width: "0%", zIndex: 200, background: "linear-gradient(90deg, #7A5A18, #C8922A 60%, #E8B85A)" }}
      />

      <div className="mx-auto max-w-[640px]">

        {/* Header */}
        <header className="page-child flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-6 sm:gap-10">

          <div className="name-block">
            <h1 className="display-name text-4xl sm:text-5xl md:text-7xl leading-none pt-3 pb-2 bg-gradient-to-r from-[#f3efe7] to-[#b3ab9e] bg-clip-text text-transparent">
              Gursimran
              <br />
              Singh
            </h1>
            <div className="mt-7 space-y-2">
              <p className="meta-eyebrow">
                Technical Program Manager
              </p>
              <p className="text-[#5E5A54] text-[13px]">
                <a
                  href="https://deepmind.google/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#E8B85A] transition-colors duration-200"
                >
                  Google DeepMind
                </a>
                <span className="mx-2 text-[#2E2D2A]">/</span>
                <span className="text-[#46443F]">San Francisco</span>
              </p>
            </div>
          </div>

          <div
            className="relative group shrink-0 w-[100px] h-[100px] sm:w-[132px] sm:h-[132px] md:w-[158px] md:h-[158px]"
            onMouseMove={handlePhotoMove}
            onMouseLeave={handlePhotoLeave}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute -inset-3 bg-gradient-to-br from-[#c8922a]/14 via-[#8f7c5b]/6 to-transparent rounded-3xl blur-xl transition-all duration-700 group-hover:from-[#d4a84e]/20" />
            <div className="absolute -inset-[1px] border border-[#c8922a]/22 rounded-xl" />
            <Image
              src="/headshot.jpg"
              alt="Gursimran Singh"
              width={158}
              height={158}
              priority
              className="relative rounded-xl w-full h-full object-cover saturate-[0.9] contrast-[1.04]"
            />
          </div>
        </header>

        {/* About */}
        <section className="page-child mt-16">
          <h2 className="section-label mb-6">
            <span className="section-num">01</span>
            About
          </h2>
          <div className="space-y-4 text-[15px] leading-[1.85] body-copy">
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
                className="inline-ref"
              >
                scooter-safety startup
              </a>
              , built a lot at{" "}
              <a
                href="https://devpost.com/gsymmy"
                target="_blank"
                rel="noreferrer"
                className="inline-ref"
              >
                HackGT
              </a>
              , and did computer vision research.
            </p>
            <p>Raised in Delhi, grew up on science fairs and competitive quizzing.</p>
          </div>
        </section>

        {/* Personal */}
        <section className="page-child mt-14">
          <h2 className="section-label mb-6">
            <span className="section-num">02</span>
            Personal
          </h2>
          <div className="space-y-4 text-[15px] leading-[1.85] body-copy">
            <p>
              In college I spelled out "Hire Me" with sticky notes on my dorm
              window. It went viral and got covered in{" "}
              <a
                href="https://nypost.com/2019/10/31/college-student-lands-fortune-500-gig-by-writing-hire-me-with-sticky-notes/"
                target="_blank"
                rel="noreferrer"
                className="inline-ref"
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
                className="inline-ref"
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
        <nav className="page-child mt-14 pt-8 border-t border-[#201F1D] flex items-center flex-wrap gap-y-2 gap-x-4 text-[#5A5650] text-[13px]">
          <a
            href="https://www.linkedin.com/in/pingthesingh/"
            target="_blank"
            rel="noreferrer"
            className="link-hover hover:text-[#EDE7DC] inline-flex items-center gap-[3px]"
          >
            LinkedIn<span className="nav-arrow">↗</span>
          </a>
          <span className="w-px h-3 bg-[#252220] shrink-0" aria-hidden />
          <a
            href="https://github.com/gsymmy30"
            target="_blank"
            rel="noreferrer"
            className="link-hover hover:text-[#EDE7DC] inline-flex items-center gap-[3px]"
          >
            GitHub<span className="nav-arrow">↗</span>
          </a>
          <span className="w-px h-3 bg-[#252220] shrink-0" aria-hidden />
          <a
            href="https://x.com/gsymmy"
            target="_blank"
            rel="noreferrer"
            className="link-hover hover:text-[#EDE7DC] inline-flex items-center gap-[3px]"
          >
            X<span className="nav-arrow">↗</span>
          </a>
          <span className="w-px h-3 bg-[#252220] shrink-0" aria-hidden />
          <a href="mailto:gsymmy@gmail.com" className="link-hover hover:text-[#EDE7DC]">
            Email
          </a>
        </nav>

        {/* Footer */}
        <footer className="page-child mt-14 flex items-center justify-between">
          <span className="text-[#3A3830] font-mono text-[10px] tracking-[0.12em]">
            © {new Date().getFullYear()}
          </span>
          <span
            className="hover:text-[#C8922A] transition-colors duration-300 cursor-default select-none text-[#4A4640]"
            style={{ fontSize: "14px", letterSpacing: "0.2em", fontWeight: 500 }}
          >
            GS
          </span>
        </footer>

      </div>

      {/* Easter egg banner */}
      <div
        id="team-banner"
        className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full border border-[#3a362f] bg-[#171614]/90 px-4 py-2 text-sm text-[#f6f1e9] shadow-lg backdrop-blur transition
                   opacity-0 translate-y-2 pointer-events-none"
      >
        Instagram @gsymmy
      </div>
    </main>
  );
}
