"use client";

import Link from "next/link";

export default function CornerBackLink() {
  return (
    <div className="fixed top-0 right-0 p-6 sm:p-8" style={{ zIndex: 150 }}>
      <Link
        href="/"
        style={{
          fontFamily: "'Parkinsans', sans-serif",
          fontSize: "9px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#555",
          textDecoration: "none",
          transition: "color 0.22s ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "#111")}
        onMouseLeave={e => (e.currentTarget.style.color = "#555")}
      >
        ← Index
      </Link>
    </div>
  );
}
