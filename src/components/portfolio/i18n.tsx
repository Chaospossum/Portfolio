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
    "mast.kicker.1": "IMAGING ENGINEERING MSc",
    "mast.kicker.2": "MOLECULAR IMAGING",
    "mast.kicker.3": "INSTRUMENTATION & HARDWARE",
    "mast.kicker.4": "LUXEMBOURG",
    "mast.intro": "I am an imaging engineering master's student. I work close to the data and the hardware, building small setups to understand how an image is captured, processed, and where it breaks. Below is a piece of my BSc thesis you can play with.",
    "mast.available": "Open to research collaboration",

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

    "work.0.title": "Finding HPV in skin tissue with molecular imaging",
    "work.0.meta": "STATUS: starting, 2026   METHOD: mass spectrometry imaging, segmentation, SVM classification   SAMPLES: skin tissue sections",
    "work.0.p1": "My next project asks whether HPV infection leaves a chemical fingerprint in skin tissue that a model can learn to recognise, without staining.",
    "work.0.p2": "The plan: image thin tissue sections with mass spectrometry imaging, so every pixel holds a full mass spectrum. Then clean the data (peak picking, normalisation, noise reduction), segment the tissue into regions, and train a support vector machine to separate infected from healthy areas.",
    "work.0.p3": "As in my BSc work, the hard part is being honest about the result: validating against established pathology, testing on samples the model never saw, and checking which molecular signals actually drive each decision.",

    "work.9.title": "A mass spectrometer beamline, built as a class",
    "work.9.meta": "MSc SKILLS LAB, 2026   SYSTEM: electrospray ion source, vacuum, ion optics, quadrupole mass filter, detector   MY PART: data acquisition",
    "work.9.p1": "In the skills lab our class is bringing a working electrospray quadrupole mass spectrometer to life, team by team: vacuum, ion source, ion optics, mass filter, detector and readout.",
    "work.9.p2": "My team owns the data acquisition: reading the tiny detector current, driving the mass scan, and getting spectra from the instrument onto a laptop. It is the part where every other team's work either shows up as a peak or does not.",

    "work.10.title": "Electrometer DAQ board for the beamline",
    "work.10.meta": "PCB DESIGN, 2026   SIGNAL: picoamps to microamps   PARTS: transimpedance amplifier, 16-bit ADC, 12-bit DAC   TOOLS: KiCad, Python",
    "work.10.p1": "A shield for a standard microcontroller board that measures the detector current with a transimpedance amplifier and a 16-bit ADC, and drives the mass-filter scan with a buffered 12-bit DAC. The picoamp input is surrounded by a guard ring so leakage does not drown the signal.",
    "work.10.p2": "Both the schematic and the layout are generated from Python, including a small grid router, so every revision rebuilds from scratch and has to pass the electrical and design-rule checks plus a custom leakage check before it counts.",

    "work.11.title": "A simpler, hand-solderable DAQ shield",
    "work.11.meta": "PCB DESIGN, 2026   SIGNAL: 10 nA to 1 µA   BUDGET: about 20 parts, under 30 dollars   ASSEMBLY: by hand",
    "work.11.p1": "The version our team is actually building: the ADC and DAC breakout boards from class plug in, and the board adds an on-board detector preamp, a precision 2.5 V reference and reverse-polarity protection.",
    "work.11.p2": "It went through ten revisions, each driven by a datasheet check or an independent design review, while staying something a student can order and solder by hand.",

    "work.6.title": "Imaging labs",
    "work.6.meta": "MSc LABS, 2026   AREAS: CT, ultrasound, mass spectrometry, MRI",
    "work.6.p1": "I measured CT image quality on a test phantom, built ultrasound phantoms to create artefacts on purpose, classified tissue from surgical smoke with mass spectrometry, and reconstructed MRI images from raw k-space data.",

    "work.7.title": "ANUMA, choosing where to land on the Moon",
    "work.7.meta": "STATUS: finalist, space innovation challenge 2026   STACK: Python, FastAPI, rasterio, Leaflet   DATA: orbital terrain maps",
    "work.7.p1": "ANUMA is a decision-support tool for picking landing sites near the lunar south pole. It turns orbital terrain data into a score map that weighs landing safety against what a mission needs, such as sunlight and access to its science targets.",
    "work.7.p2": "It started as a small prototype for a single crater-rim site and is now being rebuilt as an offline tool that runs from a laptop: a scoring engine, an API and a map interface. The project reached the final of a space innovation challenge in 2026.",

    "work.8.title": "SortSight, a low-cost fibre scanner for textile sorting",
    "work.8.meta": "STAGE: Brightlands Startup Challenge 2026   METHOD: near-infrared spectroscopy, camera, on-device ML",
    "work.8.p1": "For the Brightlands Startup Challenge I am developing SortSight, a table-top scan box that tells what a piece of clothing is made of (cotton, polyester, wool, blends), so small collection points can sort textiles for recycling.",
    "work.8.p2": "The feasibility work was the interesting part: the fibre bands sit between about 1200 and 1700 nm, beyond what silicon sensors can see. Instead of a full spectrometer, the design uses an InGaAs photodiode with a set of short-wave infrared LEDs, to reach a price small sorters can afford.",

    "work.doc.schematic": "Schematic (PDF)",
    "work.10.img.alt": "Rendered top view of a green printed circuit board shaped to plug onto a microcontroller board, with screw terminals and small surface-mount parts",
    "work.10.img.cap": "FIG. Board render, top side. Schematic and layout both generated from code.",
    "work.11.img.alt": "Rendered top view of a green shield board with outlines where two breakout boards plug in, a BNC connector for the detector and a small preamp section",
    "work.11.img.cap": "FIG. The hand-solderable shield, top side.",
    "work.6.img.alt": "Four panels: a synthetic head phantom, its k-space magnitude, the image rebuilt from the centre lines only, and from the outer lines only",
    "work.6.img.cap": "FIG. MRI from raw k-space: the centre lines carry the contrast, the outer lines carry the edges.",
    "work.7.img.alt": "Map of the lunar south pole coloured by landing-site suitability, with numbered candidate sites",
    "work.7.img.cap": "FIG. Prototype score map of the lunar south pole with ranked candidate sites.",
    "work.8.img.alt": "Concept illustration of a table-top scan box with a camera arm, an onboard computer and a ring of infrared LEDs around one sensor",
    "work.8.img.cap": "FIG. Concept design of the scan box and its infrared scan head.",
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


    "about.plate": "PLATE 03 / ABOUT",
    "about.title": "About",
    "about.p1": "I am a Luxembourgish engineer and scientist doing an MSc in Imaging Engineering at Maastricht University, with a focus on data and AI and on instrumentation, after a BSc in Physics and Mathematics at University College Maastricht. Alongside my studies I am a selected participant in the AI Academy at the Digital Learning Hub in Luxembourg.",
    "about.p2": "I like problems that need both careful maths and something built with my hands, and I do my best work in iterative, experimental places like makerspaces and labs.",
    "about.langs": "LANGUAGES: LUXEMBOURGISH (NATIVE), FRENCH, GERMAN, ENGLISH, SPANISH, ITALIAN",
    "about.tv.a": "Fun fact: I was on TV. I competed in season one of Take Off, Luxembourg's national science challenge show on RTL. ",
    "about.tv.link": "Here is my interview",
    "exp.plate": "PLATE 04 / EXPERIENCE & EDUCATION",
    "exp.title.a": "Experience and",
    "exp.title.b": "education",
    "exp.experience": "EXPERIENCE",
    "exp.education": "EDUCATION",
    "exp.cert": "CERTIFICATIONS & RECOGNITION",
    "exp.present": "PRESENT",

    "exp.e1.date": "MAY 2026 — OCT 2026",
    "exp.e1.title": "STEM Workshop Facilitator",
    "exp.e1.org": "Ingenieurs et Scientifiques du Luxembourg",
    "exp.e1.note": "Hands on science and engineering workshops for children aged 8 to 12 across Luxembourg, covering electronics, mechanics, and pneumatics.",
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

    "exp.ed1.date": "SEP 2026 — PRESENT",
    "exp.ed1.title": "MSc Imaging Engineering, Data & AI and Instrumentation",
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
    "contact.lede": "Open to research, imaging and engineering collaboration. Email is the quickest way to reach me.",
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
    "mast.kicker.1": "MASTER INGÉNIERIE D'IMAGERIE",
    "mast.kicker.2": "IMAGERIE MOLÉCULAIRE",
    "mast.kicker.3": "INSTRUMENTATION & MATÉRIEL",
    "mast.kicker.4": "LUXEMBOURG",
    "mast.intro": "Je suis étudiante en master d'ingénierie d'imagerie. Je travaille au plus près des données et du matériel, en construisant de petits dispositifs pour comprendre comment une image est captée, traitée, et où elle se brise. Voici un extrait de mon mémoire de licence avec lequel vous pouvez jouer.",
    "mast.available": "Ouverte aux collaborations de recherche",

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

    "work.0.title": "Détecter le HPV dans la peau par imagerie moléculaire",
    "work.0.meta": "STATUT : en démarrage, 2026   MÉTHODE : imagerie par spectrométrie de masse, segmentation, classification SVM   ÉCHANTILLONS : coupes de tissu cutané",
    "work.0.p1": "Mon prochain projet cherche à savoir si une infection au HPV laisse une empreinte chimique dans le tissu cutané qu'un modèle peut apprendre à reconnaître, sans coloration.",
    "work.0.p2": "Le plan : imager de fines coupes de tissu par spectrométrie de masse, pour que chaque pixel contienne un spectre de masse complet. Ensuite nettoyer les données (sélection des pics, normalisation, réduction du bruit), segmenter le tissu en régions, et entraîner une machine à vecteurs de support à séparer les zones infectées des zones saines.",
    "work.0.p3": "Comme dans mon travail de licence, le plus difficile est d'être honnête sur le résultat : valider par rapport à la pathologie établie, tester sur des échantillons que le modèle n'a jamais vus, et vérifier quels signaux moléculaires guident réellement chaque décision.",

    "work.9.title": "Une ligne de spectromètre de masse, construite en classe",
    "work.9.meta": "LABO DE MASTER, 2026   SYSTÈME : source électrospray, vide, optique ionique, filtre de masse quadripolaire, détecteur   MA PARTIE : acquisition de données",
    "work.9.p1": "En laboratoire, notre classe met en marche un spectromètre de masse quadripolaire à électrospray, équipe par équipe : vide, source d'ions, optique ionique, filtre de masse, détecteur et lecture.",
    "work.9.p2": "Mon équipe est responsable de l'acquisition : lire le minuscule courant du détecteur, piloter le balayage en masse et amener les spectres de l'instrument jusqu'à un ordinateur. C'est là que le travail de toutes les autres équipes apparaît sous forme de pic, ou pas.",

    "work.10.title": "Carte d'acquisition électromètre pour la ligne",
    "work.10.meta": "CONCEPTION DE PCB, 2026   SIGNAL : picoampères à microampères   COMPOSANTS : amplificateur transimpédance, ADC 16 bits, DAC 12 bits   OUTILS : KiCad, Python",
    "work.10.p1": "Une carte d'extension pour une carte microcontrôleur standard, qui mesure le courant du détecteur avec un amplificateur transimpédance et un ADC 16 bits, et pilote le balayage du filtre de masse avec un DAC 12 bits tamponné. L'entrée picoampère est entourée d'un anneau de garde pour que les fuites ne noient pas le signal.",
    "work.10.p2": "Le schéma et le routage sont tous deux générés en Python, y compris un petit routeur sur grille, de sorte que chaque révision est reconstruite de zéro et doit passer les contrôles électriques, les règles de conception et un contrôle de fuite sur mesure.",

    "work.11.title": "Une carte d'acquisition plus simple, soudable à la main",
    "work.11.meta": "CONCEPTION DE PCB, 2026   SIGNAL : 10 nA à 1 µA   BUDGET : environ 20 composants, moins de 30 dollars   ASSEMBLAGE : à la main",
    "work.11.p1": "La version que notre équipe construit réellement : les modules ADC et DAC du cours s'y enfichent, et la carte ajoute un préamplificateur de détecteur, une référence de précision de 2,5 V et une protection contre l'inversion de polarité.",
    "work.11.p2": "Elle a connu dix révisions, chacune guidée par une vérification des fiches techniques ou une revue de conception indépendante, tout en restant commandable et soudable à la main par un étudiant.",

    "work.6.title": "Laboratoires d'imagerie",
    "work.6.meta": "LABOS DE MASTER, 2026   DOMAINES : CT, échographie, spectrométrie de masse, IRM",
    "work.6.p1": "J'ai mesuré la qualité d'image CT sur un fantôme de test, construit des fantômes d'échographie pour créer des artefacts exprès, classé des tissus à partir de la fumée chirurgicale par spectrométrie de masse, et reconstruit des images IRM à partir de données brutes de l'espace k.",

    "work.7.title": "ANUMA, choisir où se poser sur la Lune",
    "work.7.meta": "STATUT : finaliste, challenge d'innovation spatiale 2026   PILE : Python, FastAPI, rasterio, Leaflet   DONNÉES : cartes de terrain orbitales",
    "work.7.p1": "ANUMA est un outil d'aide à la décision pour choisir des sites d'atterrissage près du pôle sud lunaire. Il transforme des données de terrain orbitales en une carte de scores qui met en balance la sécurité de l'atterrissage et les besoins de la mission, comme l'ensoleillement et l'accès aux cibles scientifiques.",
    "work.7.p2": "Il a commencé comme un petit prototype pour un seul site sur le bord d'un cratère et il est maintenant reconstruit comme un outil hors ligne qui tourne sur un ordinateur portable : un moteur de scores, une API et une interface cartographique. Le projet a atteint la finale d'un challenge d'innovation spatiale en 2026.",

    "work.8.title": "SortSight, un scanner de fibres à bas coût pour le tri textile",
    "work.8.meta": "ÉTAPE : Brightlands Startup Challenge 2026   MÉTHODE : spectroscopie proche infrarouge, caméra, ML embarqué",
    "work.8.p1": "Pour le Brightlands Startup Challenge, je développe SortSight, un boîtier de scan de table qui identifie la composition d'un vêtement (coton, polyester, laine, mélanges), pour que les petits points de collecte puissent trier les textiles en vue du recyclage.",
    "work.8.p2": "L'étude de faisabilité était la partie intéressante : les bandes des fibres se situent entre environ 1200 et 1700 nm, au-delà de ce que voient les capteurs en silicium. Au lieu d'un spectromètre complet, le design utilise une photodiode InGaAs avec un ensemble de LED infrarouges à ondes courtes, pour atteindre un prix abordable pour les petits trieurs.",

    "work.doc.schematic": "Schéma (PDF)",
    "work.10.img.alt": "Rendu vu de dessus d'un circuit imprimé vert prévu pour s'enficher sur une carte microcontrôleur, avec borniers à vis et petits composants montés en surface",
    "work.10.img.cap": "FIG. Rendu de la carte, face supérieure. Schéma et routage générés par code.",
    "work.11.img.alt": "Rendu vu de dessus d'une carte verte avec les contours de deux modules enfichables, un connecteur BNC pour le détecteur et une petite section préamplificateur",
    "work.11.img.cap": "FIG. La carte soudable à la main, face supérieure.",
    "work.6.img.alt": "Quatre panneaux : un fantôme de tête synthétique, la magnitude de son espace k, l'image reconstruite à partir des seules lignes centrales, puis des seules lignes extérieures",
    "work.6.img.cap": "FIG. IRM à partir de l'espace k brut : les lignes centrales portent le contraste, les lignes extérieures les contours.",
    "work.7.img.alt": "Carte du pôle sud lunaire colorée selon l'aptitude à l'atterrissage, avec des sites candidats numérotés",
    "work.7.img.cap": "FIG. Carte de scores du prototype au pôle sud lunaire, avec les sites candidats classés.",
    "work.8.img.alt": "Illustration conceptuelle d'un boîtier de scan de table avec un bras caméra, un ordinateur embarqué et un anneau de LED infrarouges autour d'un capteur",
    "work.8.img.cap": "FIG. Design conceptuel du boîtier et de sa tête de scan infrarouge.",
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


    "about.plate": "PLANCHE 03 / À PROPOS",
    "about.title": "À propos",
    "about.p1": "Je suis une ingénieure et scientifique luxembourgeoise en master d'Ingénierie d'Imagerie à l'Université de Maastricht, orientée données et IA ainsi qu'instrumentation, après une licence en Physique et Mathématiques à University College Maastricht. En parallèle, je suis participante sélectionnée à l'AI Academy du Digital Learning Hub au Luxembourg.",
    "about.p2": "J'aime les problèmes qui demandent à la fois des maths rigoureuses et quelque chose à construire de mes mains, et je travaille mieux dans des lieux itératifs et expérimentaux comme les makerspaces et les laboratoires.",
    "about.langs": "LANGUES : LUXEMBOURGEOIS (NATIVE), FRANÇAIS, ALLEMAND, ANGLAIS, ESPAGNOL, ITALIEN",
    "about.tv.a": "Anecdote : je suis passée à la télé. J'ai participé à la première saison de Take Off, l'émission scientifique nationale du Luxembourg sur RTL. ",
    "about.tv.link": "Voici mon interview",
    "about.outside": "",

    "exp.plate": "PLANCHE 04 / PARCOURS & FORMATION",
    "exp.title.a": "Parcours et",
    "exp.title.b": "formation",
    "exp.experience": "EXPÉRIENCE",
    "exp.education": "FORMATION",
    "exp.cert": "CERTIFICATIONS & DISTINCTIONS",
    "exp.present": "PRÉSENT",

    "exp.e1.date": "MAI 2026 — OCT. 2026",
    "exp.e1.title": "Animatrice d'ateliers STEM",
    "exp.e1.org": "Ingénieurs et Scientifiques du Luxembourg",
    "exp.e1.note": "Ateliers de sciences et d'ingénierie pour enfants de 8 à 12 ans à travers le Luxembourg, en électronique, mécanique et pneumatique.",
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

    "exp.ed1.date": "SEPT. 2026 — PRÉSENT",
    "exp.ed1.title": "Master en Ingénierie d'Imagerie, Données & IA et Instrumentation",
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
    "contact.lede": "Ouverte aux collaborations en recherche, imagerie et ingénierie. Le courriel est le moyen le plus rapide de me joindre.",
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
