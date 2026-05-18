import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden h-[500px]">
            <Image
              src="/idan-portrait.jpg"
              alt="עידן פלג"
              fill
              className="object-cover object-top"
            />
          </div>

          <div>
            <h2 className="headline-section mb-4">עידן פלג</h2>
            <div
              className="w-16 h-px mb-8"
              style={{ background: "var(--color-secondary)" }}
            />
            <p className="body-text leading-loose">
              אני בן 43, בן זוג של נעמי ואבא לאורי. במשך שנים רבות עסקתי במוזיקה וביצירה. בתוך תוכי חייתי במאבק מתמשך ובתחושת כישלון. ניסיתי לשנות הכל בחוץ – מסגרות, קשרים ומקומות – אבל שום דבר לא השתנה עד שלא לקחתי אחריות על מערכת היחסים שלי עם עצמי.
            </p>
            <p className="body-text leading-loose mt-6">
              פיתחתי את &lsquo;תודעה נושמת לרווחה&rsquo; כדי להעניק לך את המרחב והכלים שאני מצאתי. המטרה שלי היא לא לפתור לכם את הצרות, אלא להכשיר אתכם לחיות בשלום ובחופש בתוך עצמכם.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
