// ההרשמה לסבב הנוכחי של IN/OUT (פיילוט 2) נסגרת במוצאי שבת 21.11.2026 ב-21:00 שעון ישראל.
// אחרי השעה הזאת הדף מציג הודעת סגירה וטופס להשארת פרטים לסבב הבא.
export const SIGNUP_CLOSES_AT = new Date("2026-11-21T21:00:00+02:00");

export const isSignupClosed = (now: Date = new Date()) => now >= SIGNUP_CLOSES_AT;
