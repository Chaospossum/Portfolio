import { ACCENTS } from "./lab";
import { useT } from "./i18n";

export function About() {
  const t = useT();
  return (
    <section id="about" aria-labelledby="about-heading" className="border-b border-rule">
      <div className="mx-auto max-w-[960px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
          <span
            aria-hidden="true"
            className="inline-block h-[7px] w-[7px] rounded-full"
            style={{ background: ACCENTS.purple }}
          />
          {t("about.plate")}
        </div>
        <h2
          id="about-heading"
          className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
        >
          {t("about.title")}<span className="italic" style={{ color: ACCENTS.purple }}>.</span>
        </h2>

        <div className="mt-8 max-w-[62ch] space-y-5 font-body text-base leading-relaxed text-ink">
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
        </div>

        <p className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-ink">
          {t("about.langs")}
        </p>

        <p className="mt-6 max-w-[62ch] font-body text-base leading-relaxed text-ink">
          {t("about.tv.a")}
          <a
            className="text-okabe-blue underline decoration-okabe-blue/40 underline-offset-2 hover:decoration-okabe-blue focus-visible:outline-2 focus-visible:outline-okabe-blue"
            href="https://www.science.lu/de/kandidaten-portrait-staffel-1/take-kandidatin-nicole-duque-im-interview"
            target="_blank"
            rel="noreferrer"
          >
            {t("about.tv.link")}
          </a>
          .
        </p>

        <p className="mt-4 max-w-[62ch] font-body text-base leading-relaxed text-muted-ink">
          {t("about.outside")}
        </p>
      </div>
    </section>
  );
}