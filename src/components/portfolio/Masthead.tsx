import { useT } from "./i18n";
import { Wrap } from "./lab";
import { HalftoneSun, Ruler } from "./retro";

export function Masthead() {
  const t = useT();
  const kickers = [t("mast.kicker.1"), t("mast.kicker.2"), t("mast.kicker.3"), t("mast.kicker.4")];
  return (
    <section id="top" className="relative overflow-hidden border-b-2 border-ink">
      <Wrap>
        <div className="grid gap-x-8 pt-8 lg:grid-cols-12 lg:pt-14">
          {/* rotated side label, desktop only */}
          <div className="hidden lg:col-span-1 lg:flex lg:items-end lg:pb-2">
            <span className="vert label-md text-muted-ink">{t("mast.plate")}</span>
          </div>

          {/* planet: first on phones so it sits above the name, bleeding right */}
          <div className="-mr-10 ml-auto w-[68%] max-w-[360px] sm:-mr-16 sm:w-[52%] lg:order-2 lg:col-span-5 lg:mr-0 lg:w-full lg:max-w-none lg:self-center">
            <HalftoneSun className="block w-full" />
          </div>

          <div className="lg:order-1 lg:col-span-6 lg:self-center">
            <h1 className="font-display uppercase leading-[0.98] text-[clamp(2.5rem,8.1vw,7.25rem)]">
              <span className="block">Nicole</span>
              <span className="block text-signal">Duque</span>
            </h1>
            <p className="mt-8 max-w-[44ch] text-[1.25rem] leading-[1.45] sm:text-[1.375rem]">{t("mast.intro")}</p>
            <a href="#contact" className="link mt-7 inline-block text-[1.125rem] italic">
              {t("mast.available")} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* index strip: four numbered fields, like a mission patch legend */}
        <ol className="mt-12 grid grid-cols-2 gap-x-6 border-t-2 border-ink lg:mt-16 lg:grid-cols-4">
          {kickers.map((k, i) => (
            <li key={k} className="border-b border-rule py-4 lg:border-b-0">
              <span aria-hidden="true" className="numeral block text-[1.75rem]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="label-md mt-3 block text-ink">{k}</span>
            </li>
          ))}
        </ol>
      </Wrap>
      <Ruler units={120} className="mt-2 text-ink" />
    </section>
  );
}
