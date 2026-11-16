import type { Metadata } from "next";
import PrepWeekSignupForm from "@/components/PrepWeekSignupForm";

export const metadata: Metadata = {
  title: "IN/OUT: חודש של שינוי הרגלים | מקום לנשום",
  description:
    "חודש של התנסות בשינוי הרגלים במסגרת משותפת. שבוע הכנה מ-22.11, נקודת הזינוק ב-29.11. כל המסלול ללא עלות.",
};

const stageTitle = { color: "var(--color-primary)" };

export default function InOutPage() {
  return (
    <main
      className="min-h-screen flex items-center"
      style={{ background: "var(--color-background)" }}
    >
      <div className="section-padding w-full">
        <div className="max-w-md mx-auto text-center mb-10">
          <h1 className="headline-section mb-4">IN/OUT: חודש של שינוי הרגלים</h1>
          <p className="body-text mb-8">
            נבחן את ההרגלים שאנחנו מקיימים ואת ההשפעה שלהם על מצב הרוח, האנרגיה ותחושת הרווחה
            שלנו, ונצא יחד לחודש של התנסות בשינוי הרגלים, במסגרת משותפת.
          </p>

          <div className="mb-8">
            <p className="body-text font-semibold mb-1" style={stageTitle}>
              שבוע הכנה · ראשון 22.11 עד חמישי 26.11
            </p>
            <p className="body-text mb-3">
              נבחר איזה הרגל יוצא ומה נכנס במקומו, ונבנה תוכנית ברורה לחודש.
            </p>
            <p className="body-text font-semibold">כמה זמן זה ייקח?</p>
            <p className="body-text">עשר דקות בבוקר ועשר בערב.</p>
          </div>

          <div className="mb-8">
            <p className="body-text font-semibold mb-1" style={stageTitle}>
              החודש · נקודת הזינוק ביום ראשון 29.11
            </p>
            <p className="body-text">
              30 יום במסגרת של קבוצה, עם תכנים תומכים ומותאמים ליום-יום, ואפליקציה אישית לליווי
              התהליך.
            </p>
          </div>

          <p className="body-text mb-4">
            אם יש מישהו קרוב שגם מרגיש שהגיע הזמן, חבר, חברה, בן או בת זוג, משפחה וכו&apos;,
            ממליצים להירשם יחד ולהיות שותפים לדרך.
          </p>
          <p className="body-text">
            כל המסלול ללא עלות, ונשמח שתענו על המשובים שנשלח לאורך הדרך.
          </p>
          <div className="divider-line" />
        </div>
        <PrepWeekSignupForm />
      </div>
    </main>
  );
}
