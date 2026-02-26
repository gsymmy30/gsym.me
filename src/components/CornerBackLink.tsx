"use client";

import Link from "next/link";

export default function CornerBackLink() {
  return (
    <div className="fixed top-0 right-0 p-6 sm:p-8" style={{ zIndex: 150 }}>
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "9px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#484642",
          textDecoration: "none",
          transition: "color 0.22s ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "#6BABA0")}
        onMouseLeave={e => (e.currentTarget.style.color = "#484642")}
      >
        ← Index
      </Link>
    </div>
  );
}
