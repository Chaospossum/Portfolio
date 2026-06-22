// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Base path for deployment. On GitHub Pages this is a project site served from
// https://<user>.github.io/<repo>/, so assets and routes must be prefixed with
// "/<repo>/". The CI workflow sets BASE_PATH from the repo name; defaults to
// "/" so `vite dev` and local previews keep working at the root.
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  vite: {
    base,
    // The SPA prerender step boots a Vite preview server; pin it to IPv4 so it
    // works in environments without IPv6 loopback.
    preview: { host: "127.0.0.1" },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Emit a static SPA shell (dist/client/index.html) so the app can be hosted
    // on a static host such as GitHub Pages with no Node/Nitro server.
    spa: { enabled: true },
  },
});
