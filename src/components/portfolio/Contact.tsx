import { ACCENTS } from "./lab";
import { useT } from "./i18n";

export function Contact() {
  const t = useT();
  const year = new Date().getFullYear();
  return (
    <>
      <section id="contact" aria-labelledby="contact-heading">
        <div className="mx-auto max-w-[960px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
            <span
              aria-hidden="true"
              className="inline-block h-[7px] w-[7px] rounded-full"
              style={{ background: ACCENTS.orange }}
            />
            {t("contact.plate")}
          </div>
          <h2
            id="contact-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            {t("contact.title.a")} <span className="italic" style={{ color: ACCENTS.orange }}>{t("contact.title.b")}</span>
          </h2>
          <p className="mt-6 max-w-[62ch] font-body text-base leading-relaxed text-ink">
            {t("contact.lede")}
          </p>
          <ul className="mt-8 grid gap-3 font-mono text-sm sm:grid-cols-3">
            {[
              { k: t("contact.email"), v: "duqni042@gmail.com", href: "mailto:duqni042@gmail.com" },
              {
                k: t("contact.linkedin"),
                v: "nicole-duque-fernandez",
                href: "https://www.linkedin.com/in/nicole-duque-fernandez/",
              },
              { k: t("contact.github"), v: "Chaospossum", href: "https://github.com/Chaospossum" },
            ].map((c) => (
              <li key={c.k} className="border border-rule p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-ink">
                  {c.k}
                </p>
                <a
                  className="mt-2 block break-all text-ink underline decoration-rule underline-offset-2 hover:decoration-okabe-blue hover:text-okabe-blue focus-visible:outline-2 focus-visible:outline-okabe-blue"
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  {c.v}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <footer className="border-t border-rule">
        <div className="mx-auto flex max-w-[960px] flex-col items-start justify-between gap-2 px-5 py-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-ink sm:flex-row sm:px-8">
          <span>NICOLE DUQUE</span>
          <span>LUXEMBOURG</span>
          <span>{year}</span>
        </div>
      </footer>
    </>
  );
}