"use client";

import { usePathname } from "next/navigation";
import TransitionLink from "./TransitionLink";

export default function PressNavLink() {
  const pathname = usePathname();
  if (pathname === "/press") return null;
  return (
    <TransitionLink href="/press" className="corner-nav-link">
      Press ↗
    </TransitionLink>
  );
}
