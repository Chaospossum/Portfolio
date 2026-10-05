import { useT } from "./i18n";
import { Wrap } from "./lab";
import { IonPath, RegMark, Ruler } from "./retro";

export function Contact() {
  const t = useT();
  const year = new Date().getFullYear();
  const rows = [
    { k: t("contact.email"), v: "duqni042@gmail.com", href: "mailto:duqni042@gmail.com" },
    { k: t("contact.linkedin"), v: "nicole-duque-fernandez", href: "https://www.linkedin.com/in/nicole-duque-fernandez/" },
    { k: t("contact.github"), v: "Chaospossum", href: "https://github.com/Chaospossum" },
  ];
  return (
    <>
      <section id="contact" aria-labelledby="contact-heading">
        <Wrap className="py-14 sm:py-20">
          <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-2">
              <span aria-hidden="true" className="numeral block text-[4.5rem] sm:text-[6rem]">
                05
              </span>
            </div>
            <div className="lg:col-span-6">
              <h2 id="contact-heading" className="font-display text-[2rem] uppercase leading-[1.02] sm:text-[3.25rem]">
                {t("contact.title.a")}
                <br />
                <span className="text-signal">{t("contact.title.b")}</span>
              </h2>
              <p className="mt-6 max-w-[44ch] text-[1.1875rem] leading-[1.5]">{t("contact.lede")}</p>
              <ul className="ruled mt-10 border-y border-rule">
                {rows.map((c) => (
                  <li key={c.k} className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:items-baseline">
                    <span className="label-md text-muted-ink">{c.k}</span>
                    <a
                      className="link break-all text-[1.375rem] leading-tight sm:text-[1.75rem]"
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
            <div className="lg:col-span-4 lg:self-end">
              <IonPath className="w-full max-w-[420px] lg:ml-auto" />
            </div>
          </div>
        </Wrap>
      </section>
      <footer className="border-t-2 border-ink">
        <Ruler units={120} className="text-ink" />
        <Wrap className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-6">
          <span className="label-md flex items-center gap-3">
            <RegMark className="h-5 w-5 text-signal" />
            Nicole Duque
          </span>
          <span className="label-md text-muted-ink">Luxembourg</span>
          <span className="label-md text-muted-ink">{year}</span>
        </Wrap>
      </footer>
    </>
  );
}
