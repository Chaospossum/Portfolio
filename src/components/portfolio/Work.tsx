import type { ReactNode } from "react";
import { useT } from "./i18n";
import { DocLink, Figure, MetaTable, SectionHead, Wrap, asset } from "./lab";
import { BoardDrawing, LensRays, MatDiagram, Waveform } from "./retro";

// Thesis PDF lives in /public and is served from the deploy base path.
const thesisUrl = `${import.meta.env.BASE_URL}Training-for-Robustness-Nicole-Duque.pdf`;

type Entry = {
  id: string;
  key: string; // i18n key prefix, e.g. "work.10"
  paragraphs: string[];
  image?: { src: string; alt: string; cap: string };
  drawing?: ReactNode;
  docs?: { href: string; label: string }[];
  foot?: string;
  extra?: ReactNode;
};

function Project({ n, e, flip }: { n: number; e: Entry; flip: boolean }) {
  const t = useT();
  const num = String(n).padStart(2, "0");
  const side = e.image ? (
    <>
      <Figure src={e.image.src} alt={e.image.alt} caption={e.image.cap} />
      {e.drawing ? <div className="mt-10 text-ink">{e.drawing}</div> : null}
    </>
  ) : e.drawing ? (
    <div className="text-ink">{e.drawing}</div>
  ) : null;

  return (
    <article id={e.id} className="grid gap-x-8 gap-y-8 border-t-2 border-ink py-12 lg:grid-cols-12 lg:py-16">
      <div className="flex items-start justify-between lg:col-span-2 lg:block">
        <span aria-hidden="true" className="numeral numeral-ink text-[3rem] sm:text-[4rem]">
          {num}
        </span>
      </div>

      <div className={`lg:col-span-6 ${flip ? "lg:order-3" : ""}`}>
        <h3 className="font-display text-[1.25rem] uppercase leading-[1.25] sm:text-[1.5rem]">{t(`${e.key}.title`)}</h3>
        <div className="mt-6">
          <MetaTable text={t(`${e.key}.meta`)} />
        </div>
        <div className="mt-6 max-w-[62ch] space-y-4 text-[1.125rem] leading-[1.5]">
          {e.paragraphs.map((k) => (
            <p key={k}>{t(k)}</p>
          ))}
          {e.extra}
        </div>
        {e.docs ? (
          <p className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {e.docs.map((d) => (
              <DocLink key={d.href} href={d.href}>
                {d.label}
              </DocLink>
            ))}
          </p>
        ) : null}
        {e.foot ? <p className="mt-6 text-base italic text-muted-ink">{e.foot}</p> : null}
      </div>

      {side ? <div className={`lg:col-span-4 ${flip ? "lg:order-2" : ""}`}>{side}</div> : null}
    </article>
  );
}

export function Work() {
  const t = useT();
  const entries: Entry[] = [
    {
      id: "work-01",
      key: "work.10",
      paragraphs: ["work.10.p0", "work.10.p1", "work.10.p2", "work.10.p3"],
      image: { src: "work/daq-shield.webp", alt: t("work.10.img.alt"), cap: t("work.10.img.cap") },
      drawing: <BoardDrawing className="w-[70%]" />,
      docs: [
        { href: asset("work/daq-board-schematic.pdf"), label: t("work.doc.full") },
        { href: asset("work/daq-shield-schematic.pdf"), label: t("work.doc.shield") },
      ],
    },
    {
      id: "work-02",
      key: "work.1",
      paragraphs: ["work.1.p1"],
      drawing: <Waveform className="w-full" />,
      foot: t("work.1.foot"),
      extra: (
        <>
          <p>
            {t("work.1.p2a")}
            <strong className="font-semibold text-signal">{t("work.1.p2b")}</strong>
            {t("work.1.p2c")}
          </p>
          <p>{t("work.1.p3")}</p>
          <p className="pt-2">
            <DocLink href={thesisUrl}>{t("work.1.read")}</DocLink>
          </p>
        </>
      ),
    },
    {
      id: "work-03",
      key: "work.6",
      paragraphs: ["work.6.p1"],
      image: { src: "work/kspace-2x2.webp", alt: t("work.6.img.alt"), cap: t("work.6.img.cap") },
    },
    {
      id: "work-04",
      key: "work.7",
      paragraphs: ["work.7.p1", "work.7.p2"],
      image: { src: "work/anuma-map.webp", alt: t("work.7.img.alt"), cap: t("work.7.img.cap") },
    },
    {
      id: "work-05",
      key: "work.8",
      paragraphs: ["work.8.p1", "work.8.p2"],
      image: { src: "work/sortsight-concept.webp", alt: t("work.8.img.alt"), cap: t("work.8.img.cap") },
    },
    {
      id: "work-06",
      key: "work.2",
      paragraphs: ["work.2.p1", "work.2.p2"],
      drawing: <MatDiagram className="w-full max-w-[300px]" />,
    },
    {
      id: "work-07",
      key: "work.3",
      paragraphs: ["work.3.p1", "work.3.p2"],
    },
  ];

  return (
    <section id="work" aria-labelledby="work-heading" className="border-b-2 border-ink">
      <Wrap className="pt-14 sm:pt-20">
        <SectionHead
          n="02"
          id="work-heading"
          aside={<LensRays className="ml-auto hidden w-full max-w-[320px] text-ink lg:block" />}
        >
          <span className="font-body text-[1.5em] normal-case italic">{t("work.title.a")}</span>
          <br />
          {t("work.title.b")}
        </SectionHead>

        {/* index: a contact sheet of the seven entries */}
        <ol className="ruled mt-10 border-t border-rule lg:ml-[calc(100%/6+1rem)]">
          {entries.map((e, i) => (
            <li key={e.id}>
              <a
                href={`#${e.id}`}
                className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 py-3 text-[1.0625rem] hover:text-signal sm:grid-cols-[4rem_1fr]"
              >
                <span className="font-display text-[0.8125rem] text-muted-ink group-hover:text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="transition-transform duration-150 group-hover:translate-x-1">{t(`${e.key}.title`)}</span>
              </a>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          {entries.map((e, i) => (
            <Project key={e.id} n={i + 1} e={e} flip={i % 2 === 1} />
          ))}
        </div>
      </Wrap>
    </section>
  );
}
