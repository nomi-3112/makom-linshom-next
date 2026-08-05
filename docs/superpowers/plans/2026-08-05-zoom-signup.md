# טופס הרשמה למפגש נשימה בזום — תוכנית ביצוע

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** עמוד `/zoom` עם טופס הרשמה (שם/טלפון/מייל) ששולח את הפרטים למייל בעל העסק דרך Resend, בעיצוב תואם לאתר הקיים.

**Architecture:** Next.js App Router. עמוד server component סטטי (`src/app/zoom/page.tsx`) שמכיל client component של הטופס (`src/components/ZoomSignupForm.tsx`). הטופס שולח POST ל-API route (`src/app/api/zoom-signup/route.ts`) שמאמת את הקלט ושולח מייל דרך Resend SDK.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, Resend (שליחת מייל).

**Note on testing:** בפרויקט הזה אין כרגע מסגרת בדיקות אוטומטיות (אין jest/vitest מותקן) — לא מוסיפים אחת רק בשביל הפיצ'ר הזה (YAGNI). כל שלב מאומת ידנית עם `curl` (ל-API) ובדפדפן (לעמוד), כפי שמפורט בכל משימה.

---

### Task 1: התקנת Resend ומשתנה סביבה מקומי

**Files:**
- Modify: `package.json` (dependency חדשה, נוצר אוטומטית ע"י npm install)
- Create: `.env.local`

- [ ] **Step 1: התקנת החבילה**

Run: `npm install resend`
Expected: `resend` מופיע ב-`dependencies` בתוך `package.json`, וההתקנה מסתיימת בלי שגיאות.

- [ ] **Step 2: יצירת קובץ משתני הסביבה המקומי**

Create `.env.local`:
```
RESEND_API_KEY=<המפתח שקיבלתם מ-resend.com>
```
(המפתח בפועל לא נשמר כאן בקובץ מתועד — הוא הוזן ישירות לקובץ `.env.local` המקומי, שאינו נכנס לגיט)

- [ ] **Step 3: לוודא שהקובץ לא נכנס לגיט**

Run: `git status`
Expected: `.env.local` לא מופיע ברשימת הקבצים (כי `.env*` כבר ב-`.gitignore`).

- [ ] **Step 4: קומיט**

```bash
git add package.json package-lock.json
git commit -m "chore: add resend dependency

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 2: API route לשליחת המייל

**Files:**
- Create: `src/app/api/zoom-signup/route.ts`

- [ ] **Step 1: כתיבת ה-route**

```ts
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
    await resend.emails.send({
      from: "הרשמה לזום <onboarding@resend.dev>",
      to: "nzah311296@gmail.com",
      replyTo: email,
      subject: `הרשמה חדשה למפגש זום: ${name}`,
      text: `נרשם/ה חדש/ה למפגש נשימה פתוח בזום:\n\nשם: ${name}\nטלפון: ${phone}\nמייל: ${email}`,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend send failed:", error);
    return NextResponse.json(
      { success: false, error: "שליחה נכשלה, נסו שוב" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: הרצת שרת הפיתוח**

Run: `npm run dev`
Expected: השרת עולה על `http://localhost:3000` בלי שגיאות.

- [ ] **Step 3: בדיקת מסלול הצלחה עם curl**

Run (בטרמינל נפרד, בזמן שהשרת רץ):
```bash
curl -X POST http://localhost:3000/api/zoom-signup \
  -H "Content-Type: application/json" \
  -d '{"name":"בדיקה","phone":"0500000000","email":"test@example.com","website":""}'
```
Expected: תגובה `{"success":true}`, ותוך כמה שניות מגיע מייל לתיבה `nzah311296@gmail.com` עם הכותרת "הרשמה חדשה למפגש זום: בדיקה".

- [ ] **Step 4: בדיקת ולידציה — שדה חסר**

Run:
```bash
curl -X POST http://localhost:3000/api/zoom-signup \
  -H "Content-Type: application/json" \
  -d '{"name":"","phone":"0500000000","email":"test@example.com","website":""}'
```
Expected: סטטוס 400, תגובה `{"success":false,"error":"נא למלא את כל השדות"}`.

- [ ] **Step 5: בדיקת ולידציה — honeypot תפוס**

Run:
```bash
curl -X POST http://localhost:3000/api/zoom-signup \
  -H "Content-Type: application/json" \
  -d '{"name":"בוט","phone":"123","email":"bot@example.com","website":"filled"}'
```
Expected: תגובה `{"success":true}` **בלי** שמגיע מייל לתיבה (כי זו מלכודת ספאם שקטה).

- [ ] **Step 6: קומיט**

```bash
git add src/app/api/zoom-signup/route.ts
git commit -m "feat: add zoom signup email API route

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 3: קומפוננטת הטופס

**Files:**
- Create: `src/components/ZoomSignupForm.tsx`

- [ ] **Step 1: כתיבת הקומפוננטה**

```tsx
"use client";

import { useState } from "react";

const ZoomSignupForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      setStatus("error");
      setErrorText("נא למלא את כל השדות");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/zoom-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, website }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "שליחה נכשלה");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorText(err instanceof Error ? err.message : "שליחה נכשלה, נסו שוב");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center max-w-md mx-auto">
        <p className="body-text" style={{ color: "var(--color-primary)" }}>
          נרשמת בהצלחה. ניצור איתך קשר עם קישור למפגש בזום.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        className="hidden"
        aria-hidden="true"
      />

      <input
        type="text"
        placeholder="שם מלא"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 rounded-md border text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        style={{
          background: "var(--color-background)",
          borderColor: "var(--color-border)",
          color: "var(--color-foreground)",
        }}
      />

      <input
        type="tel"
        placeholder="טלפון"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        dir="ltr"
        className="w-full px-4 py-2 rounded-md border text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        style={{
          background: "var(--color-background)",
          borderColor: "var(--color-border)",
          color: "var(--color-foreground)",
        }}
      />

      <input
        type="email"
        placeholder="כתובת מייל"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        dir="ltr"
        className="w-full px-4 py-2 rounded-md border text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        style={{
          background: "var(--color-background)",
          borderColor: "var(--color-border)",
          color: "var(--color-foreground)",
        }}
      />

      {status === "error" && (
        <p className="text-sm text-center" style={{ color: "var(--color-destructive)" }}>
          {errorText}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="cta-button w-full justify-center rounded-lg disabled:opacity-60"
      >
        {status === "loading" ? "שולח..." : "הרשמה"}
      </button>

      <p
        className="text-xs text-center leading-relaxed"
        style={{ color: "var(--color-muted-foreground)" }}
      >
        בהרשמה אני מאשר/ת את{" "}
        <a
          href="https://docs.google.com/document/d/1AHgzI8DzwfXdRq8-CVW6Vtog1NMwFGAb/edit"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          style={{ color: "var(--color-primary)" }}
        >
          מדיניות הפרטיות
        </a>
      </p>
    </form>
  );
};

export default ZoomSignupForm;
```

- [ ] **Step 2: קומיט**

```bash
git add src/components/ZoomSignupForm.tsx
git commit -m "feat: add zoom signup form component

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 4: עמוד `/zoom`

**Files:**
- Create: `src/app/zoom/page.tsx`

- [ ] **Step 1: כתיבת העמוד**

```tsx
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
```

- [ ] **Step 2: בדיקה ידנית בדפדפן**

עם `npm run dev` עדיין רץ, פותחים `http://localhost:3000/zoom`.
Expected:
- הכותרת "הרשמה למפגש נשימה פתוח בזום" מוצגת עם קו מפריד מתחתיה, באותו סגנון גרפי כמו שאר האתר.
- טופס עם שדות שם/טלפון/מייל, כפתור "הרשמה" ירוק, וטקסט קטן על מדיניות הפרטיות עם לינק שעובד.
- מילוי הטופס ולחיצה על "הרשמה" מציגה הודעת הצלחה, ומגיע מייל אמיתי לתיבה.
- שליחה עם שדה ריק מציגה הודעת שגיאה אדומה ולא שולחת בקשה לשרת.

- [ ] **Step 3: קומיט**

```bash
git add src/app/zoom/page.tsx
git commit -m "feat: add /zoom signup page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 5: הגדרת מפתח ה-API בסביבת הפרודקשן (Vercel) ופריסה

**Files:** אין קבצי קוד — הגדרה בממשק Vercel + push לגיט.

- [ ] **Step 1: הוספת משתנה הסביבה ב-Vercel**

בדפדפן: כניסה ל-vercel.com → פרויקט `makom-linshom-next` → Settings → Environment Variables → הוספת משתנה:
- Name: `RESEND_API_KEY`
- Value: המפתח שנוצר ב-resend.com (אותו מפתח שהוזן ב-`.env.local` המקומי)
- Environment: Production, Preview, Development (כל השלוש)

שמירה (Save).

- [ ] **Step 2: דחיפת הקוד ל-GitHub**

```bash
git push origin main
```
Expected: Vercel מזהה את הפוש (החיבור ל-GitHub כבר קיים) ומתחיל דיפלוי אוטומטי.

- [ ] **Step 3: אימות בפרודקשן**

אחרי שהדיפלוי מסתיים (אפשר לעקוב בדשבורד של Vercel), פותחים בדפדפן:
`https://makom-linshom-next.vercel.app/zoom`
Expected: העמוד עולה, מילוי הטופס ושליחה אמיתית מייצרת מייל בתיבה `nzah311296@gmail.com`.

---

## Out of scope (לא בתוכנית הזו)
- שליחת קישור זום אוטומטית לנרשם
- שמירת נרשמים במסד נתונים / Google Sheets
- captcha מלא
