import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { name, phone, email, website } = body;

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

  try {
    const { error } = await resend.emails.send({
      from: "הרשמה לזום <onboarding@resend.dev>",
      to: "nzah311296@gmail.com",
      replyTo: email,
      subject: `הרשמה חדשה למפגש זום: ${name}`,
      text: `נרשם/ה חדש/ה למפגש נשימה פתוח בזום:\n\nשם: ${name}\nטלפון: ${phone}\nמייל: ${email}`,
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
