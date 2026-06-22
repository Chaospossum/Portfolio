## Nicole Duque portfolio, single page

A calm, light, lab-report style personal site built as one route. Okabe-Ito palette, three Google Fonts, hairline rules between sections, and one interactive research panel as the centrepiece.

### Structure (single page, smooth scroll)

1. Masthead: small mono kicker, name as large heading (Bricolage Grotesque), one plain intro sentence.
2. Interactive research panel (the signature element).
3. Work: 5 project blocks, each with a Space Mono metadata header.
4. About: paragraph, languages line, fun fact with TV interview link, human line.
5. Experience and education: two stacked lists, dates in mono.
6. Certifications and recognition: short list, Take Off linked.
7. Contact: one line plus three plain links.
8. Footer: mono, name + Luxembourg + year.

Sticky top nav with Work / About / Experience / Contact, plain links, mobile menu (hamburger → slide-down panel).

### Interactive panel behaviour

- Left: portrait placeholder image (use the uploaded portrait as a tasteful neutral sample).
- Controls: degradation type (Blur, Noise, Compression, Lighting), severity slider 0–100, training toggle (Single-type / Mixed augmentation).
- Live CSS effects on the image:
  - Blur: `filter: blur(Npx)` scaled with severity.
  - Noise: SVG turbulence overlay whose opacity grows with severity.
  - Compression: pixelation via low-res canvas/`image-rendering: pixelated` with scale tied to severity.
  - Lighting: `filter: brightness() contrast()` shifts.
- Right: Space Mono readout panel with MODEL, DEGRADATION, SEVERITY, TRAINING, PREDICTED CONFIDENCE.
- Confidence model (illustrative, deterministic, no randomness):
  - Single-type: starts ~95%, sharp non-linear collapse. For Blur: piecewise / sigmoid that crashes near s≈70 toward ~13% at s=100. Other degradations also collapse but bottom around 20–25%.
  - Mixed: starts ~92%, gentle curve, floor ≈60% at s=100.
  - Confidence rendered in vermillion when it crosses below 50% (the one bold accent on the page, paired with the 95→13 callout in the thesis block).
- Caption: "Illustrative, based on results from my BSc thesis. Not a running model."
- Mobile: stacks image → controls → readout.

### Design system

CSS variables in `src/styles.css` mapped to Tailwind theme tokens:
- `--paper #F6F7F4`, `--ink #15140F`, `--muted #6B6E66`, `--rule #D7D9D2`
- Accents: `--vermillion #D55E00`, `--blue #0072B2`, `--green #009E73`, `--orange #E69F00`, `--purple #CC79A7`

Fonts loaded via `<link>` in `__root.tsx` head (Bricolage Grotesque, Hanken Grotesk, Space Mono). Tailwind utility classes `font-display`, `font-body`, `font-mono`.

Hairline 1px rules (`--rule`) between sections, generous vertical rhythm, max content width ~880px, body `font-body`, headings `font-display` heavy with tight tracking at large sizes.

Accent rule: colour only on (a) the readout panel labels/values, (b) the vermillion 95→13 key result in the thesis block, (c) focus rings. Everything else is ink/muted/rule.

### Accessibility & motion

- Semantic HTML: one h1 (name), section h2s, project h3s.
- Visible focus rings using `--blue` outline.
- `prefers-reduced-motion`: disable smooth scroll, disable any subtle transitions on the readout numbers (snap instead of tween).
- Keyboard: slider, toggle, type selector all native form controls or fully keyboard-driven custom controls with proper aria.
- Mobile menu: focus trap, Esc to close.

### Banned tells (enforced)

No dark+neon, no focus-in hero animation, no skill tag clouds, no `01 / 02` numbering, no buzzwords, no em dashes anywhere in copy.

### Tech notes

- Single route: `src/routes/index.tsx` (replace placeholder).
- Components under `src/components/portfolio/`: `Masthead`, `ResearchPanel` (with `useDegradation` hook for confidence math), `NoiseOverlay`, `Work`, `ProjectBlock`, `About`, `ExperienceList`, `Certifications`, `Contact`, `Footer`, `Nav`.
- Head metadata in `index.tsx` `head()`: title "Nicole Duque, Imaging Engineering", description from intro sentence, og:title/og:description, canonical `/`.
- No backend, no Lovable Cloud.
- Portrait: I'll wire the uploaded portrait as a Lovable asset (`lovable-assets create` from `/mnt/user-uploads/...`) and import the JSON pointer; no binary copied into repo.

### Open question I will not block on

The masthead mono kicker reads "IMAGING ENGINEERING, COMPUTER VISION SYSTEMS, EXPERIMENTAL HARDWARE. LUXEMBOURG." as written in the brief. If you want it widened to leave room for broader imaging/sensing work, tell me after the first build and I'll swap the line.
