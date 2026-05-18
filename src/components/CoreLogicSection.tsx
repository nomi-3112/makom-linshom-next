import Image from "next/image";

const CoreLogicSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <Image src="/cracked-earth.jpg" alt="" fill className="object-cover" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="headline-section mb-4">בלי קלישאות ובלי קיצורי דרך</h2>
        <div className="divider-line" />
        <p className="body-text leading-loose">
          אני מאמין ש<span className="font-bold">תובנה לבד לא משחררת</span>. אפשר להבין הכל בראש ועדיין להישאר דרוכים ולחוצים ברגע האמת. החוויות והזיכרונות שלנו נצרבים בגוף, בשרירים ובתאים.
        </p>
        <p className="body-text leading-loose mt-6">
          כשהראש אומר שהכל בסדר אבל הגוף ממשיך לשאת את המתח – שם נדרש השינוי. <span className="font-bold">הנשימה היא הדרך המהירה ביותר לדבר ישירות עם מערכת העצבים</span>, לשחרר מטענים כלואים וליצור שינוי יציב שלא תלוי במאמץ של המחשבה אלא הופך לחלק מהנוכחות שלנו.
        </p>
      </div>
    </section>
  );
};

export default CoreLogicSection;
