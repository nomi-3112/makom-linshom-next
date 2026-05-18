import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[82svh] md:min-h-screen overflow-hidden">
      {/* Logo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <div
          className="w-[130px] h-[130px] md:w-[158px] md:h-[158px] -mt-5 md:-mt-7 flex items-center justify-center rounded-full"
          style={{
            background: "var(--color-background)",
            boxShadow: "0 4px 20px hsl(30 10% 20% / 0.08)",
          }}
        >
          <Image
            src="/logo.png"
            alt="מקום לנשום - עידן פלג"
            width={154}
            height={154}
            className="w-[126px] h-[126px] md:w-[154px] md:h-[154px] object-contain scale-110"
            priority
          />
        </div>
      </div>

      {/* Hero Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-flower.jpg"
          alt="פרח במדבר - מקום לנשום"
          fill
          className="object-cover scale-[1.12] md:scale-100 [object-position:8%_78%] md:[object-position:0%_65%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/30 via-transparent to-[var(--color-background)]/90" />
      </div>

      {/* Hero Text */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end px-5 pb-10 md:px-6 md:pb-20 text-center">
        <h1 className="headline-display text-5xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-3 md:mb-6 opacity-0 animate-fade-up">
          מקום לנשום
        </h1>
        <p
          className="body-text text-lg sm:text-xl md:text-3xl lg:text-4xl font-light max-w-[22ch] mx-auto opacity-0 animate-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          מרחב לריפוי, התפתחות ושיבה הביתה.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
