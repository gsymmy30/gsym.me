"use client";

import TransitionLink from "./TransitionLink";

export default function CornerBackLink() {
  return (
    <div className="fixed top-0 right-0 p-6 sm:p-8 corner-anchor" style={{ zIndex: 150 }}>
      <TransitionLink href="/" className="corner-nav-link">
        ← Index
      </TransitionLink>
    </div>
  );
}
