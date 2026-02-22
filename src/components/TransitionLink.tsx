"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent, CSSProperties, ReactNode } from "react";

interface Props {
  href: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export default function TransitionLink({ href, className, style, children }: Props) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!("startViewTransition" in document)) {
      router.push(href);
      return;
    }
    (document as Document & { startViewTransition: (cb: () => void) => void })
      .startViewTransition(() => router.push(href));
  };

  return (
    <a href={href} onClick={handleClick} className={className} style={style}>
      {children}
    </a>
  );
}
