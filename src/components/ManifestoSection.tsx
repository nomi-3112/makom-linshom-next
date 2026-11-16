import Reveal from "@/components/motion/Reveal";
import ParallaxImage from "@/components/motion/ParallaxImage";

const ManifestoSection = () => {
  return (
    <section id="manifesto" className="section-padding section-roomy scroll-mt-4">
      <Reveal className="max-w-3xl mx-auto text-center">
        <h2 className="headline-section mb-4">המרחב שלנו</h2>
        <div className="divider-line divider-gold" />
        <p className="body-text leading-loose">
          מקום לנשום נובע מתוך חיבור לאמת פנימית והבנה שחווית החיים שלנו מתחילה ונוצרת מבפנים. זהו מרחב שבו אדם לומד להיות טוב עם עצמו, לגלות את העוצמה והשקט שבתוכו, ולנשום בחייו מחדש בגרסה יציבה וחופשית יותר.
        </p>
        <p className="body-text leading-loose mt-6">
          כאן, הנשימה היא שער, המודעות היא ממלכה והלב הוא מצפן. אנו מלווים אנשים בתהליכים שהם אנושיים, עדינים, ובה בעת עמוקים ומהפכניים – תנועה מתמדת של שיבה אל עצמנו וצמיחה כדרך חיים. המקום הזה נולד להיות מרחב לריפוי ונועד להיות בית.
        </p>
      </Reveal>

      <Reveal className="max-w-5xl mx-auto mt-16">
        <ParallaxImage
          src="/space.jpg"
          alt="המרחב של מקום לנשום"
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="w-full h-72 md:h-[28rem] rounded-[2rem] shadow-[0_30px_60px_-30px_hsl(30_25%_10%/0.45)]"
        />
      </Reveal>
    </section>
  );
};

export default ManifestoSection;
