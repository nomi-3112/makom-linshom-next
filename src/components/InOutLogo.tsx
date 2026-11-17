// לוגו IN/OUT: שני חצים מעוגלים שסוגרים מעגל, IN למעלה ו-OUT למטה.
// הגרסה המהודקת של כיוון 2 (אושרה 17.11.2026).

const GREEN = "#41624c";
const GREEN_TEXT = "#33503c";
const TERRA = "#ba835e";
const TERRA_TEXT = "#a5704c";
const DIVIDER = "#d6bc98";

const textStyle = { fontFamily: "var(--font-display)" };

export default function InOutLogo({ size = 190, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      role="img"
      aria-label="IN/OUT"
      className={className}
    >
      <path d="M35.88 102.12 A86 86 0 0 1 204.12 102.12" fill="none" stroke={GREEN} strokeWidth="8" strokeLinecap="round" />
      <path
        d="M-13 -9 L3 0 L-13 9 Z"
        fill={GREEN}
        stroke={GREEN}
        strokeWidth="3"
        strokeLinejoin="round"
        transform="translate(204.12 102.12) rotate(78)"
      />
      <path d="M204.12 137.88 A86 86 0 0 1 35.88 137.88" fill="none" stroke={TERRA} strokeWidth="8" strokeLinecap="round" />
      <path
        d="M-13 -9 L3 0 L-13 9 Z"
        fill={TERRA}
        stroke={TERRA}
        strokeWidth="3"
        strokeLinejoin="round"
        transform="translate(35.88 137.88) rotate(258)"
      />
      <text x="120" y="110" textAnchor="middle" fontSize="46" fontWeight="900" letterSpacing="2" fill={GREEN_TEXT} style={textStyle}>
        IN
      </text>
      <line x1="98" y1="122" x2="142" y2="122" stroke={DIVIDER} strokeWidth="2" strokeLinecap="round" />
      <text x="120" y="160" textAnchor="middle" fontSize="46" fontWeight="900" letterSpacing="2" fill={TERRA_TEXT} style={textStyle}>
        OUT
      </text>
    </svg>
  );
}
