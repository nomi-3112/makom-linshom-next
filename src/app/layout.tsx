import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "מקום לנשום — עידן פלג",
  description: "מרחב לריפוי, התפתחות ושיבה הביתה דרך נשימה, גוף ותודעה.",
  openGraph: {
    title: "מקום לנשום — עידן פלג",
    description: "מרחב לריפוי, התפתחות ושיבה הביתה דרך נשימה, גוף ותודעה.",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
