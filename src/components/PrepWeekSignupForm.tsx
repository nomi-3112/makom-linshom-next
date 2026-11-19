"use client";

import { useState } from "react";

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/GscBoPMAr0CK0M8HjCNQDx";
const IDAN_WHATSAPP_URL = "https://wa.me/972507341685";

// nextRound: ההרשמה לסבב הנוכחי נסגרה, הטופס אוסף פרטים לסבב הבא
const PrepWeekSignupForm = ({ nextRound = false }: { nextRound?: boolean }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [savedForNext, setSavedForNext] = useState(nextRound);
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
        body: JSON.stringify({ name, phone, email, website, round: nextRound ? "next" : "current" }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "שליחה נכשלה");
      }
      // אם ההרשמה נסגרה בזמן שהדף היה פתוח, השרת רושם לסבב הבא
      setSavedForNext(nextRound || data.round === "next");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorText(err instanceof Error ? err.message : "שליחה נכשלה, נסו שוב");
    }
  };

  // הטופס יושב בתוך הקלף הירוק הכהה בדף /in-out
  const goldButton =
    "w-full flex justify-center items-center px-6 py-4 rounded-full text-lg font-bold transition-transform duration-200 hover:-translate-y-0.5";
  const goldStyle = {
    background: "linear-gradient(90deg, #F7C75F, #EEA942)",
    color: "#2a2a2a",
  };

  if (status === "success" && savedForNext) {
    return (
      <div className="text-center space-y-4" role="status">
        <p className="text-base leading-relaxed">
          קיבלנו את הפרטים. נעדכן אותך כשייפתח הסבב הבא.
        </p>
        <p className="text-sm opacity-85">
          יש שאלה? אפשר לכתוב לעידן ישירות{" "}
          <a href={IDAN_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline">
            בוואטסאפ
          </a>
        </p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="text-center space-y-5" role="status">
        <p className="text-base leading-relaxed">
          נרשמת. שבוע ההכנה מתחיל ביום ראשון 22.11 בבוקר, וכל התוכן יגיע בקבוצת הוואטסאפ.
        </p>
        <a
          href={WHATSAPP_GROUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={goldButton}
          style={goldStyle}
        >
          הצטרפות לקבוצה
        </a>
        <p className="text-sm opacity-85">
          יש שאלה? אפשר לכתוב לעידן ישירות{" "}
          <a href={IDAN_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline">
            בוואטסאפ
          </a>
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-5 py-3.5 rounded-[22px] border-0 text-base text-right outline-none focus:ring-2 focus:ring-[#F7C75F]";
  const inputStyle = { background: "#fff", color: "var(--color-foreground)" };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
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
        className={inputClass}
        style={inputStyle}
      />

      <input
        type="tel"
        placeholder="טלפון"
        aria-label="טלפון"
        autoComplete="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={inputClass}
        style={inputStyle}
      />

      <input
        type="email"
        placeholder="כתובת מייל"
        aria-label="כתובת מייל"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
        style={inputStyle}
      />

      {status === "error" && (
        <p className="text-sm text-center font-medium" style={{ color: "#FFD9C7" }} role="alert">
          {errorText}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className={`${goldButton} mt-2 disabled:opacity-60`}
        style={goldStyle}
      >
        {status === "loading" ? "שולח..." : nextRound ? "עדכנו אותי על הסבב הבא" : "אני רוצה להצטרף"}
      </button>

      <p className="text-xs text-center leading-relaxed pt-1 opacity-80">
        בהרשמה אני מאשר/ת את{" "}
        <a
          href="https://docs.google.com/document/d/1AHgzI8DzwfXdRq8-CVW6Vtog1NMwFGAb/edit"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          מדיניות הפרטיות
        </a>
      </p>
    </form>
  );
};

export default PrepWeekSignupForm;
