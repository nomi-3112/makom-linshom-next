import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import ScrollWords from "@/components/motion/ScrollWords";

const paragraphs = [
  [
    { text: "אני מאמין ש" },
    { text: "תובנה לבד לא משחררת", bold: true },
    {
      text: ". אפשר להבין הכל בראש ועדיין להישאר דרוכים ולחוצים ברגע האמת. החוויות והזיכרונות שלנו נצרבים בגוף, בשרירים ובתאים.",
    },
  ],
  [
    { text: "כשהראש אומר שהכל בסדר אבל הגוף ממשיך לשאת את המתח – שם נדרש השינוי. " },
    { text: "הנשימה היא הדרך המהירה ביותר לדבר ישירות עם מערכת העצבים", bold: true },
    {
      text: ", לשחרר מטענים כלואים וליצור שינוי יציב שלא תלוי במאמץ של המחשבה אלא הופך לחלק מהנוכחות שלנו.",
    },
  ],
];

const CoreLogicSection = () => {
  return (
    <section className="section-padding section-roomy relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]">
        <Image src="/cracked-earth.jpg" alt="" fill sizes="100vw" className="object-cover" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <Reveal>
          <h2 className="headline-section mb-4">בלי קלישאות ובלי קיצורי דרך</h2>
          <div className="divider-line divider-gold" />
        </Reveal>
        <ScrollWords
          paragraphs={paragraphs}
          className="flex flex-col gap-8"
          paragraphClassName="font-display text-xl md:text-[1.7rem] leading-[1.8] md:leading-[1.75] font-normal"
        />
      </div>
    </section>
  );
};

export default CoreLogicSection;
