"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { onScrollFrame, prefersReducedMotion } from "@/lib/motion";

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  /** How strongly the image drifts relative to the scroll. */
  strength?: number;
};

/** An image that moves slightly slower than the page, inside a clipped frame. */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  strength = 0.12,
}: ParallaxImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const layer = layerRef.current;
    if (!frame || !layer || prefersReducedMotion()) return;

    return onScrollFrame(() => {
      const box = frame.getBoundingClientRect();
      const vh = window.innerHeight;
      if (box.bottom < 0 || box.top > vh) return;
      const max = box.height * 0.1; // the image has 10% spare height above and below
      const raw = (box.top + box.height / 2 - vh / 2) * -strength;
      const offset = Math.max(-max, Math.min(max, raw));
      layer.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
  }, [strength]);

  return (
    <div ref={frameRef} className={`relative overflow-hidden ${className}`}>
      <div ref={layerRef} className="absolute inset-x-0 -top-[10%] h-[120%] will-change-transform">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}
