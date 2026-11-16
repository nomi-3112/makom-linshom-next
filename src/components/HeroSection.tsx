"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { onScrollFrame, prefersReducedMotion } from "@/lib/motion";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    if (!section || !bg || !content || prefersReducedMotion()) return;

    let last = -1;
    return onScrollFrame(() => {
      const h = section.offsetHeight;
      const y = Math.min(window.scrollY, h);
      if (y === last) return; // nothing changed (e.g. hero already scrolled past)
      last = y;
      bg.style.transform = `translate3d(0, ${(y * 0.35).toFixed(1)}px, 0)`;
      content.style.opacity = String(Math.max(0, 1 - y / (h * 0.6)));
      content.style.transform = `translate3d(0, ${(-y * 0.15).toFixed(1)}px, 0)`;
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] min-h-[560px] overflow-hidden"
      style={{ background: "var(--color-ink-warm)" }}
    >
      {/* Background image: slow zoom + scroll parallax */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <div className="absolute inset-0 hero-kenburns">
          <Image
            src="/hero-flower.jpg"
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover [object-position:8%_78%] md:[object-position:0%_65%]"
          />
        </div>
      </div>
      <div className="absolute inset-0 hero-shade" />

      {/* Logo + line */}
      <div
        ref={contentRef}
        className="relative z-10 flex h-full flex-col items-center justify-end pb-[3.75rem] md:justify-center md:pb-0 md:pl-[14%] px-6 text-center will-change-transform"
      >
        <h1 className="sr-only">מקום לנשום</h1>
        <Image
          src="/logo-cream.png"
          alt="מקום לנשום - עידן פלג"
          width={1062}
          height={1056}
          preload
          sizes="(min-width: 768px) 360px, 190px"
          className="hero-logo w-[min(190px,22svh)] md:w-[360px] h-auto"
        />
        <p
          className="hero-sub mt-4 md:mt-8 text-base sm:text-lg md:text-2xl font-light opacity-0 animate-fade-up"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-cream)",
            animationDelay: "500ms",
          }}
        >
          מרחב לריפוי, התפתחות ושיבה הביתה.
        </p>
      </div>

      <a
        href="#manifesto"
        aria-label="גלילה לתוכן"
        className="scroll-cue absolute bottom-[calc(2rem+2.5rem)] left-1/2 -translate-x-1/2 z-10 hidden md:block"
      />
    </section>
  );
};

export default HeroSection;
