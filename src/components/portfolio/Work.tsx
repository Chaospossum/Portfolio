import type { ReactNode } from "react";
import { ACCENTS, type AccentKey, Reveal } from "./lab";
import { useT } from "./i18n";

// Thesis PDF lives in /public and is served from the deploy base path
// (e.g. /<repo>/ on GitHub Pages), so build the URL from BASE_URL.
const thesisUrl = `${import.meta.env.BASE_URL}Training-for-Robustness-Nicole-Duque.pdf`;

// Files in /public/work, resolved against the same base path.
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

function DocLink({ href, accent, children }: { href: string; accent: AccentKey; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 border border-rule px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink hover:border-ink hover:text-vermillion focus-visible:outline-2 focus-visible:outline-okabe-blue"
    >
      <span aria-hidden="true" className="inline-block h-[6px] w-[6px] rounded-full" style={{ background: ACCENTS[accent] }} />
      {children} ↗
    </a>
  );
}

function Block({
  meta,
  title,
  figure,
  accent,
  footnote,
  image,
  docs,
  children,
}: {
  meta: string;
  title: string;
  figure: string;
  accent: AccentKey;
  footnote?: string;
  image?: { src: string; alt: string; caption: string };
  docs?: { href: string; label: string }[];
  children: ReactNode;
}) {
  const t = useT();
  return (
    <Reveal className="block">
      <article className="grid border-t border-rule py-10 first:border-t-0 sm:grid-cols-[120px_1fr] sm:gap-6 sm:py-14">
        {/* Margin label */}
        <div className="mb-3 flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-ink sm:mb-0 sm:flex-col sm:items-start sm:gap-1 sm:pt-2">
          <span className="flex items-center gap-2 text-ink">
            <span
              aria-hidden="true"
              className="inline-block h-[6px] w-[6px] rounded-full"
              style={{ background: ACCENTS[accent] }}
            />
            {t("work.fig")} {figure}
          </span>
          <span>{t("work.tag")}</span>
        </div>

        <div>
          <h3
            className="font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl"
            style={{ borderLeft: `3px solid ${ACCENTS[accent]}`, paddingLeft: "0.75rem" }}
          >
            {title}
          </h3>
          <p className="mt-3 whitespace-pre-wrap break-words font-mono text-[11px] uppercase tracking-[0.14em] text-muted-ink">
            {meta}
          </p>
          <div className="mt-4 max-w-[62ch] space-y-3 font-body text-base leading-relaxed text-ink">
            {children}
          </div>
          {image ? (
            <figure className="mt-6 max-w-[62ch]">
              <img
                src={asset(image.src)}
                alt={image.alt}
                loading="lazy"
                className="w-full border border-rule"
              />
              <figcaption className="mt-2 font-mono text-[11px] leading-relaxed text-muted-ink">
                {image.caption}
              </figcaption>
            </figure>
          ) : null}
          {docs && docs.length > 0 ? (
            <p className="mt-5 flex flex-wrap gap-3">
              {docs.map((d) => (
                <DocLink key={d.href} href={asset(d.href)} accent={accent}>
                  {d.label}
                </DocLink>
              ))}
            </p>
          ) : null}
          {footnote ? (
            <p className="mt-5 max-w-[62ch] border-t border-rule pt-3 font-mono text-[11px] leading-relaxed text-muted-ink">
              <span className="text-ink">†</span> {footnote}
            </p>
          ) : null}
        </div>
      </article>
    </Reveal>
  );
}

export function Work() {
  const t = useT();
  return (
    <section id="work" aria-labelledby="work-heading" className="border-b border-rule">
      <div className="mx-auto max-w-[960px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
          <span
            aria-hidden="true"
            className="inline-block h-[7px] w-[7px] rounded-full"
            style={{ background: ACCENTS.green }}
          />
          {t("work.plate")}
        </div>
        <h2 id="work-heading" className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {t("work.title.a")} <span className="italic" style={{ color: "var(--color-okabe-green)" }}>{t("work.title.b")}</span>
        </h2>

        <div className="mt-10">
          <Block
            figure="2.1"
            accent="blue"
            meta={t("work.0.meta")}
            title={t("work.0.title")}
          >
            <p>{t("work.0.p1")}</p>
            <p>{t("work.0.p2")}</p>
            <p>{t("work.0.p3")}</p>
          </Block>

          <Block
            figure="2.2"
            accent="green"
            meta={t("work.9.meta")}
            title={t("work.9.title")}
          >
            <p>{t("work.9.p1")}</p>
            <p>{t("work.9.p2")}</p>
          </Block>

          <Block
            figure="2.3"
            accent="vermillion"
            meta={t("work.10.meta")}
            title={t("work.10.title")}
            image={{ src: "work/daq-board.webp", alt: t("work.10.img.alt"), caption: t("work.10.img.cap") }}
            docs={[{ href: "work/daq-board-schematic.pdf", label: t("work.doc.schematic") }]}
          >
            <p>{t("work.10.p1")}</p>
            <p>{t("work.10.p2")}</p>
          </Block>

          <Block
            figure="2.4"
            accent="orange"
            meta={t("work.11.meta")}
            title={t("work.11.title")}
            image={{ src: "work/daq-shield.webp", alt: t("work.11.img.alt"), caption: t("work.11.img.cap") }}
            docs={[{ href: "work/daq-shield-schematic.pdf", label: t("work.doc.schematic") }]}
          >
            <p>{t("work.11.p1")}</p>
            <p>{t("work.11.p2")}</p>
          </Block>

          <Block
            figure="2.5"
            accent="blue"
            meta={t("work.6.meta")}
            title={t("work.6.title")}
            image={{ src: "work/kspace.webp", alt: t("work.6.img.alt"), caption: t("work.6.img.cap") }}
          >
            <p>{t("work.6.p1")}</p>
          </Block>

          <Block
            figure="2.6"
            accent="purple"
            meta={t("work.7.meta")}
            title={t("work.7.title")}
            image={{ src: "work/anuma-map.webp", alt: t("work.7.img.alt"), caption: t("work.7.img.cap") }}
          >
            <p>{t("work.7.p1")}</p>
            <p>{t("work.7.p2")}</p>
          </Block>

          <Block
            figure="2.7"
            accent="orange"
            meta={t("work.8.meta")}
            title={t("work.8.title")}
            image={{ src: "work/sortsight-concept.webp", alt: t("work.8.img.alt"), caption: t("work.8.img.cap") }}
          >
            <p>{t("work.8.p1")}</p>
            <p>{t("work.8.p2")}</p>
          </Block>
          <Block
            figure="2.8"
            accent="vermillion"
            meta={t("work.1.meta")}
            title={t("work.1.title")}
            footnote={t("work.1.foot")}
          >
            <p>{t("work.1.p1")}</p>
            <p>
              {t("work.1.p2a")}
              <span className="font-mono font-bold text-vermillion">{t("work.1.p2b")}</span>
              {t("work.1.p2c")}
            </p>
            <p>{t("work.1.p3")}</p>
            <p>
              <a
                href={thesisUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-rule px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink hover:border-ink hover:text-vermillion focus-visible:outline-2 focus-visible:outline-okabe-blue"
              >
                <span aria-hidden="true" className="inline-block h-[6px] w-[6px] rounded-full" style={{ background: ACCENTS.vermillion }} />
                {t("work.1.read")} ↗
              </a>
            </p>
          </Block>

          <Block
            figure="2.9"
            accent="blue"
            meta={t("work.2.meta")}
            title={t("work.2.title")}
          >
            <p>{t("work.2.p1")}</p>
            <p>{t("work.2.p2")}</p>
          </Block>

          <Block
            figure="2.10"
            accent="orange"
            meta={t("work.3.meta")}
            title={t("work.3.title")}
          >
            <p>{t("work.3.p1")}</p>
            <p>{t("work.3.p2")}</p>
          </Block>
        </div>
      </div>
    </section>
  );
}
