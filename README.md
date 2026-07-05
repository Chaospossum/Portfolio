# Portfolio

My personal site — [chaospossum.github.io/Portfolio](https://chaospossum.github.io/Portfolio/).

It's a single-page portfolio for my imaging engineering / computer vision
work: masthead, a research panel, selected work (including my thesis on CNN
robustness under image degradations), experience and contact. Styled like a
print plate/newspaper spread, with a light/dark theme toggle and an
English/French language switch (`src/components/portfolio/i18n.tsx` holds
both dictionaries).

## Stack

TanStack Start + React, Tailwind, shadcn/ui components, built with Vite and
Bun. The interesting bits live in `src/components/portfolio/`; the stuff in
`src/components/ui/` is stock shadcn.

## Developing

```bash
bun install
bun run dev
```

## Deploying

Pushes to `main` trigger the GitHub Actions workflow in
`.github/workflows/deploy.yml`, which builds the app as a static SPA and
publishes `dist/client` to GitHub Pages. The base path is derived from the
repo name, so renaming the repo won't break asset URLs.
