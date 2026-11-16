"use client";

import { useEffect, useRef } from "react";
import { onScrollFrame, prefersReducedMotion } from "@/lib/motion";

export type Segment = { text: string; bold?: boolean };

type ScrollWordsProps = {
  paragraphs: Segment[][];
  className?: string;
  paragraphClassName?: string;
};

/** Words light up one after another as the reader scrolls past them. */
export default function ScrollWords({
  paragraphs,
  className = "",
  paragraphClassName = "",
}: ScrollWordsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const words = Array.from(el.querySelectorAll<HTMLElement>(".sw-word"));
    el.classList.add("sw-active");

    const cleanup = onScrollFrame(() => {
      const box = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (box.bottom < 0 || box.top > vh) return;
      const line = vh * 0.62;
      for (const word of words) {
        word.classList.toggle("on", word.getBoundingClientRect().top < line);
      }
    });

    return () => {
      cleanup();
      el.classList.remove("sw-active");
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {paragraphs.map((segments, p) => (
        <p key={p} className={paragraphClassName}>
          {segments.map((segment, s) =>
            segment.text.split(/(\s+)/).map((part, w) => {
              if (part === "") return null;
              if (/^\s+$/.test(part)) return part;
              return (
                <span
                  key={`${s}-${w}`}
                  className={`sw-word${segment.bold ? " font-bold" : ""}`}
                >
                  {part}
                </span>
              );
            })
          )}
        </p>
      ))}
    </div>
  );
}
