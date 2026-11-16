import Image from "next/image";
import { MessageCircle } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

const WHATSAPP_URL =
  "https://wa.me/972507341685?text=%D7%94%D7%99%D7%99%20%D7%A2%D7%99%D7%93%D7%9F%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%94%D7%AA%D7%99%D7%99%D7%A2%D7%A5%20%D7%90%D7%99%D7%AA%D7%9A%20%D7%90%D7%9D%20%D7%AA%D7%94%D7%9C%D7%99%D7%A3%20%D7%94%D7%9C%D7%99%D7%95%D7%95%D7%99%20%D7%A9%D7%9C%D7%9A%20%D7%99%D7%9B%D7%95%D7%9C%20%D7%9C%D7%94%D7%AA%D7%90%D7%99%D7%9D%20%D7%9C%D7%99";

const ContactSection = () => {
  return (
    <section className="px-4 py-20 md:px-12 md:py-28">
      <Reveal>
        <div
          className="relative max-w-4xl mx-auto overflow-hidden rounded-[2.5rem] px-6 py-16 md:px-16 md:py-24 text-center shadow-[0_40px_80px_-40px_hsl(140_30%_12%/0.7)]"
          style={{ background: "var(--color-primary)" }}
        >
          {/* Faint logo watermark */}
          <Image
            src="/logo-cream.png"
            alt=""
            aria-hidden="true"
            width={1062}
            height={1056}
            sizes="420px"
            className="pointer-events-none absolute -left-24 -bottom-24 w-[420px] h-auto opacity-[0.07]"
          />

          <div className="relative">
            <h2
              className="headline-section mb-4"
              style={{ color: "var(--color-cream)" }}
            >
              לא חייבים ללכת את הדרך הזו לבד
            </h2>
            <div className="divider-line" />
            <p
              className="text-lg md:text-xl font-light mt-6 mb-10"
              style={{ color: "hsl(38 52% 94% / 0.85)" }}
            >
              מוכנים להחליף את המאמץ בנשימה?
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="cta-gold">
              <MessageCircle className="w-5 h-5" />
              בואו נדבר בוואטסאפ
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default ContactSection;
