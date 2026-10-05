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
    meta: [{ title: "Nicole Duque, Imaging Engineering" }],
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
