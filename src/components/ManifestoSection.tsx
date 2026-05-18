import Image from "next/image";

const ManifestoSection = () => {
  return (
    <section className="section-padding">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="headline-section mb-4">המרחב שלנו</h2>
        <div className="divider-line" />
        <p className="body-text leading-loose">
          מקום לנשום נובע מתוך חיבור לאמת פנימית והבנה שחווית החיים שלנו מתחילה ונוצרת מבפנים. זהו מרחב שבו אדם לומד להיות טוב עם עצמו, לגלות את העוצמה והשקט שבתוכו, ולנשום בחייו מחדש בגרסה יציבה וחופשית יותר.
        </p>
        <p className="body-text leading-loose mt-6">
          כאן, הנשימה היא שער, המודעות היא ממלכה והלב הוא מצפן. אנו מלווים אנשים בתהליכים שהם אנושיים, עדינים, ובה בעת עמוקים ומהפכניים – תנועה מתמדת של שיבה אל עצמנו וצמיחה כדרך חיים. המקום הזה נולד להיות מרחב לריפוי ונועד להיות בית.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-16 rounded-2xl overflow-hidden">
        <div className="relative w-full h-64 md:h-80">
          <Image
            src="/space.jpg"
            alt="המרחב של מקום לנשום"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
