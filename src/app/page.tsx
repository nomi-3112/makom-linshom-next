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
    <main className="min-h-screen" style={{ background: "var(--color-background)" }}>
      <NewsletterPopup />
      <HeroSection />
      <ManifestoSection />
      <VideoSection />
      <CoreLogicSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />

      <footer
        className="py-8 text-center border-t"
        style={{ borderColor: "var(--color-border)" }}
      >
        <p
          className="text-sm font-light"
          style={{ fontFamily: "var(--font-body)", color: "var(--color-muted-foreground)" }}
        >
          © {new Date().getFullYear()} מקום לנשום — עידן פלג. כל הזכויות שמורות.
        </p>
      </footer>
    </main>
  );
}
