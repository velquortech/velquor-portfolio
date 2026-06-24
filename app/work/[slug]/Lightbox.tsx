"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type LightboxImage = { src: string; alt: string };

const LightboxContext = createContext<(img: LightboxImage) => void>(() => {});

/**
 * Wraps the project article so any descendant {@link ZoomTrigger} can open a
 * full-screen, full-scale view of its image. The overlay scales the image to
 * fit the viewport (object-contain) while preserving its aspect ratio.
 */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<LightboxImage | null>(null);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close]);

  return (
    <LightboxContext.Provider value={setActive}>
      {children}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8 animate-lightbox-in"
        >
          <button
            type="button"
            aria-label="Close image"
            onClick={close}
            className="absolute top-5 right-5 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-s1 border border-hairline text-ink hover:border-hairline-hover transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3 3L13 13M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[95vw] h-[88vh] animate-lightbox-zoom"
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="95vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </LightboxContext.Provider>
  );
}

/**
 * A transparent, absolutely-positioned click target that opens the lightbox.
 * Render it as the last child of a `relative` image container so it sits above
 * the image and any tint overlays without altering how they render.
 */
export function ZoomTrigger({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label?: string;
}) {
  const open = useContext(LightboxContext);
  return (
    <button
      type="button"
      onClick={() => open({ src, alt })}
      aria-label={label ?? `View full image: ${alt}`}
      className="group absolute inset-0 z-20 flex items-end justify-end p-3 cursor-zoom-in bg-transparent border-0"
    >
      <span
        aria-hidden
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/55 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <circle cx="6.5" cy="6.5" r="4.6" stroke="currentColor" strokeWidth="1.4" />
          <path d="M10 10L13.5 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M6.5 4.5V8.5M4.5 6.5H8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </span>
    </button>
  );
}
