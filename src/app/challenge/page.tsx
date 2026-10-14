import type { Metadata } from "next";
import ChallengeWaitlistForm from "@/components/ChallengeWaitlistForm";

export const metadata: Metadata = {
  title: "רשימת המתנה לאתגר ההרגלים | מקום לנשום",
  description: "הצטרפות לרשימת ההמתנה לסבב הבא של אתגר ההרגלים של מקום לנשום.",
};

export default function ChallengeWaitlistPage() {
  return (
    <main
      className="min-h-screen flex items-center"
      style={{ background: "var(--color-background)" }}
    >
      <div className="section-padding w-full">
        <div className="max-w-md mx-auto text-center mb-10">
          <h1 className="headline-section mb-4">רשימת המתנה לאתגר ההרגלים של מקום לנשום</h1>
          <p className="body-text">אנחנו נעדכן אותך בתאריך הפתיחה בהקדם</p>
          <div className="divider-line" />
        </div>
        <ChallengeWaitlistForm />
      </div>
    </main>
  );
}
