import { useT } from "./i18n";
import { SectionHead, Wrap } from "./lab";
import { OrbitDiagram } from "./retro";

type Row = { date: string; title: string; org?: string; note?: string };

const TV_URL = "https://www.science.lu/de/kandidaten-portrait-staffel-1/take-kandidatin-nicole-duque-im-interview";

/* A vertical ruler: entries hang off a rule with a tick at each one. */
function Track({ heading, rows }: { heading: string; rows: Row[] }) {
  return (
    <div>
      <h3 className="font-display border-b-2 border-ink pb-3 text-[1rem] uppercase">{heading}</h3>
      <ol className="ml-2 border-l border-ink">
        {rows.map((r, i) => (
          <li key={i} className="relative py-5 pl-7">
            <span aria-hidden="true" className="absolute left-0 top-[1.85rem] h-px w-4 bg-ink" />
            <span aria-hidden="true" className="absolute -left-[5px] top-[1.55rem] h-[9px] w-[9px] bg-signal" />
            <p className="label-md text-signal">{r.date}</p>
            <p className="mt-1.5 text-[1.25rem] leading-[1.3]">{r.title}</p>
            {r.org ? <p className="mt-0.5 text-[1.0625rem] italic text-muted-ink">{r.org}</p> : null}
            {r.note ? <p className="mt-2 max-w-[48ch] text-base leading-snug">{r.note}</p> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Experience() {
  const t = useT();
  const experience: Row[] = ["e1", "e3", "e4", "e5", "e6"].map((k) => ({
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
  const certs = [t("exp.cert1"), t("exp.cert2"), t("exp.cert3")];

  return (
    <section id="experience" aria-labelledby="experience-heading" className="border-b-2 border-ink">
      <Wrap className="py-14 sm:py-20">
        <SectionHead
          n="04"
          id="experience-heading"
          aside={<OrbitDiagram className="ml-auto hidden w-full max-w-[340px] lg:block" />}
        >
          {t("exp.title.a")}
          <br />
          <span className="font-body text-[1.5em] normal-case italic">{t("exp.title.b")}</span>
        </SectionHead>

        <div className="mt-12 grid gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:col-start-3">
            <Track heading={t("exp.experience")} rows={experience} />
          </div>
          <div className="lg:col-span-5">
            <Track heading={t("exp.education")} rows={education} />
          </div>
        </div>

        <div className="mt-14 grid gap-x-8 lg:grid-cols-12">
          <div className="lg:col-span-10 lg:col-start-3">
            <h3 className="font-display border-b-2 border-ink pb-3 text-[1rem] uppercase">{t("exp.cert")}</h3>
            <ol className="ruled">
              {[...certs, null].map((c, i) => (
                <li key={i} className="grid grid-cols-[3rem_1fr] gap-4 py-4 sm:grid-cols-[4rem_1fr]">
                  <span aria-hidden="true" className="numeral text-[1.5rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-[70ch] text-[1.0625rem] leading-[1.5]">
                    {c ?? (
                      <>
                        {t("exp.cert4a")}
                        <a className="link" href={TV_URL} target="_blank" rel="noreferrer">
                          {t("exp.cert4link")}
                        </a>
                        {t("exp.cert4b")}
                      </>
                    )}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
