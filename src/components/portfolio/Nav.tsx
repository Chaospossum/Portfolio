import { useEffect, useState } from "react";
import { useSettings } from "./i18n";
import { HalfDisc } from "./retro";

function Switches({ compact = false }: { compact?: boolean }) {
  const { t, locale, setLocale, theme, setTheme } = useSettings();
  return (
    <div className="flex items-center gap-5">
      <div role="group" aria-label={t("nav.lang")} className="label-md flex items-center gap-2">
        {(["en", "fr"] as const).map((l, i) => (
          <span key={l} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden="true" className="h-4 w-px bg-ink" /> : null}
            <button
              type="button"
              onClick={() => setLocale(l)}
              aria-pressed={locale === l}
              className={`px-0.5 py-1 ${locale === l ? "text-ink underline decoration-signal decoration-[3px] underline-offset-[6px]" : "text-muted-ink hover:text-signal"}`}
            >
              {l.toUpperCase()}
            </button>
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label={theme === "dark" ? t("nav.theme.light") : t("nav.theme.dark")}
        aria-pressed={theme === "dark"}
        className="flex h-9 items-center gap-2 text-ink hover:text-signal"
      >
        <HalfDisc filled={theme === "dark"} className="h-5 w-5" />
        {compact ? <span className="label-md">{theme === "dark" ? t("nav.theme.light") : t("nav.theme.dark")}</span> : null}
      </button>
    </div>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const { t } = useSettings();

  const links = [
    { href: "#work", label: t("nav.work") },
    { href: "#about", label: t("nav.about") },
    { href: "#experience", label: t("nav.experience") },
    { href: "#contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-5 py-3 sm:px-10">
        <a href="#top" className="label-md flex items-center gap-3 text-ink hover:text-signal">
          <span aria-hidden="true" className="inline-block h-3 w-3 bg-signal" />
          Nicole Duque
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="link-quiet text-[1.0625rem]">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Switches />
        </div>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t("nav.close") : t("nav.menu")}
          onClick={() => setOpen((v) => !v)}
          className="label-md py-2 text-ink md:hidden"
        >
          {open ? t("nav.close") : t("nav.menu")}
        </button>
      </div>
      {open && (
        <div id="mobile-menu" className="border-t border-ink md:hidden">
          <nav className="ruled mx-auto flex max-w-[1320px] flex-col px-5" aria-label="Mobile">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display py-4 text-base uppercase text-ink hover:text-signal"
              >
                {l.label}
              </a>
            ))}
            <div className="py-4">
              <Switches compact />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
