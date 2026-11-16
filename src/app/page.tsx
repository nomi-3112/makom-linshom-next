import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import ManifestoSection from "@/components/ManifestoSection";
import VideoSection from "@/components/VideoSection";
import CoreLogicSection from "@/components/CoreLogicSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import NewsletterPopup from "@/components/NewsletterPopup";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--color-ink-warm)" }}>
      <NewsletterPopup />
      <HeroSection />

      {/* The page rises over the hero image like a sheet */}
      <div
        className="relative z-10 -mt-10 rounded-t-[2.5rem] overflow-hidden"
        style={{
          background: "var(--color-background)",
          boxShadow: "0 -24px 48px -24px hsl(30 25% 8% / 0.45)",
        }}
      >
        <ManifestoSection />
        <VideoSection />
        <CoreLogicSection />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />

        <footer className="pb-10 pt-4 flex flex-col items-center gap-4 text-center">
          <Image
            src="/logo-green.png"
            alt="מקום לנשום - עידן פלג"
            width={1062}
            height={1056}
            sizes="96px"
            className="w-24 h-auto opacity-90"
          />
          <p
            className="text-sm font-light"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-muted-foreground)" }}
          >
            © {new Date().getFullYear()} מקום לנשום — עידן פלג. כל הזכויות שמורות.
          </p>
        </footer>
      </div>
    </main>
  );
}
