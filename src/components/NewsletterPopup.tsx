"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const STORAGE_KEY = "newsletter-dismissed";

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [sending, setSending] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const [website, setWebsite] = useState("");

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // storage blocked: still show the popup once per page view
    }

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= 0.5) {
        setIsOpen(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
  };

  // Move focus into the dialog when it opens, and close it on Escape
  useEffect(() => {
    if (!isOpen) return;
    emailRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage({ type: "error", text: "נא להזין כתובת מייל" });
      return;
    }
    if (!agreed) {
      setMessage({ type: "error", text: "נא לאשר את מדיניות הפרטיות" });
      return;
    }
    setSending(true);
    setMessage(null);
    try {
      const res = await fetch("/api/newsletter-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        setMessage({ type: "error", text: data.error || "שליחה נכשלה, נסו שוב" });
        return;
      }
      setMessage({ type: "success", text: "נרשמת בהצלחה לרשימת התפוצה" });
      setTimeout(handleClose, 1500);
    } catch {
      setMessage({ type: "error", text: "שליחה נכשלה, נסו שוב" });
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-[var(--color-foreground)]/40 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-title"
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
          <h3 id="newsletter-title" className="headline-section text-xl md:text-2xl mb-2">הישארו מחוברים</h3>
          <p className="body-text text-sm md:text-base">
            הצטרפו כדי לקבל תרגילים, תכנים והשראה
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot field, hidden from people */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="absolute h-px w-px overflow-hidden opacity-0 pointer-events-none"
          />
          <input
            ref={emailRef}
            type="email"
            placeholder="כתובת מייל"
            aria-label="כתובת מייל"
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
            disabled={sending}
            className="cta-button w-full justify-center rounded-lg disabled:opacity-60"
          >
            {sending ? "שולח..." : "הרשמה"}
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
