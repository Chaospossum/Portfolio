import type { CSSProperties } from "react";
import portraitUrl from "@/assets/portrait.webp";
import { useT } from "./i18n";
import { Wrap, useInView } from "./lab";
import { RoseCurve } from "./retro";

const TV_URL = "https://www.science.lu/de/kandidaten-portrait-staffel-1/take-kandidatin-nicole-duque-im-interview";

/* A solid colour field: ink block, paper type, duotone portrait. */
export function About() {
  const t = useT();
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-heading"
      className={`border-b-2 border-ink bg-field text-field-ink ${inView ? "is-in" : ""}`}
      style={{ "--signal": "var(--field-signal)" } as CSSProperties}
    >
      <Wrap className="py-14 sm:py-20">
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-2">
            <span aria-hidden="true" className="numeral block text-[4.5rem] sm:text-[6rem]">
              03
            </span>
            <RoseCurve k={5} draw className="mt-6 hidden w-28 lg:block" />
          </div>

          <div className="lg:col-span-6">
            <h2 id="about-heading" className="font-display text-[1.75rem] uppercase leading-[1.05] sm:text-[2.5rem]">
              {t("about.title")}
            </h2>
            <div className="mt-8 max-w-[58ch] space-y-5 text-[1.1875rem] leading-[1.5]">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>
                {t("about.tv.a")}
                <a className="link" href={TV_URL} target="_blank" rel="noreferrer">
                  {t("about.tv.link")}
                </a>
                .
              </p>
            </div>
            <p className="label-md mt-10 max-w-[46ch] border-t border-current pt-4 leading-[1.7]">{t("about.langs")}</p>
          </div>

          <figure className="lg:col-span-4 lg:pl-8">
            <div className="relative mx-auto w-full max-w-[300px] bg-field lg:ml-auto lg:mr-0">
              <img
                src={portraitUrl}
                alt=""
                width={411}
                height={409}
                loading="lazy"
                className="duotone block w-full"
              />
              {/* halftone overlay, so the photo reads as a printed duotone */}
              <span aria-hidden="true" className="halftone pointer-events-none absolute inset-0" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 border-2 border-current" />
            </div>
          </figure>
        </div>
      </Wrap>
    </section>
  );
}
