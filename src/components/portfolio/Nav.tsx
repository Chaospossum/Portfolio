import { useEffect, useState } from "react";
import { useSettings } from "./i18n";
import { useActiveSection } from "./lab";

const SECTIONS = ["top", "work", "about", "experience", "contact"];

/* One sharp peak per section, with M+1 / M+2 isotope side-peaks for texture. */
const PEAKS = [
  { id: "work", key: "nav.work", x: 0.12, h: 30 },
  { id: "about", key: "nav.about", x: 0.36, h: 22 },
  { id: "experience", key: "nav.experience", x: 0.62, h: 27 },
  { id: "contact", key: "nav.contact", x: 0.88, h: 20 },
];

/** Site mark: the hero's planet and orbit at glyph size. */
function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-16 -16 32 32" className={className} aria-hidden="true">
      <circle r="7.5" fill="var(--signal)" />
      <ellipse rx="14" ry="4.5" fill="none" stroke="var(--ink)" strokeWidth="1.6" transform="rotate(-22)" />
      <circle cx="10.5" cy="-8.5" r="2.2" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.4" />
    </svg>
  );
}

/** The mass-spectrum navigation: an m/z axis with one peak per section. */
function Spectrum({ width, active, labels = true }: { width: number; active: string | null; labels?: boolean }) {
  const { t } = useSettings();
  const B = 44; // baseline
  const peak = (x: number, h: number) => `M${x - 2.6} ${B} L${x} ${B - h} L${x + 2.6} ${B} Z`;
  const ticks = Math.floor(width / 8);
  const act = PEAKS.find((p) => p.id === active);
  return (
    <svg viewBox={`0 0 ${width} 48`} width={width} height="48" className="block h-auto max-w-full">
      {/* m/z axis */}
      <g stroke="var(--ink)" strokeWidth="1" shapeRendering="crispEdges" aria-hidden="true">
        <line x1="0" y1={B + 0.5} x2={width} y2={B + 0.5} />
        {Array.from({ length: ticks + 1 }, (_, i) => (
          <line key={i} x1={i * 8 + 0.5} y1={B + 1} x2={i * 8 + 0.5} y2={i % 5 === 0 ? B + 4 : B + 2.5} />
        ))}
      </g>
      {/* detector cursor slides to the active peak */}
      <line
        className="detector"
        x1="0"
        y1="4"
        x2="0"
        y2={B}
        aria-hidden="true"
        style={{ transform: `translateX(${act ? act.x * width : 0}px)`, opacity: act ? 1 : 0 }}
      />
      {PEAKS.map((p) => {
        const x = p.x * width;
        const label = t(p.key);
        return (
          <a
            key={p.id}
            href={`#${p.id}`}
            className="peak-link"
            aria-label={label}
            aria-current={active === p.id ? "true" : undefined}
          >
            <rect className="peak-hit" x={x - 34} y="0" width="68" height="48" fill="transparent" stroke="none" />
            <g stroke="var(--ink)" strokeWidth="1" opacity="0.7" aria-hidden="true">
              <line x1={x + 6} y1={B} x2={x + 6} y2={B - p.h * 0.32} />
              <line x1={x + 11} y1={B} x2={x + 11} y2={B - p.h * 0.1} />
            </g>
            <path className="peak" d={peak(x, p.h)} />
            {labels ? (
              <text className="peak-label" x={x} y="12" textAnchor="middle">
                {label}
              </text>
            ) : null}
          </a>
        );
      })}
    </svg>
  );
}

/** Menu glyph for phones: a tiny four-peak spectrum. */
function MiniSpectrum({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 16" className={className} aria-hidden="true">
      <line x1="0" y1="15.5" x2="40" y2="15.5" stroke="currentColor" strokeWidth="1" />
      {[
        [6, 13],
        [15, 9],
        [25, 12],
        [34, 8],
      ].map(([x, h]) => (
        <path key={x} d={`M${x - 1.8} 15 L${x} ${15 - h} L${x + 1.8} 15 Z`} fill="currentColor" />
      ))}
    </svg>
  );
}

/** Instrument switches: a two-position slide for the language, a rotary knob for the theme. */
function Switches({ compact = false }: { compact?: boolean }) {
  const { t, locale, setLocale, theme, setTheme } = useSettings();
  return (
    <div className="flex items-center gap-5">
      <div role="group" aria-label={t("nav.lang")} className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setLocale("en")}
          aria-pressed={locale === "en"}
          className={`label-md py-1 ${locale === "en" ? "text-ink" : "text-muted-ink hover:text-signal"}`}
        >
          EN
        </button>
        <span aria-hidden="true" className="slide-track">
          <span className="slide-knob" style={{ transform: `translateX(${locale === "fr" ? 20 : 0}px)` }} />
        </span>
        <button
          type="button"
          onClick={() => setLocale("fr")}
          aria-pressed={locale === "fr"}
          className={`label-md py-1 ${locale === "fr" ? "text-ink" : "text-muted-ink hover:text-signal"}`}
        >
          FR
        </button>
      </div>
      <button
        type="button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label={theme === "dark" ? t("nav.theme.light") : t("nav.theme.dark")}
        aria-pressed={theme === "dark"}
        className="flex h-9 items-center gap-2 text-ink hover:text-signal"
      >
        <svg viewBox="-14 -14 28 28" className="h-7 w-7" aria-hidden="true">
          {/* scale marks: light at 10 o'clock, dark at 2 o'clock */}
          <g stroke="currentColor" strokeWidth="1.2">
            <line x1="-9.5" y1="-9.5" x2="-7.5" y2="-7.5" />
            <line x1="9.5" y1="-9.5" x2="7.5" y2="-7.5" />
          </g>
          <circle r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <g className="knob" style={{ transform: `rotate(${theme === "dark" ? 45 : -45}deg)` }}>
            <line x1="0" y1="-1" x2="0" y2="-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        </svg>
        {compact ? <span className="label-md">{theme === "dark" ? t("nav.theme.light") : t("nav.theme.dark")}</span> : null}
      </button>
    </div>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const { t } = useSettings();
  const active = useActiveSection(SECTIONS);

  const links = [
    { href: "#work", label: t("nav.work") },
    { href: "#about", label: t("nav.about") },
    { href: "#experience", label: t("nav.experience") },
    { href: "#contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="instrument sticky top-0 z-40 bg-paper">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-5 py-1.5 sm:px-10">
        <a href="#top" aria-label="Nicole Duque, home" className="mark flex h-9 w-9 shrink-0 items-center justify-center">
          <Mark className="h-8 w-8" />
        </a>
        <nav className="hidden min-w-0 flex-1 justify-center md:flex" aria-label="Primary">
          <Spectrum width={600} active={active} />
        </nav>
        <div className="hidden md:block">
          <Switches />
        </div>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t("nav.close") : t("nav.menu")}
          onClick={() => setOpen((v) => !v)}
          className="label-md flex items-center gap-2 py-2 text-ink md:hidden"
        >
          <MiniSpectrum className="h-4 w-10" />
          {open ? t("nav.close") : t("nav.menu")}
        </button>
      </div>
      {open && (
        <div id="mobile-menu" className="border-t border-ink md:hidden">
          <nav className="ruled mx-auto flex max-w-[1320px] flex-col px-5" aria-label="Mobile">
            <div className="py-4" aria-hidden="true">
              <Spectrum width={350} active={active} />
            </div>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display py-4 text-base uppercase text-ink hover:text-signal"
              >
                {l.label}
              </a>
            ))}
            <div className="py-4">
              <Switches compact />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
