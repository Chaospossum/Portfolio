import { ACCENTS } from "./lab";
import { useT } from "./i18n";

export function Masthead() {
  const t = useT();
  const KICKER = [
    { word: t("mast.kicker.1"), color: ACCENTS.vermillion },
    { word: t("mast.kicker.2"), color: ACCENTS.blue },
    { word: t("mast.kicker.3"), color: ACCENTS.green },
    { word: t("mast.kicker.4"), color: ACCENTS.orange },
  ];
  return (
    <section id="top" className="relative overflow-hidden border-b border-rule">
      <div
        aria-hidden="true"
        className="lab-grid lab-grid-fade pointer-events-none absolute inset-0 opacity-40"
      />
      <div className="relative mx-auto max-w-[960px] px-5 pt-12 pb-14 sm:px-8 sm:pt-16 sm:pb-20">
        {/* Plate stamp, top row */}
        <div className="flex items-baseline justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-ink">
          <span className="flex items-center gap-2 text-ink">
            <span
              aria-hidden="true"
              className="inline-block h-[7px] w-[7px] rounded-full"
              style={{ background: ACCENTS.vermillion }}
            />
              {t("mast.plate")}
          </span>
          <span className="hidden sm:inline">N. DUQUE — 2026</span>
        </div>

        {/* Ticker kicker with colored bullets */}
        <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
          {KICKER.map((k) => (
            <li key={k.word} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-[6px] w-[6px] rounded-full"
                style={{ background: k.color }}
              />
              {k.word}
            </li>
          ))}
        </ul>

        {/* Name: mixed weight, last word italic for typographic tension */}
        <h1 className="mt-8 font-display leading-[0.92] tracking-[-0.025em] text-ink">
          <span className="block text-[3rem] font-light sm:text-[5rem]">Nicole</span>
          <span className="block text-[3.75rem] font-black italic sm:text-[7rem]">
            Duque<span style={{ color: ACCENTS.vermillion }}>.</span>
          </span>
        </h1>

        <div className="mt-10 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <p className="max-w-[58ch] font-body text-base leading-relaxed text-ink sm:text-lg">
            {t("mast.intro")}
          </p>
          <div className="flex shrink-0 items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-ink">
            <span
              aria-hidden="true"
              className="inline-block h-[6px] w-[6px] rounded-full"
              style={{ background: ACCENTS.green }}
            />
            <span>{t("mast.available")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}