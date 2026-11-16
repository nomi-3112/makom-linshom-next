import Reveal from "@/components/motion/Reveal";

const VideoSection = () => {
  return (
    <section className="section-padding bg-card">
      <Reveal className="max-w-3xl mx-auto text-center">
        <h2 className="headline-section mb-4">סיור קצר במרחב</h2>
        <div className="divider-line" />
      </Reveal>
      <Reveal className="mt-10" delay={120}>
        {/* Phone-style frame */}
        <div
          className="mx-auto w-full max-w-[340px] rounded-[2.75rem] p-2.5 shadow-[0_40px_80px_-30px_hsl(30_25%_8%/0.55)]"
          style={{ background: "var(--color-ink-warm)" }}
        >
          <div className="relative w-full overflow-hidden rounded-[2.2rem] aspect-[9/16] bg-black">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/UK4b3DNdBAE"
              title="סיור קצר במרחב - מקום לנשום"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default VideoSection;
