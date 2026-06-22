import { useT } from "./i18n";

type Row = { date: string; title: string; org?: string; note?: string };

const ACCENT = {
  blue: "var(--color-okabe-blue)",
  orange: "var(--color-okabe-orange)",
  vermillion: "var(--color-vermillion)",
};

function List({ rows }: { rows: Row[] }) {
  return (
    <ul className="border-t border-rule">
      {rows.map((r, i) => (
        <li key={i} className="grid gap-1 border-b border-rule py-5 sm:grid-cols-[180px_1fr] sm:gap-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-ink">
            {r.date}
          </p>
          <div>
            <p className="font-body text-base font-medium text-ink">{r.title}</p>
            {r.org && (
              <p className="font-body text-sm text-muted-ink">{r.org}</p>
            )}
            {r.note && (
              <p className="mt-2 max-w-[62ch] font-body text-sm leading-relaxed text-ink">
                {r.note}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Experience() {
  const t = useT();
  const experience: Row[] = ["e1", "e2", "e3", "e4", "e5", "e6"].map((k) => ({
    date: t(`exp.${k}.date`),
    title: t(`exp.${k}.title`),
    org: t(`exp.${k}.org`),
    note: k === "e1" ? t("exp.e1.note") : undefined,
  }));
  const education: Row[] = ["ed1", "ed2", "ed3", "ed4", "ed5"].map((k) => ({
    date: t(`exp.${k}.date`),
    title: t(`exp.${k}.title`),
    org: t(`exp.${k}.org`),
  }));
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-b border-rule"
    >
      <div className="mx-auto max-w-[960px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
          <span
            aria-hidden="true"
            className="inline-block h-[7px] w-[7px] rounded-full"
            style={{ background: ACCENT.blue }}
          />
          {t("exp.plate")}
        </div>
        <h2
          id="experience-heading"
          className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
        >
          {t("exp.title.a")} <span className="italic" style={{ color: ACCENT.blue }}>{t("exp.title.b")}</span>
        </h2>

        <div className="mt-10">
          <h3 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
            <span
              aria-hidden="true"
              className="inline-block h-[6px] w-[6px] rounded-full"
              style={{ background: ACCENT.blue }}
            />
            {t("exp.experience")}
          </h3>
          <List rows={experience} />
        </div>

        <div className="mt-12">
          <h3 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
            <span
              aria-hidden="true"
              className="inline-block h-[6px] w-[6px] rounded-full"
              style={{ background: ACCENT.orange }}
            />
            {t("exp.education")}
          </h3>
          <List rows={education} />
        </div>

        <div className="mt-12">
          <h3 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
            <span
              aria-hidden="true"
              className="inline-block h-[6px] w-[6px] rounded-full"
              style={{ background: ACCENT.vermillion }}
            />
            {t("exp.cert")}
          </h3>
          <ul className="mt-4 space-y-3 font-body text-base leading-relaxed text-ink">
            <li>{t("exp.cert1")}</li>
            <li>{t("exp.cert2")}</li>
            <li>{t("exp.cert3")}</li>
            <li>
              {t("exp.cert4a")}
              <a
                className="text-okabe-blue underline decoration-okabe-blue/40 underline-offset-2 hover:decoration-okabe-blue focus-visible:outline-2 focus-visible:outline-okabe-blue"
                href="https://www.science.lu/de/kandidaten-portrait-staffel-1/take-kandidatin-nicole-duque-im-interview"
                target="_blank"
                rel="noreferrer"
              >
                {t("exp.cert4link")}
              </a>
              {t("exp.cert4b")}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}