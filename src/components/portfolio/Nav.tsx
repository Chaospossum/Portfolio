import { useEffect, useState } from "react";
import { useSettings } from "./i18n";

export function Nav() {
  const [open, setOpen] = useState(false);
  const { t, locale, setLocale, theme, setTheme } = useSettings();

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
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-[960px] items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#top"
          className="font-mono text-xs uppercase tracking-[0.18em] text-ink hover:text-okabe-blue focus-visible:outline-2 focus-visible:outline-okabe-blue"
        >
          ND
        </a>
        <nav className="hidden gap-7 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink hover:text-okabe-blue focus-visible:outline-2 focus-visible:outline-okabe-blue"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <div
            role="group"
            aria-label={t("nav.lang")}
            className="flex items-center border border-rule font-mono text-[10px] uppercase tracking-[0.16em]"
          >
            {(["en", "fr"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLocale(l)}
                aria-pressed={locale === l}
                className={`px-2 py-1 transition-colors ${
                  locale === l
                    ? "bg-ink text-paper"
                    : "bg-paper text-ink hover:text-okabe-blue"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? t("nav.theme.light") : t("nav.theme.dark")}
            aria-pressed={theme === "dark"}
            className="flex h-7 w-7 items-center justify-center border border-rule text-ink hover:border-ink focus-visible:outline-2 focus-visible:outline-okabe-blue"
          >
            {theme === "dark" ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t("nav.close") : t("nav.menu")}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden font-mono text-xs uppercase tracking-[0.18em] text-ink focus-visible:outline-2 focus-visible:outline-okabe-blue"
        >
          {open ? t("nav.close") : t("nav.menu")}
        </button>
      </div>
      {open && (
        <div id="mobile-menu" className="border-t border-rule md:hidden">
          <nav className="mx-auto flex max-w-[960px] flex-col px-5 py-3 sm:px-8" aria-label="Mobile">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-rule py-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-okabe-blue"
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center justify-between gap-3 py-3">
              <div role="group" aria-label={t("nav.lang")} className="flex items-center border border-rule font-mono text-[10px] uppercase tracking-[0.16em]">
                {(["en", "fr"] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLocale(l)}
                    aria-pressed={locale === l}
                    className={`px-2 py-1 ${locale === l ? "bg-ink text-paper" : "bg-paper text-ink"}`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="border border-rule px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink"
              >
                {theme === "dark" ? t("nav.theme.light") : t("nav.theme.dark")}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}