import { useEffect, useRef, useState, type ReactNode } from "react";

/* Files in /public, resolved against the deploy base path. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

/** Page gutter: wide editorial measure, 20px gutter on phones. */
export function Wrap({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-10 ${className}`}>{children}</div>;
}

/**
 * Section opener: a large flat-ink numeral beside the heading, like a plate
 * number in a specimen book. The numeral is decorative; the heading is real.
 */
export function SectionHead({
  n,
  id,
  children,
  aside,
}: {
  n: string;
  id: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="grid gap-x-8 gap-y-6 lg:grid-cols-12">
      <div className="lg:col-span-2">
        <span aria-hidden="true" className="numeral block text-[4.5rem] sm:text-[6rem]">
          {n}
        </span>
      </div>
      <h2 id={id} className="font-display text-[1.75rem] uppercase leading-[1.05] sm:text-[2.5rem] lg:col-span-6">
        {children}
      </h2>
      {aside ? <div className="lg:col-span-4">{aside}</div> : null}
    </div>
  );
}

/**
 * Project metadata. The source string separates entries with three spaces and
 * uses "KEY: value" pairs; render them as a ruled key/value table.
 */
export function MetaTable({ text }: { text: string }) {
  const entries = text.split(/\s{3,}/).map((e) => e.trim()).filter(Boolean);
  return (
    <dl className="ruled border-y border-rule">
      {entries.map((e) => {
        const m = e.match(/^([^:]{1,40})\s?:\s*(.+)$/);
        return (
          <div key={e} className="grid grid-cols-[7.5rem_1fr] gap-3 py-1.5 sm:grid-cols-[9rem_1fr]">
            <dt className="label pt-[3px] text-muted-ink">{m ? m[1] : ""}</dt>
            <dd className="text-base leading-snug">{m ? m[2] : e}</dd>
          </div>
        );
      })}
    </dl>
  );
}

/** A printed plate: ink frame, signal second pass, italic caption. */
export function Figure({
  src,
  alt,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="plate">
        <img src={asset(src)} alt={alt} loading="lazy" />
      </div>
      <figcaption className="mt-5 text-base italic leading-snug text-muted-ink">{caption}</figcaption>
    </figure>
  );
}

/** A document link: small specimen label with an arrow, no button chrome. */
export function DocLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="link label-md inline-block">
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}

/** True once the element has scrolled into view (one-shot). SSR-safe. */
export function useInView<T extends HTMLElement>(margin = "0px 0px -15% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return { ref, inView };
}
