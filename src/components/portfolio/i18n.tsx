import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "en" | "fr";
export type Theme = "light" | "dark";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  t: (key: string) => string;
};

const SettingsCtx = createContext<Ctx | null>(null);

const dict: Record<Locale, Record<string, string>> = {
  en: {
    "nav.work": "Work",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "nav.menu": "Menu",
    "nav.close": "Close",
    "nav.theme.light": "Light",
    "nav.theme.dark": "Dark",
    "nav.lang": "Language",

    "mast.plate": "PLATE 00 / MASTHEAD",
    "mast.kicker.1": "IMAGING ENGINEERING",
    "mast.kicker.2": "COMPUTER VISION SYSTEMS",
    "mast.kicker.3": "EXPERIMENTAL HARDWARE",
    "mast.kicker.4": "LUXEMBOURG",
    "mast.intro": "I work close to the data, building small setups to understand how visual information is captured, processed, and where it breaks. Below is a piece of my thesis you can play with.",
    "mast.available": "Available — Sep 2026",

    "panel.plate": "INTERACTIVE FIGURE",
    "panel.caption": "BSc thesis demo",
    "panel.lede": "Drag the slider. Watch what a training choice does to a model under stress.",
    "panel.degradation": "DEGRADATION",
    "panel.severity": "SEVERITY",
    "panel.training": "TRAINING",
    "panel.training.single": "Single-type training",
    "panel.training.mixed": "Mixed augmentation",
    "panel.deg.blur": "Blur",
    "panel.deg.noise": "Noise",
    "panel.deg.compression": "Compression",
    "panel.deg.lighting": "Lighting",
    "panel.sample": "SAMPLE",
    "panel.thisisme": "This is me.",
    "panel.readout": "READOUT",
    "panel.live": "● LIVE",
    "panel.percent": "PERCENT",
    "panel.predicted": "PREDICTED",
    "panel.confidence": "CONFIDENCE",
    "panel.collapse": "↓ COLLAPSE",
    "panel.stable": "STABLE",
    "panel.degraded": "DEGRADED",
    "panel.field.model": "MODEL",
    "panel.field.degradation": "DEGRADATION",
    "panel.field.severity": "SEVERITY",
    "panel.field.training": "TRAINING",
    "panel.note": "Illustrative, based on results from my BSc thesis. Not a running model.",

    "work.plate": "PLATE 02 / WORK",
    "work.title.a": "Selected",
    "work.title.b": "projects",
    "work.fig": "FIG.",
    "work.tag": "WORK",

    "work.1.title": "CNN robustness for real-world imaging systems",
    "work.1.meta": "METHOD: multi-seed training, paired t-tests, effect sizes   MODELS: ResNet-18, MobileNet-V2   DATA: CIFAR-10",
    "work.1.foot": "Bonizzi, P. (supervisor). University College Maastricht, BSc thesis, 2026.",
    "work.1.read": "Read the thesis (PDF)",
    "work.1.p1": "I built an end to end framework to measure how image classifiers degrade under controlled noise, blur, compression, and lighting shifts, and compared training strategies for robustness.",
    "work.1.p2a": "Training on a severity curriculum of Gaussian blur backfired: ",
    "work.1.p2b": "ResNet-18 clean accuracy fell from about 95% to roughly 13%",
    "work.1.p2c": ", a near total collapse. Mixed augmentation was the honest winner, costing about 3 points of clean accuracy for about 23 points of robustness.",
    "work.1.p3": "I used multiple random seeds and paired statistical tests to separate real effects from noise, rather than trusting clean accuracy alone. Supervised by Pietro Bonizzi at University College Maastricht.",

    "work.2.title": "Nivio, smart rehabilitation mat",
    "work.2.meta": "ROLE: hardware lead   STACK: ESP32, ADS1220 24-bit ADC, 4x Mavin 200kg load cells   OUTPUT: real-time balance feedback",
    "work.2.p1": "I designed the hardware for Nivio, a mat that turns pressure data into real time balance feedback for home physiotherapy.",
    "work.2.p2": "I selected and integrated four 200 kg load cells with a 24 bit ADC for high resolution force measurement, and ran the real time signal processing on an ESP32: centre of pressure, weight distribution, sway tracking, and a stability score. Built as a Samsung Electronics project.",

    "work.3.title": "Makerspace robotics program",
    "work.3.meta": "ROLE: program design + mentoring   AUDIENCE: students   THEME: combat robots",
    "work.3.p1": "I lead the robotics program at the SNJ Makerspace. I design new robot activities, including fairyweight combat robots, and mentor students through building and competing with them.",
    "work.3.p2": "Earlier, as a summer intern, I built combat robots for live competitions and a smart decorative plant with automated IoT irrigation.",

    "work.4.title": "GrowthShare",
    "work.4.meta": "ROLE: co-founder, brand and communications   STAGE: Brightlands Startup Challenge 2026, ideation track",
    "work.4.p1": "I co-founded GrowthShare, a community backed funding and acceleration platform connecting residents to local shops, makers, and services through participatory capital.",
    "work.4.p2": "I lead brand and communications: visual identity, marketing materials, and pitch video production.",

    "work.5.title": "Digital fabrication",
    "work.5.meta": "TOOLS: pyembroidery, Brother M340ED, 3D printing",
    "work.5.p1": "I generate machine embroidery stitch files in code and 3D print custom parts. It keeps my hands on the physical side of making, which feeds the hardware work.",

    "about.plate": "PLATE 03 / ABOUT",
    "about.title": "About",
    "about.p1": "I am a Luxembourgish engineer and scientist finishing a BSc in Physics and Mathematics at University College Maastricht. In September 2026 I start an MSc in Imaging Engineering, AI and Data track, at Maastricht University, and I am a selected participant in the AI Academy at the Digital Learning Hub in Luxembourg.",
    "about.p2": "I like problems that need both careful maths and something built with my hands, and I do my best work in iterative, experimental places like makerspaces and labs.",
    "about.langs": "LANGUAGES: LUXEMBOURGISH (NATIVE), FRENCH, GERMAN, ENGLISH, SPANISH, ITALIAN",
    "about.tv.a": "Fun fact: I was on TV. I competed in season one of Take Off, Luxembourg's national science challenge show on RTL. ",
    "about.tv.link": "Here is my interview",
    "about.outside": "Outside the lab I build embedded electronics, spend time in museums and with Luxembourgish heraldry, and sell empanadas at markets as Pastelitos de Maiz.",

    "exp.plate": "PLATE 04 / EXPERIENCE & EDUCATION",
    "exp.title.a": "Experience and",
    "exp.title.b": "education",
    "exp.experience": "EXPERIENCE",
    "exp.education": "EDUCATION",
    "exp.cert": "CERTIFICATIONS & RECOGNITION",
    "exp.present": "PRESENT",

    "exp.e1.date": "MAY 2026 — PRESENT",
    "exp.e1.title": "STEM Workshop Facilitator",
    "exp.e1.org": "Ingenieurs et Scientifiques du Luxembourg",
    "exp.e1.note": "Hands on science and engineering workshops for children aged 8 to 12 across Luxembourg, covering electronics, mechanics, and pneumatics.",
    "exp.e2.date": "APR 2026 — PRESENT",
    "exp.e2.title": "Co-Founder",
    "exp.e2.org": "GrowthShare, Maastricht",
    "exp.e3.date": "OCT 2025 — PRESENT",
    "exp.e3.title": "Animateur spécialisé, Makerspace",
    "exp.e3.org": "Service National de la Jeunesse, Hollerich",
    "exp.e4.date": "AUG 2025 — PRESENT",
    "exp.e4.title": "Student Ambassador",
    "exp.e4.org": "Maastricht University",
    "exp.e5.date": "SEP 2025 — DEC 2025",
    "exp.e5.title": "Hardware Lead, Nivio project",
    "exp.e5.org": "Samsung Electronics",
    "exp.e6.date": "JUN 2025 — JUL 2025",
    "exp.e6.title": "Summer Intern",
    "exp.e6.org": "Service National de la Jeunesse",

    "exp.ed1.date": "FROM SEP 2026",
    "exp.ed1.title": "MSc Imaging Engineering, AI and Data track",
    "exp.ed1.org": "Maastricht University",
    "exp.ed2.date": "APR 2026 — NOV 2026",
    "exp.ed2.title": "AI Academy, Machine Learning",
    "exp.ed2.org": "Digital Learning Hub, Luxembourg",
    "exp.ed3.date": "2023 — 2026",
    "exp.ed3.title": "BSc Physics and Mathematics",
    "exp.ed3.org": "University College Maastricht",
    "exp.ed4.date": "SEP 2025 — DEC 2025",
    "exp.ed4.title": "Robotics Professional Certificate",
    "exp.ed4.org": "European Business Institute of Luxembourg",
    "exp.ed5.date": "AUG 2025",
    "exp.ed5.title": "Summer School, Industrial Robotics and Autonomous Systems",
    "exp.ed5.org": "University of Eastern Finland",

    "exp.cert1": "Industrial Robotics Mastery Track, Digital Learning Hub Luxembourg. 88 hours: robotics programming in Blockly and Python, machine vision, IIoT integration, automation design.",
    "exp.cert2": "Wingfoot Women Mentorship Program, WeSTEM+ by Goodyear.",
    "exp.cert3": "Elements of AI, University of Helsinki.",
    "exp.cert4a": "Contestant, ",
    "exp.cert4link": "Take Off season one",
    "exp.cert4b": ", national science challenge show, RTL Luxembourg.",

    "contact.plate": "PLATE 05 / CONTACT",
    "contact.title.a": "Get in",
    "contact.title.b": "touch",
    "contact.lede": "Open to research, engineering, and collaboration. Email is the quickest way to reach me.",
    "contact.email": "EMAIL",
    "contact.linkedin": "LINKEDIN",
    "contact.github": "GITHUB",
  },
  fr: {
    "nav.work": "Travaux",
    "nav.about": "À propos",
    "nav.experience": "Parcours",
    "nav.contact": "Contact",
    "nav.menu": "Menu",
    "nav.close": "Fermer",
    "nav.theme.light": "Clair",
    "nav.theme.dark": "Sombre",
    "nav.lang": "Langue",

    "mast.plate": "PLANCHE 00 / EN-TÊTE",
    "mast.kicker.1": "INGÉNIERIE D'IMAGERIE",
    "mast.kicker.2": "SYSTÈMES DE VISION PAR ORDINATEUR",
    "mast.kicker.3": "MATÉRIEL EXPÉRIMENTAL",
    "mast.kicker.4": "LUXEMBOURG",
    "mast.intro": "Je travaille au plus près des données, en construisant de petits dispositifs pour comprendre comment l'information visuelle est captée, traitée, et où elle se brise. Voici un extrait de ma thèse avec lequel vous pouvez jouer.",
    "mast.available": "Disponible — sept. 2026",

    "panel.plate": "FIGURE INTERACTIVE",
    "panel.caption": "Démo de mémoire de licence",
    "panel.lede": "Faites glisser le curseur. Observez ce qu'un choix d'entraînement fait à un modèle sous contrainte.",
    "panel.degradation": "DÉGRADATION",
    "panel.severity": "SÉVÉRITÉ",
    "panel.training": "ENTRAÎNEMENT",
    "panel.training.single": "Entraînement simple",
    "panel.training.mixed": "Augmentation mixte",
    "panel.deg.blur": "Flou",
    "panel.deg.noise": "Bruit",
    "panel.deg.compression": "Compression",
    "panel.deg.lighting": "Lumière",
    "panel.sample": "ÉCHANTILLON",
    "panel.thisisme": "C'est moi.",
    "panel.readout": "LECTURE",
    "panel.live": "● EN DIRECT",
    "panel.percent": "POURCENT",
    "panel.predicted": "CONFIANCE",
    "panel.confidence": "PRÉDITE",
    "panel.collapse": "↓ EFFONDREMENT",
    "panel.stable": "STABLE",
    "panel.degraded": "DÉGRADÉ",
    "panel.field.model": "MODÈLE",
    "panel.field.degradation": "DÉGRADATION",
    "panel.field.severity": "SÉVÉRITÉ",
    "panel.field.training": "ENTRAÎNEMENT",
    "panel.note": "Illustratif, basé sur les résultats de mon mémoire de licence. Pas un modèle en exécution.",

    "work.plate": "PLANCHE 02 / TRAVAUX",
    "work.title.a": "Projets",
    "work.title.b": "sélectionnés",
    "work.fig": "FIG.",
    "work.tag": "TRAVAUX",

    "work.1.title": "Robustesse des CNN pour des systèmes d'imagerie réels",
    "work.1.meta": "MÉTHODE : entraînement multi-graines, tests t appariés, tailles d'effet   MODÈLES : ResNet-18, MobileNet-V2   DONNÉES : CIFAR-10",
    "work.1.foot": "Bonizzi, P. (superviseur). University College Maastricht, mémoire de licence, 2026.",
    "work.1.read": "Lire le mémoire (PDF)",
    "work.1.p1": "J'ai conçu un cadre de bout en bout pour mesurer comment les classificateurs d'images se dégradent sous bruit, flou, compression et variations d'éclairage contrôlés, et comparé les stratégies d'entraînement pour la robustesse.",
    "work.1.p2a": "L'entraînement sur un curriculum de sévérité de flou gaussien a échoué : ",
    "work.1.p2b": "la précision de ResNet-18 sur images propres est passée d'environ 95% à environ 13%",
    "work.1.p2c": ", un effondrement quasi total. L'augmentation mixte a été la vraie gagnante, coûtant environ 3 points de précision propre pour environ 23 points de robustesse.",
    "work.1.p3": "J'ai utilisé plusieurs graines aléatoires et des tests statistiques appariés pour séparer les effets réels du bruit, plutôt que de me fier seulement à la précision propre. Supervisé par Pietro Bonizzi à University College Maastricht.",

    "work.2.title": "Nivio, tapis intelligent de rééducation",
    "work.2.meta": "RÔLE : responsable matériel   PILE : ESP32, ADC ADS1220 24 bits, 4x cellules de charge Mavin 200 kg   SORTIE : retour d'équilibre en temps réel",
    "work.2.p1": "J'ai conçu le matériel de Nivio, un tapis qui transforme les données de pression en retour d'équilibre temps réel pour la kinésithérapie à domicile.",
    "work.2.p2": "J'ai sélectionné et intégré quatre cellules de charge de 200 kg avec un ADC 24 bits pour une mesure de force haute résolution, et géré le traitement temps réel sur ESP32 : centre de pression, répartition du poids, suivi du balancement et score de stabilité. Réalisé comme projet Samsung Electronics.",

    "work.3.title": "Programme robotique du Makerspace",
    "work.3.meta": "RÔLE : conception du programme + mentorat   PUBLIC : élèves   THÈME : robots de combat",
    "work.3.p1": "Je dirige le programme robotique du Makerspace SNJ. Je conçois de nouvelles activités, dont des robots de combat fairyweight, et j'accompagne les élèves dans leur fabrication et leur compétition.",
    "work.3.p2": "Auparavant, en stage d'été, j'ai construit des robots de combat pour des compétitions et une plante décorative connectée avec irrigation IoT automatisée.",

    "work.4.title": "GrowthShare",
    "work.4.meta": "RÔLE : co-fondatrice, marque et communication   ÉTAPE : Brightlands Startup Challenge 2026, piste idéation",
    "work.4.p1": "J'ai co-fondé GrowthShare, une plateforme de financement et d'accélération communautaire reliant les habitants aux commerces, artisans et services locaux via du capital participatif.",
    "work.4.p2": "Je dirige la marque et la communication : identité visuelle, supports marketing et production de la vidéo de pitch.",

    "work.5.title": "Fabrication numérique",
    "work.5.meta": "OUTILS : pyembroidery, Brother M340ED, impression 3D",
    "work.5.p1": "Je génère par code des fichiers de broderie machine et j'imprime en 3D des pièces sur mesure. Cela garde mes mains du côté physique de la fabrication, ce qui nourrit le travail matériel.",

    "about.plate": "PLANCHE 03 / À PROPOS",
    "about.title": "À propos",
    "about.p1": "Je suis une ingénieure et scientifique luxembourgeoise terminant une licence en Physique et Mathématiques à University College Maastricht. En septembre 2026 je commence un master en Ingénierie d'Imagerie, filière IA et Données, à l'Université de Maastricht, et je suis participante sélectionnée à l'AI Academy du Digital Learning Hub au Luxembourg.",
    "about.p2": "J'aime les problèmes qui demandent à la fois des maths rigoureuses et quelque chose à construire de mes mains, et je travaille mieux dans des lieux itératifs et expérimentaux comme les makerspaces et les laboratoires.",
    "about.langs": "LANGUES : LUXEMBOURGEOIS (NATIVE), FRANÇAIS, ALLEMAND, ANGLAIS, ESPAGNOL, ITALIEN",
    "about.tv.a": "Anecdote : je suis passée à la télé. J'ai participé à la première saison de Take Off, l'émission scientifique nationale du Luxembourg sur RTL. ",
    "about.tv.link": "Voici mon interview",
    "about.outside": "Hors du laboratoire je bricole de l'électronique embarquée, je passe du temps dans les musées et avec l'héraldique luxembourgeoise, et je vends des empanadas sur les marchés sous le nom Pastelitos de Maiz.",

    "exp.plate": "PLANCHE 04 / PARCOURS & FORMATION",
    "exp.title.a": "Parcours et",
    "exp.title.b": "formation",
    "exp.experience": "EXPÉRIENCE",
    "exp.education": "FORMATION",
    "exp.cert": "CERTIFICATIONS & DISTINCTIONS",
    "exp.present": "PRÉSENT",

    "exp.e1.date": "MAI 2026 — PRÉSENT",
    "exp.e1.title": "Animatrice d'ateliers STEM",
    "exp.e1.org": "Ingénieurs et Scientifiques du Luxembourg",
    "exp.e1.note": "Ateliers de sciences et d'ingénierie pour enfants de 8 à 12 ans à travers le Luxembourg, en électronique, mécanique et pneumatique.",
    "exp.e2.date": "AVR. 2026 — PRÉSENT",
    "exp.e2.title": "Co-fondatrice",
    "exp.e2.org": "GrowthShare, Maastricht",
    "exp.e3.date": "OCT. 2025 — PRÉSENT",
    "exp.e3.title": "Animatrice spécialisée, Makerspace",
    "exp.e3.org": "Service National de la Jeunesse, Hollerich",
    "exp.e4.date": "AOÛT 2025 — PRÉSENT",
    "exp.e4.title": "Ambassadrice étudiante",
    "exp.e4.org": "Université de Maastricht",
    "exp.e5.date": "SEPT. 2025 — DÉC. 2025",
    "exp.e5.title": "Responsable matériel, projet Nivio",
    "exp.e5.org": "Samsung Electronics",
    "exp.e6.date": "JUIN 2025 — JUIL. 2025",
    "exp.e6.title": "Stagiaire d'été",
    "exp.e6.org": "Service National de la Jeunesse",

    "exp.ed1.date": "À PARTIR DE SEPT. 2026",
    "exp.ed1.title": "Master en Ingénierie d'Imagerie, filière IA et Données",
    "exp.ed1.org": "Université de Maastricht",
    "exp.ed2.date": "AVR. 2026 — NOV. 2026",
    "exp.ed2.title": "AI Academy, Apprentissage automatique",
    "exp.ed2.org": "Digital Learning Hub, Luxembourg",
    "exp.ed3.date": "2023 — 2026",
    "exp.ed3.title": "Licence en Physique et Mathématiques",
    "exp.ed3.org": "University College Maastricht",
    "exp.ed4.date": "SEPT. 2025 — DÉC. 2025",
    "exp.ed4.title": "Certificat professionnel en robotique",
    "exp.ed4.org": "European Business Institute of Luxembourg",
    "exp.ed5.date": "AOÛT 2025",
    "exp.ed5.title": "École d'été, Robotique industrielle et systèmes autonomes",
    "exp.ed5.org": "Université de Finlande orientale",

    "exp.cert1": "Parcours Maîtrise Robotique Industrielle, Digital Learning Hub Luxembourg. 88 heures : programmation robotique en Blockly et Python, vision industrielle, intégration IIoT, conception d'automatisation.",
    "exp.cert2": "Programme de mentorat Wingfoot Women, WeSTEM+ par Goodyear.",
    "exp.cert3": "Elements of AI, Université d'Helsinki.",
    "exp.cert4a": "Candidate, ",
    "exp.cert4link": "Take Off saison une",
    "exp.cert4b": ", émission scientifique nationale, RTL Luxembourg.",

    "contact.plate": "PLANCHE 05 / CONTACT",
    "contact.title.a": "Prenons",
    "contact.title.b": "contact",
    "contact.lede": "Ouverte à la recherche, à l'ingénierie et à la collaboration. Le courriel est le moyen le plus rapide de me joindre.",
    "contact.email": "COURRIEL",
    "contact.linkedin": "LINKEDIN",
    "contact.github": "GITHUB",
  },
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [theme, setThemeState] = useState<Theme>("light");

  // hydrate from localStorage / system pref
  useEffect(() => {
    try {
      const sl = localStorage.getItem("nd.locale") as Locale | null;
      const st = localStorage.getItem("nd.theme") as Theme | null;
      if (sl === "en" || sl === "fr") setLocaleState(sl);
      if (st === "light" || st === "dark") {
        setThemeState(st);
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setThemeState("dark");
      }
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.lang = locale;
    try {
      localStorage.setItem("nd.theme", theme);
      localStorage.setItem("nd.locale", locale);
    } catch {}
  }, [theme, locale]);

  const setLocale = (l: Locale) => setLocaleState(l);
  const setTheme = (t: Theme) => setThemeState(t);
  const t = (key: string) => dict[locale][key] ?? dict.en[key] ?? key;

  return (
    <SettingsCtx.Provider value={{ locale, setLocale, theme, setTheme, t }}>
      {children}
    </SettingsCtx.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsCtx);
  if (!ctx) throw new Error("useSettings must be inside SettingsProvider");
  return ctx;
}

export function useT() {
  return useSettings().t;
}