import { useEffect, useRef, useState, type ReactNode } from "react";

export const ACCENTS = {
  vermillion: "var(--color-vermillion)",
  blue: "var(--color-okabe-blue)",
  green: "var(--color-okabe-green)",
  orange: "var(--color-okabe-orange)",
  purple: "var(--color-okabe-purple)",
} as const;

export type AccentKey = keyof typeof ACCENTS;

/**
 * Lab-report style "plate" header. Used to label sections and figures
 * with a colored bullet and monospace caption, like a scientific figure.
 */
export function Plate({
  number,
  label,
  accent = "vermillion",
  caption,
}: {
  number: string;
  label: string;
  accent?: AccentKey;
  caption?: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em]">
      <span className="flex items-center gap-2 text-ink">
        <span
          aria-hidden="true"
          className="inline-block h-[7px] w-[7px] rounded-full"
          style={{ background: ACCENTS[accent] }}
        />
        PLATE {number}
      </span>
      <span className="text-muted-ink">/ {label}</span>
      {caption ? <span className="text-muted-ink">— {caption}</span> : null}
    </div>
  );
}

/** Crosshair corner marks, like registration ticks on print plates. */
export function CornerMarks({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {(["tl", "tr", "bl", "br"] as const).map((pos) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`pointer-events-none absolute h-3 w-3 border-ink ${
            pos === "tl"
              ? "left-0 top-0 border-l border-t"
              : pos === "tr"
                ? "right-0 top-0 border-r border-t"
                : pos === "bl"
                  ? "bottom-0 left-0 border-b border-l"
                  : "bottom-0 right-0 border-b border-r"
          }`}
        />
      ))}
      {children}
    </div>
  );
}

/** IntersectionObserver-driven reveal. Respects prefers-reduced-motion. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 600ms ease-out ${delay}ms, transform 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}