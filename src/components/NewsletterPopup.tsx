"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("newsletter-dismissed");
    if (dismissed) return;
    const timer = setTimeout(() => setIsOpen(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("newsletter-dismissed", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage({ type: "error", text: "נא להזין כתובת מייל" });
      return;
    }
    if (!agreed) {
      setMessage({ type: "error", text: "נא לאשר את מדיניות הפרטיות" });
      return;
    }
    setMessage({ type: "success", text: "נרשמת בהצלחה לרשימת התפוצה" });
    setTimeout(handleClose, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-[var(--color-foreground)]/40 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />

      <div
        className="relative w-full max-w-md rounded-2xl border p-8 shadow-2xl animate-scale-in"
        style={{
          background: "var(--color-background)",
          borderColor: "var(--color-border)",
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 transition-opacity opacity-60 hover:opacity-100"
          aria-label="סגירה"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h3 className="headline-section text-xl md:text-2xl mb-2">הישארו מחוברים</h3>
          <p className="body-text text-sm md:text-base">
            הצטרפו כדי לקבל תרגילים, תכנים והשראה
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {message && (
            <p
              className="text-sm text-center"
              style={{ color: message.type === "error" ? "var(--color-destructive)" : "var(--color-primary)" }}
            >
              {message.text}
            </p>
          )}

          <button
            type="submit"
            className="cta-button w-full justify-center rounded-lg"
          >
            הרשמה
          </button>

          <div className="flex items-start gap-2 pt-1">
            <Checkbox
              id="privacy"
              checked={agreed}
              onCheckedChange={(v) => setAgreed(v === true)}
              className="mt-1"
            />
            <label
              htmlFor="privacy"
              className="text-xs leading-relaxed cursor-pointer"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              אני מאשר/ת קבלת דיוור ואת מדיניות הפרטיות שמפורטת{" "}
              <a
                href="https://docs.google.com/document/d/1AHgzI8DzwfXdRq8-CVW6Vtog1NMwFGAb/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: "var(--color-primary)" }}
              >
                כאן
              </a>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsletterPopup;
