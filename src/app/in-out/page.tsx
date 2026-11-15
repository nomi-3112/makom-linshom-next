import type { Metadata } from "next";
import PrepWeekSignupForm from "@/components/PrepWeekSignupForm";

export const metadata: Metadata = {
  title: "הרשמה לשבוע הכנה לאתגר IN/OUT | מקום לנשום",
  description: "שבוע הכנה חינמי, 22.11 עד 26.11, לפני חודש In-Out של שינוי הרגלים עם מקום לנשום.",
};

export default function PrepWeekPage() {
  return (
    <main
      className="min-h-screen flex items-center"
      style={{ background: "var(--color-background)" }}
    >
      <div className="section-padding w-full">
        <div className="max-w-md mx-auto text-center mb-10">
          <h1 className="headline-section mb-4">
            הרשמה לשבוע הכנה לאתגר IN/OUT - חודש של שינוי הרגלים
          </h1>
          <p className="body-text mb-4">
            נבחן את ההרגלים שאנחנו מקיימים ואת ההשפעה שלהם על מצב הרוח, האנרגיה ותחושת הרווחה
            שלנו. נבחר מה יוצא ומה נכנס במקומו, ונבנה מסגרת ברורה לחודש של התנסות. ביום ראשון 29.11
            יוצאים לדרך.
          </p>
          <p className="body-text">
            מיום ראשון 22.11 ועד חמישי 26.11, עשר דקות בבוקר ועשר בערב. בחינם.
          </p>
          <div className="divider-line" />
        </div>
        <PrepWeekSignupForm />
      </div>
    </main>
  );
}
