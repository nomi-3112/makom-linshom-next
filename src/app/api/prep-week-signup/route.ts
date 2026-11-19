import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isSignupClosed } from "@/lib/inOutRound";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY = ["nzah311296@gmail.com", "eidanpeleg@gmail.com"];

// שורה בגוגל שיטס, דרך סקריפט גוגל שמחובר לגיליון (doPost)
async function addToSheet(name: string, phone: string, email: string) {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) throw new Error("SHEETS_WEBHOOK_URL is not set");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ secret: process.env.SHEETS_WEBHOOK_SECRET, name, phone, email }),
  });
  const text = await res.text();
  if (!res.ok || text.trim() !== "ok") throw new Error(`Sheet webhook answered: ${text.slice(0, 200)}`);
}

async function notifyByEmail(name: string, phone: string, email: string, nextRound: boolean) {
  const { error } = await resend.emails.send({
    from: "מקום לנשום <idan@makom-linshom.com>",
    to: NOTIFY,
    replyTo: email,
    subject: nextRound ? `IN/OUT, רשימה לסבב הבא: ${name}` : `הרשמה ל-IN/OUT: ${name}`,
    text: nextRound
      ? `מישהו השאיר פרטים לסבב הבא של אתגר ההרגלים (ההרשמה לסבב הנוכחי סגורה):\n\nשם: ${name}\nטלפון: ${phone}\nמייל: ${email}`
      : `הרשמה חדשה לשבוע ההכנה של אתגר ההרגלים:\n\nשם: ${name}\nטלפון: ${phone}\nמייל: ${email}`,
  });
  if (error) throw error;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, phone, email, website, round } = body;
  // אחרי מועד הסגירה כל פנייה נרשמת לסבב הבא, גם אם הדף נטען לפני הסגירה
  const nextRound = round === "next" || isSignupClosed();

  // Honeypot: בוטים ממלאים את השדה הנסתר הזה, בני אדם לא רואים אותו
  if (website) {
    return NextResponse.json({ success: true });
  }

  if (!name || !phone || !email) {
    return NextResponse.json(
      { success: false, error: "נא למלא את כל השדות" },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { success: false, error: "כתובת מייל לא תקינה" },
      { status: 400 }
    );
  }

  // מספיק שאחד מהשניים הצליח כדי שההרשמה לא תלך לאיבוד
  // בגיליון מסמנים את מי שנרשם לסבב הבא בתחילת השם, כדי שלא יתערבב עם משתתפי הסבב הנוכחי
  const sheetName = nextRound ? `[סבב הבא] ${name}` : name;
  const [sheet, mail] = await Promise.allSettled([
    addToSheet(sheetName, phone, email),
    notifyByEmail(name, phone, email, nextRound),
  ]);
  if (sheet.status === "rejected") console.error("Sheet append failed:", sheet.reason);
  if (mail.status === "rejected") console.error("Resend send failed:", mail.reason);

  if (sheet.status === "rejected" && mail.status === "rejected") {
    return NextResponse.json(
      { success: false, error: "שליחה נכשלה, נסו שוב" },
      { status: 500 }
    );
  }
  return NextResponse.json({ success: true, round: nextRound ? "next" : "current" });
}
