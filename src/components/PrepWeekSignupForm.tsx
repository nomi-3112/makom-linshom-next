"use client";

import { useState } from "react";

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/GscBoPMAr0CK0M8HjCNQDx";
const IDAN_WHATSAPP_URL = "https://wa.me/972507341685";

const PrepWeekSignupForm = () => {
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
      const res = await fetch("/api/prep-week-signup", {
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
      <div className="text-center max-w-md mx-auto space-y-5">
        <p className="body-text" style={{ color: "var(--color-primary)" }}>
          נרשמת. שבוע ההכנה מתחיל ביום ראשון 22.11 בבוקר, וכל התוכן יגיע בקבוצת הוואטסאפ.
        </p>
        {WHATSAPP_GROUP_URL && (
          <a
            href={WHATSAPP_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button w-full justify-center rounded-lg"
          >
            הצטרפות לקבוצה
          </a>
        )}
        <p className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>
          יש שאלה? אפשר לכתוב לעידן ישירות{" "}
          <a
            href={IDAN_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: "var(--color-primary)" }}
          >
            בוואטסאפ
          </a>
        </p>
      </div>
    );
  }

  const inputStyle = {
    background: "var(--color-background)",
    borderColor: "var(--color-border)",
    color: "var(--color-foreground)",
  };

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
        aria-label="שם מלא"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 rounded-md border text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        style={inputStyle}
      />

      <input
        type="tel"
        placeholder="טלפון"
        aria-label="טלפון"
        autoComplete="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full px-4 py-2 rounded-md border text-sm text-right outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        style={inputStyle}
      />

      <input
        type="email"
        placeholder="כתובת מייל"
        aria-label="כתובת מייל"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 rounded-md border text-sm text-right outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        style={inputStyle}
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
        {status === "loading" ? "שולח..." : "אני רוצה להצטרף"}
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

export default PrepWeekSignupForm;
