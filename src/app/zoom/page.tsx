import type { Metadata } from "next";
import ZoomSignupForm from "@/components/ZoomSignupForm";

export const metadata: Metadata = {
  title: "הרשמה למפגש נשימה פתוח בזום | מקום לנשום",
  description: "הרשמה למפגש נשימה פתוח בזום עם עידן פלג.",
};

export default function ZoomSignupPage() {
  return (
    <main
      className="min-h-screen flex items-center"
      style={{ background: "var(--color-background)" }}
    >
      <div className="section-padding w-full">
        <div className="max-w-md mx-auto text-center mb-10">
          <h1 className="headline-section mb-4">הרשמה למפגש נשימה פתוח בזום</h1>
          <div className="divider-line" />
        </div>
        <ZoomSignupForm />
      </div>
    </main>
  );
}
