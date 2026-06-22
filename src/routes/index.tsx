import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Masthead } from "@/components/portfolio/Masthead";
import { ResearchPanel } from "@/components/portfolio/ResearchPanel";
import { Work } from "@/components/portfolio/Work";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Contact } from "@/components/portfolio/Contact";
import { SettingsProvider } from "@/components/portfolio/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nicole Duque, Imaging Engineering" },
      {
        name: "description",
        content:
          "Nicole Duque, imaging engineering, computer vision systems, and experimental hardware. Luxembourg.",
      },
      { property: "og:title", content: "Nicole Duque, Imaging Engineering" },
      {
        property: "og:description",
        content:
          "Imaging engineering, computer vision systems, and experimental hardware. Luxembourg.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <SettingsProvider>
      <div className="min-h-screen bg-paper text-ink antialiased">
        <Nav />
        <main>
          <Masthead />
          <ResearchPanel />
          <Work />
          <About />
          <Experience />
          <Contact />
        </main>
      </div>
    </SettingsProvider>
  );
}
