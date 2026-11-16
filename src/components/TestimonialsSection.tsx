"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Reveal from "@/components/motion/Reveal";

type Testimonial = { src: string; alt: string; width: number; height: number };

/** Strip images are 288px tall on desktop; request a width that matches each image's shape. */
const stripSizes = (t: Testimonial) => `${Math.ceil((288 * t.width) / t.height)}px`;

const testimonials: Testimonial[] = [
  { src: "/testimonial-daniel.jpg", alt: "המלצה מדניאל קפלן", width: 819, height: 970 },
  { src: "/testimonial-israel.jpg", alt: "המלצה מישראל סוויסה", width: 825, height: 1231 },
  { src: "/testimonial-leah.png", alt: "המלצה מלאה ישעיהו", width: 1070, height: 690 },
  { src: "/testimonial-noa.jpeg", alt: "המלצה מנועה ויניקור", width: 407, height: 600 },
  { src: "/testimonial-shahar.png", alt: "המלצה משחר פרל", width: 1170, height: 1153 },
  { src: "/testimonial-kelly.jpeg", alt: "המלצה מקלי מאיירס", width: 1170, height: 1387 },
  { src: "/testimonial-ori.jpg", alt: "המלצה מאורי", width: 903, height: 1736 },
  { src: "/testimonial-galit.jpg", alt: "המלצה מגלית", width: 1140, height: 1741 },
  { src: "/testimonial-inbar.jpg", alt: "המלצה מענבר נוי אליאסי", width: 1170, height: 1691 },
  { src: "/testimonial-hila.jpg", alt: "המלצה מהילה", width: 1080, height: 1818 },
  { src: "/testimonial-ofek2.jpg", alt: "המלצה מאופק פרץ", width: 1170, height: 1506 },
];

const rows = [testimonials.slice(0, 6), testimonials.slice(6)];

const TestimonialsSection = () => {
  const [selected, setSelected] = useState<Testimonial | null>(null);

  const renderItems = (items: Testimonial[], copy: number) => {
    const duplicate = copy > 0;
    return items.map((t) => (
      <button
        key={`${copy}-${t.src}`}
        type="button"
        onClick={() => setSelected(t)}
        aria-hidden={duplicate || undefined}
        tabIndex={duplicate ? -1 : undefined}
        aria-label={duplicate ? undefined : `פתיחת ${t.alt}`}
        className={`shrink-0 overflow-hidden rounded-xl bg-white shadow-[0_10px_24px_-12px_hsl(30_25%_10%/0.35)] transition-transform duration-300 hover:scale-[1.04] focus-visible:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] cursor-zoom-in ${
          duplicate ? "marquee-dup" : ""
        }`}
      >
        <Image
          src={t.src}
          alt={duplicate ? "" : t.alt}
          width={t.width}
          height={t.height}
          sizes={stripSizes(t)}
          className="h-56 md:h-72 w-auto object-cover"
        />
      </button>
    ));
  };

  return (
    <section className="py-24 md:py-32 bg-card overflow-clip">
      <Reveal className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="headline-section mb-4 text-xl md:text-3xl lg:text-4xl">
          מה אומרים אנשים שעברו איתי דרך
        </h2>
        <div className="divider-line divider-gold" />
      </Reveal>

      <div className="mt-10 flex flex-col gap-2">
        {rows.map((row, i) => (
          <div key={i} className="marquee">
            <div className={`marquee-track ${i === 1 ? "reverse" : ""}`}>
              {/* Four copies so the loop never shows a gap on wide screens; the track moves by half */}
              {renderItems(row, 0)}
              {renderItems(row, 1)}
              {renderItems(row, 2)}
              {renderItems(row, 3)}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl p-2 max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">{selected?.alt ?? "המלצה"}</DialogTitle>
          {selected && (
            <Image
              src={selected.src}
              alt={selected.alt}
              width={selected.width}
              height={selected.height}
              sizes="(min-width: 768px) 672px, 100vw"
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TestimonialsSection;
