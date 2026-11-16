import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const { email, website } = (body && typeof body === "object" ? body : {}) as {
    email?: unknown;
    website?: unknown;
  };

  // Honeypot: בוטים ממלאים את השדה הנסתר הזה, בני אדם לא רואים אותו
  if (website) {
    return NextResponse.json({ success: true });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== "string" || email.length > 254 || !emailPattern.test(email)) {
    return NextResponse.json(
      { success: false, error: "כתובת מייל לא תקינה" },
      { status: 400 }
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: "ניוזלטר מקום לנשום <onboarding@resend.dev>",
      to: "nzah311296@gmail.com",
      replyTo: email,
      subject: `הרשמה חדשה לניוזלטר: ${email}`,
      text: `הרשמה חדשה לניוזלטר דרך החלון בדף הבית:\n\nמייל: ${email}\n\nהנרשם/ת אישר/ה קבלת דיוור ואת מדיניות הפרטיות.`,
    });
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend send failed:", error);
    return NextResponse.json(
      { success: false, error: "שליחה נכשלה, נסו שוב" },
      { status: 500 }
    );
  }
}
