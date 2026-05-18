"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const testimonials = [
  { src: "/testimonial-daniel.jpg", alt: "המלצה מדניאל קפלן" },
  { src: "/testimonial-israel.jpg", alt: "המלצה מישראל סוויסה" },
  { src: "/testimonial-leah.png", alt: "המלצה מלאה ישעיהו" },
  { src: "/testimonial-noa.jpeg", alt: "המלצה מנועה ויניקור" },
  { src: "/testimonial-shahar.png", alt: "המלצה משחר פרל" },
  { src: "/testimonial-kelly.jpeg", alt: "המלצה מקלי מאיירס" },
  { src: "/testimonial-ori.jpg", alt: "המלצה מאורי" },
  { src: "/testimonial-galit.jpg", alt: "המלצה מגלית" },
  { src: "/testimonial-inbar.jpg", alt: "המלצה מענבר נוי אליאסי" },
  { src: "/testimonial-hila.jpg", alt: "המלצה מהילה" },
  { src: "/testimonial-ofek2.jpg", alt: "המלצה מאופק פרץ" },
];

const TestimonialsSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="section-padding bg-card">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="headline-section mb-4 px-2 text-xl md:text-3xl lg:text-4xl">
          מה אומרים אנשים שעברו איתי דרך
        </h2>
        <div className="divider-line" />

        <div className="mt-12 columns-2 md:columns-3 gap-4">
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(t.src)}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer hover:scale-[1.02] transition-transform break-inside-avoid mb-4 w-full"
            >
              <Image
                src={t.src}
                alt={t.alt}
                width={600}
                height={800}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-2xl p-2">
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="המלצה"
              width={800}
              height={1000}
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TestimonialsSection;
