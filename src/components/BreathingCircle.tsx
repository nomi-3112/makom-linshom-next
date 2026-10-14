"use client";

import { useEffect, useState } from "react";

/** Coherent breathing: 5.5s in, 5.5s out (~5.5 breaths a minute). */
const HALF_BREATH_MS = 5500;

/**
 * A soft, translucent circle that breathes a few slow breaths,
 * with "לשאוף / לנשוף" under it, then rests.
 */
const BreathingCircle = ({ breaths = 3 }: { breaths?: number }) => {
  const total = breaths * 2;
  const [phase, setPhase] = useState(0); // 0..total-1 = in/out, total = done

  useEffect(() => {
    if (phase >= total) return;
    const t = setTimeout(() => setPhase((p) => p + 1), HALF_BREATH_MS);
    return () => clearTimeout(t);
  }, [phase, total]);

  const done = phase >= total;
  const anim = { animationIterationCount: breaths, animationDuration: `${HALF_BREATH_MS * 2}ms` };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-40 w-40" aria-hidden="true">
        <span className={`breath-fill absolute inset-0 rounded-full ${done ? "" : "breathing"}`} style={done ? undefined : anim} />
        <span className={`breath-halo absolute inset-0 rounded-full ${done ? "" : "breathing"}`} style={done ? undefined : anim} />
      </div>
      <p className="h-10 text-3xl" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }} aria-live="polite">
        {!done && (
          <span key={phase} className="breath-word inline-block">
            {phase % 2 === 0 ? "לשאוף" : "לנשוף"}
          </span>
        )}
      </p>
    </div>
  );
};

export default BreathingCircle;
