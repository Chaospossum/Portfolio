/*
 * Illustrations drawn in code, in the idiom of 1960s–70s scientific print:
 * flat inks, halftone dots, orbit diagrams, technical linework.
 * Everything uses two inks: `var(--ink)` and `var(--signal)`.
 */

type P = { className?: string };

/* Lit halftone disc: dot radius grows away from the light, which comes
   from the upper-left. Deterministic, so SSR and client agree. */
function halftoneDots(R: number, step: number, light: [number, number]) {
  const dots: { x: number; y: number; r: number }[] = [];
  for (let y = -R; y <= R; y += step) {
    for (let x = -R; x <= R; x += step) {
      if (x * x + y * y > R * R) continue;
      const dx = (x - light[0]) / (2 * R);
      const dy = (y - light[1]) / (2 * R);
      const d = Math.min(1, Math.sqrt(dx * dx + dy * dy) * 1.25);
      const r = step * (0.06 + 0.5 * d);
      if (r > 0.6) dots.push({ x, y, r });
    }
  }
  return dots;
}

/* The satellite's orbit, as an explicit path so CSS offset-path can follow it. */
function ellipsePath(rx: number, ry: number, deg: number, n = 72) {
  const th = (deg * Math.PI) / 180;
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const x = rx * Math.cos(a);
    const y = ry * Math.sin(a);
    pts.push([x * Math.cos(th) - y * Math.sin(th), x * Math.sin(th) + y * Math.cos(th)]);
  }
  return { d: pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ") + " Z", start: pts[0] };
}
const ORBIT = ellipsePath(212, 64, -22);
const ORBIT_PATH = ORBIT.d;
const ORBIT_START = ORBIT.start;

/** Big planet with a halftone shadow, one ink orbit, a satellite. */
export function HalftoneSun({ className = "" }: P) {
  const R = 150;
  const dots = halftoneDots(R, 9, [-R * 0.85, -R * 0.9]);
  return (
    <svg viewBox="-230 -210 460 420" className={className} aria-hidden="true">
      <defs>
        <clipPath id="hs-clip">
          <circle r={R} />
        </clipPath>
      </defs>
      {/* corner stars: thin crosses, a 1970s poster habit */}
      <g stroke="var(--ink)" strokeWidth="1.2">
        <path d="M-205 -160 v14 M-212 -153 h14" />
        <path d="M190 150 v12 M184 156 h12" />
        <path d="M200 -120 v10 M195 -115 h10" />
      </g>
      {/* planet body: flat signal ink */}
      <circle r={R} fill="var(--signal)" />
      {/* halftone shadow in ink over the orange */}
      <g clipPath="url(#hs-clip)" fill="var(--ink)">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} />
        ))}
      </g>
      {/* orbit: tilted ellipse passing behind, then in front */}
      <g fill="none" stroke="var(--ink)" strokeWidth="2">
        <ellipse rx="212" ry="64" transform="rotate(-22)" strokeDasharray="0 0" />
      </g>
      <circle
        cx={ORBIT_START[0]}
        cy={ORBIT_START[1]}
        r="7"
        fill="var(--paper)"
        stroke="var(--ink)"
        strokeWidth="2"
        className="orbit-anim"
        style={{ offsetPath: `path("${ORBIT_PATH}")` }}
      />
      {/* the horizon line and a small moon */}
      <circle cx="178" cy="-96" r="14" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
      <circle cx="178" cy="-96" r="5" fill="var(--ink)" />
    </svg>
  );
}

/** Ruler strip: ticks every unit, numerals every ten. */
export function Ruler({ className = "", units = 60 }: P & { units?: number }) {
  const w = units * 10;
  return (
    <svg
      viewBox={`0 0 ${w} 22`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      style={{ width: "100%", height: "22px", display: "block" }}
    >
      <g stroke="var(--ink)" strokeWidth="1" shapeRendering="crispEdges">
        <line x1="0" y1="21.5" x2={w} y2="21.5" />
        {Array.from({ length: units + 1 }, (_, i) => (
          <line key={i} x1={i * 10 + 0.5} y1={i % 10 === 0 ? 4 : i % 5 === 0 ? 11 : 16} x2={i * 10 + 0.5} y2="22" />
        ))}
      </g>
    </svg>
  );
}

/** Orbit diagram: three nested ellipses with nodes, one filled planet. */
export function OrbitDiagram({ className = "" }: P) {
  return (
    <svg viewBox="-160 -110 320 220" className={className} aria-hidden="true">
      <g fill="none" stroke="var(--ink)" strokeWidth="1.5">
        <ellipse rx="150" ry="58" />
        <ellipse rx="110" ry="40" />
        <ellipse rx="66" ry="22" />
        <line x1="-158" y1="0" x2="158" y2="0" strokeDasharray="3 5" />
      </g>
      <circle r="13" fill="var(--signal)" stroke="var(--ink)" strokeWidth="1.5" />
      <g fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5">
        <circle cx="-150" cy="0" r="4" />
        <circle cx="62" cy="-37" r="4" />
        <circle cx="-40" cy="20" r="4" />
      </g>
      <circle cx="110" cy="0" r="5" fill="var(--ink)" />
    </svg>
  );
}

/** Quadrupole mass filter: four rods, an oscillating ion path, a detector. */
export function IonPath({ className = "" }: P) {
  // sine path with growing amplitude, then captured by the detector
  const pts: string[] = [];
  for (let i = 0; i <= 100; i++) {
    const x = -140 + i * 2.6;
    const amp = 4 + i * 0.16;
    const y = Math.sin(i / 4.2) * amp;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const d = pts.join(" ");
  return (
    <svg viewBox="-170 -90 340 180" className={className} aria-hidden="true">
      {/* rods: two pairs drawn as long capsules */}
      <g fill="none" stroke="var(--ink)" strokeWidth="2">
        <rect x="-140" y="-56" width="260" height="14" rx="7" />
        <rect x="-140" y="42" width="260" height="14" rx="7" />
      </g>
      <g fill="var(--ink)">
        <rect x="-140" y="-30" width="260" height="6" rx="3" />
        <rect x="-140" y="24" width="260" height="6" rx="3" />
      </g>
      {/* ion source */}
      <circle cx="-156" cy="0" r="9" fill="var(--signal)" stroke="var(--ink)" strokeWidth="2" />
      {/* ion trajectory */}
      <path d={d} fill="none" stroke="var(--signal)" strokeWidth="2.5" />
      <circle cx="-140" cy="0" r="4" fill="var(--ink)" className="ion" style={{ offsetPath: `path("${d}")` }} />
      {/* detector plate */}
      <path d="M138 -40 v80 h14 v-80 z" fill="var(--ink)" />
      <path d="M152 -14 h12 M152 0 h12 M152 14 h12" stroke="var(--ink)" strokeWidth="2" />
      {/* dimension line */}
      <g stroke="var(--ink)" strokeWidth="1" fill="none">
        <path d="M-140 72 v8 M120 72 v8 M-140 76 h260" />
      </g>
    </svg>
  );
}

/** Optics: biconvex lens with rays converging to a focus; photons ride the rays. */
export function LensRays({ className = "" }: P) {
  const rays = [-44, -28, -12, 12, 28, 44];
  const ray = (y: number) => `M-150 ${y} L-2 ${y} L96 0`;
  return (
    <svg viewBox="-150 -70 300 140" className={className} aria-hidden="true">
      <g stroke="var(--ink)" strokeWidth="1.5" fill="none">
        <line x1="-150" y1="0" x2="150" y2="0" strokeDasharray="3 5" />
        {rays.map((y) => (
          <path key={y} d={ray(y)} />
        ))}
        <path d="M-150 0 L96 0" />
      </g>
      <path d="M0 -62 C 22 -40, 22 40, 0 62 C -22 40, -22 -40, 0 -62 z" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
      <circle cx="96" cy="0" r="5" fill="var(--signal)" />
      {rays.map((y, i) => (
        <circle
          key={`p${y}`}
          cx="-150"
          cy={y}
          r="3"
          fill="var(--signal)"
          className="photon"
          style={{ offsetPath: `path("${ray(y)}")`, animationDelay: `${-i * 0.9}s` }}
        />
      ))}
      <g stroke="var(--ink)" strokeWidth="1" fill="none">
        <path d="M0 68 v6 M96 68 v6 M0 71 h96" />
      </g>
    </svg>
  );
}

/** Technical drawing of a shield board: outline, header rows, BNC, holes. */
export function BoardDrawing({ className = "" }: P) {
  const pins = (x: number, y: number, n: number, dx: number) =>
    Array.from({ length: n }, (_, i) => <circle key={i} cx={x + i * dx} cy={y} r="2.6" />);
  return (
    <svg viewBox="-10 -10 260 200" className={className} aria-hidden="true">
      <g fill="none" stroke="var(--ink)" strokeWidth="2">
        <path d="M0 0 H228 V34 L240 46 V178 H0 z" />
      </g>
      <g fill="none" stroke="var(--ink)" strokeWidth="1.5">
        {pins(60, 12, 10, 9)}
        {pins(158, 12, 8, 9)}
        {pins(48, 166, 6, 9)}
        {pins(128, 166, 8, 9)}
        <rect x="40" y="70" width="96" height="60" />
        <rect x="156" y="56" width="52" height="60" />
        <circle cx="206" cy="36" r="13" />
        <circle cx="206" cy="36" r="4" />
        <circle cx="18" cy="150" r="5" />
        <circle cx="222" cy="150" r="5" />
        <rect x="52" y="34" width="22" height="10" />
        <rect x="104" y="30" width="16" height="16" />
      </g>
      <g fill="var(--signal)">
        <rect x="6" y="80" width="14" height="28" />
        <rect x="214" y="120" width="14" height="28" />
      </g>
      {/* dimension lines */}
      <g stroke="var(--ink)" strokeWidth="1" fill="none">
        <path d="M0 -8 v6 M240 -8 v6 M0 -5 h240" />
        <path d="M248 0 h6 M248 178 h6 M251 0 v178" />
      </g>
    </svg>
  );
}

/** Signal line: a sine that degrades into noise and recovers, scrolling slowly. */
export function Waveform({ className = "" }: P) {
  const N = 160; // samples per period (320 units)
  let seed = 7;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280 - 0.5;
  };
  const period: number[] = [];
  for (let i = 0; i < N; i++) {
    const env = Math.sin((Math.PI * i) / N) ** 2; // zero at both ends, so the loop is seamless
    period.push(Math.sin(i / 6.366) * 22 + env * 28 * rnd());
  }
  const pts: string[] = [];
  for (let i = 0; i <= 2 * N; i++) {
    pts.push(`${i === 0 ? "M" : "L"}${i * 2},${period[i % N].toFixed(1)}`);
  }
  return (
    <svg viewBox="-6 -48 332 96" className={className} aria-hidden="true">
      <defs>
        <clipPath id="wave-clip">
          <rect x="0" y="-48" width="320" height="96" />
        </clipPath>
      </defs>
      <g stroke="var(--ink)" strokeWidth="1" fill="none">
        <line x1="0" y1="0" x2="320" y2="0" strokeDasharray="3 5" />
        <line x1="0" y1="-40" x2="0" y2="40" />
        <line x1="160" y1="-40" x2="160" y2="40" strokeDasharray="3 5" />
      </g>
      <g clipPath="url(#wave-clip)">
        <path d={pts.join(" ")} fill="none" stroke="var(--signal)" strokeWidth="2" className="wave-scroll" />
      </g>
    </svg>
  );
}

/** Airy disk: the diffraction pattern of a point of light, breathing slowly. */
export function AiryDisk({ className = "" }: P) {
  const rings = [
    { r: 26, w: 7, o: 0.55 },
    { r: 42, w: 4, o: 0.35 },
    { r: 56, w: 3, o: 0.22 },
    { r: 69, w: 2, o: 0.14 },
  ];
  return (
    <svg viewBox="-80 -80 160 160" className={className} aria-hidden="true">
      <g className="breathe">
        <circle r="13" fill="var(--signal)" />
        {rings.map((k) => (
          <circle key={k.r} r={k.r} fill="none" stroke="var(--signal)" strokeWidth={k.w} opacity={k.o} />
        ))}
      </g>
      <g stroke="var(--ink)" strokeWidth="1" fill="none">
        <path d="M-78 0 h10 M68 0 h10 M0 -78 v10 M0 68 v10" />
      </g>
    </svg>
  );
}

/* Rose curve r = cos(k·θ) sampled into a polyline, plus its length for stroke-drawing. */
function rose(k: number, R: number, n = 720) {
  const pts: [number, number][] = [];
  const turns = k % 2 === 0 ? 2 : 1;
  for (let i = 0; i <= n; i++) {
    const th = (i / n) * Math.PI * turns;
    const r = R * Math.cos(k * th);
    pts.push([r * Math.cos(th), r * Math.sin(th)]);
  }
  let len = 0;
  for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  return { d: pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" "), len };
}

/** Botanical ornament from maths: a rose curve in fine blush linework. */
export function RoseCurve({ className = "", k = 5, draw = false }: P & { k?: number; draw?: boolean }) {
  const { d, len } = rose(k, 70);
  return (
    <svg viewBox="-76 -76 152 152" className={className} aria-hidden="true">
      <path
        d={d}
        fill="none"
        stroke="var(--blush)"
        strokeWidth="1.2"
        className={draw ? "draw-in" : undefined}
        style={draw ? { strokeDasharray: len, ["--len" as string]: len } : undefined}
      />
      <circle r="2.5" fill="var(--blush)" />
    </svg>
  );
}

/** Small Lissajous flower, used as a bullet. */
export function Lissajous({ className = "", a = 3, b = 2 }: P & { a?: number; b?: number }) {
  const pts: string[] = [];
  for (let i = 0; i <= 400; i++) {
    const t = (i / 400) * Math.PI * 2;
    pts.push(`${i ? "L" : "M"}${(9 * Math.sin(a * t + Math.PI / 2)).toFixed(2)} ${(9 * Math.sin(b * t)).toFixed(2)}`);
  }
  return (
    <svg viewBox="-11 -11 22 22" className={className} aria-hidden="true">
      <path d={pts.join(" ")} fill="none" stroke="var(--blush)" strokeWidth="0.9" />
    </svg>
  );
}

/** A soft hairline arc, to breathe between hard rules. */
export function SoftArc({ className = "" }: P) {
  return (
    <svg viewBox="0 0 400 24" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d="M0 22 C 120 -6, 280 -6, 400 22" fill="none" stroke="var(--blush)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Pressure mat: a square with four load cells and a centre-of-pressure mark. */
export function MatDiagram({ className = "" }: P) {
  return (
    <svg viewBox="-10 -10 220 160" className={className} aria-hidden="true">
      <rect x="0" y="0" width="200" height="140" fill="none" stroke="var(--ink)" strokeWidth="2" />
      <g stroke="var(--ink)" strokeWidth="1" fill="none">
        {[40, 80, 120, 160].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="140" strokeDasharray="2 4" />
        ))}
        {[35, 70, 105].map((y) => (
          <line key={y} x1="0" y1={y} x2="200" y2={y} strokeDasharray="2 4" />
        ))}
      </g>
      <g fill="var(--paper)" stroke="var(--ink)" strokeWidth="2">
        <circle cx="16" cy="16" r="8" />
        <circle cx="184" cy="16" r="8" />
        <circle cx="16" cy="124" r="8" />
        <circle cx="184" cy="124" r="8" />
      </g>
      <g stroke="var(--signal)" strokeWidth="2.5" fill="none">
        <circle cx="118" cy="62" r="10" />
        <path d="M118 44 v36 M100 62 h36" />
      </g>
    </svg>
  );
}

/** Registration mark, used once in the footer. */
export function RegMark({ className = "" }: P) {
  return (
    <svg viewBox="-12 -12 24 24" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle r="7" />
        <path d="M-11 0 h22 M0 -11 v22" />
      </g>
    </svg>
  );
}

/** Half-filled disc: the theme switch glyph. */
export function HalfDisc({ className = "", filled }: P & { filled: boolean }) {
  return (
    <svg viewBox="-10 -10 20 20" className={className} aria-hidden="true">
      <circle r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d={filled ? "M0 -8 A8 8 0 0 1 0 8 z" : "M0 -8 A8 8 0 0 0 0 8 z"} fill="currentColor" />
    </svg>
  );
}
