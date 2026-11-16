import type { Metadata } from "next";
import Image from "next/image";
import PrepWeekSignupForm from "@/components/PrepWeekSignupForm";
import s from "./in-out.module.css";

export const metadata: Metadata = {
  title: "IN/OUT: חודש של שינוי הרגלים | מקום לנשום",
  description:
    "חודש של התנסות בשינוי הרגלים במסגרת משותפת. שבוע הכנה מ-22.11, נקודת הזינוק ב-29.11. כל המסלול ללא עלות.",
};

export default function InOutPage() {
  return (
    <main className={s.page}>
      <div className={s.wrap}>
        <section className={`${s.card} ${s.hero}`}>
          <span className={s.pill}>מתחילים ביום ראשון 22.11</span>
          <h1 className={s.title}>IN/OUT</h1>
          <p className={s.subtitle}>חודש של שינוי הרגלים</p>
          <p className={s.lead}>
            נבחן את ההרגלים שאנחנו מקיימים ואת ההשפעה שלהם על מצב הרוח, האנרגיה ותחושת הרווחה
            שלנו, ונצא יחד לחודש של התנסות בשינוי הרגלים, במסגרת משותפת.
          </p>
        </section>

        <section className={`${s.card} ${s.route}`} aria-label="המסלול">
          <div className={s.step}>
            <span className={s.dot} aria-hidden="true" />
            <h2 className={s.stepTitle}>שבוע הכנה</h2>
            <p className={s.date}>ראשון 22.11 עד חמישי 26.11</p>
            <p className={s.stepText}>
              נבחר איזה הרגל יוצא ומה נכנס במקומו, ונבנה תוכנית ברורה לחודש.
            </p>
            <span className={s.chip}>כמה זמן זה ייקח? עשר דקות בבוקר ועשר בערב</span>
          </div>
          <div className={`${s.step} ${s.stepLast}`}>
            <span className={s.dot} aria-hidden="true" />
            <h2 className={s.stepTitle}>החודש</h2>
            <p className={s.date}>נקודת הזינוק ביום ראשון 29.11</p>
            <p className={s.stepText}>
              30 יום במסגרת של קבוצה, עם תכנים תומכים ומותאמים ליום-יום, ואפליקציה אישית לליווי
              התהליך.
            </p>
          </div>
        </section>

        <p className={s.partner}>
          אם יש מישהו קרוב שגם מרגיש שהגיע הזמן, חבר, חברה, בן או בת זוג, משפחה וכו&apos;,{" "}
          <strong>ממליצים להירשם יחד ולהיות שותפים לדרך.</strong>
        </p>

        <section className={`${s.card} ${s.free}`}>
          <p className={s.freeTitle}>כל המסלול ללא עלות</p>
          <p className={s.freeText}>ונשמח שתענו על המשובים שנשלח לאורך הדרך.</p>
        </section>

        <section className={s.formCard} id="signup">
          <h2 className={s.formTitle}>הרשמה</h2>
          <PrepWeekSignupForm />
        </section>

        <footer className={s.footer}>
          <Image
            src="/logo.png"
            alt="מקום לנשום - עידן פלג"
            width={110}
            height={110}
            className="object-contain"
          />
        </footer>
      </div>
    </main>
  );
}
