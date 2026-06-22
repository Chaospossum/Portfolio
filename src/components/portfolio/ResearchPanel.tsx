import { useEffect, useMemo, useRef, useState } from "react";
import portraitUrl from "@/assets/portrait.png";
import { ACCENTS, Plate } from "./lab";
import { useT } from "./i18n";

type Degradation = "Blur" | "Noise" | "Compression" | "Lighting";
type Training = "Single-type training" | "Mixed augmentation";

const TYPES: Degradation[] = ["Blur", "Noise", "Compression", "Lighting"];

const DEG_COLOR: Record<Degradation, string> = {
  Blur: ACCENTS.blue,
  Noise: ACCENTS.vermillion,
  Compression: ACCENTS.orange,
  Lighting: ACCENTS.purple,
};

function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

function confidenceFor(deg: Degradation, severity: number, training: Training) {
  const s = severity;
  if (training === "Mixed augmentation") {
    const top = 92;
    const floor = deg === "Blur" ? 60 : 63;
    return floor + (top - floor) * Math.pow(1 - s / 100, 1.4);
  }
  // Single-type training: sharp collapse
  if (deg === "Blur") {
    const top = 95;
    const bottom = 13;
    return bottom + (top - bottom) * (1 - sigmoid((s - 70) / 6));
  }
  const top = 95;
  const bottom = deg === "Noise" ? 19 : deg === "Compression" ? 24 : 22;
  return bottom + (top - bottom) * (1 - sigmoid((s - 65) / 8));
}

function useImage(src: string) {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  useEffect(() => {
    const i = new Image();
    i.crossOrigin = "anonymous";
    i.src = src;
    i.onload = () => setImg(i);
  }, [src]);
  return img;
}

export function ResearchPanel() {
  const t = useT();
  const DEG_LABEL: Record<Degradation, string> = {
    Blur: t("panel.deg.blur"),
    Noise: t("panel.deg.noise"),
    Compression: t("panel.deg.compression"),
    Lighting: t("panel.deg.lighting"),
  };
  const TRAIN_LABEL: Record<Training, string> = {
    "Single-type training": t("panel.training.single"),
    "Mixed augmentation": t("panel.training.mixed"),
  };
  const [degradation, setDegradation] = useState<Degradation>("Blur");
  const [severity, setSeverity] = useState(0);
  const [training, setTraining] = useState<Training>("Single-type training");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const img = useImage(portraitUrl);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c || !img) return;
    const W = 480;
    const H = 480;
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const s = severity / 100;

    ctx.save();
    ctx.clearRect(0, 0, W, H);

    // Compression: draw small then scale up
    if (degradation === "Compression") {
      const minScale = 1;
      const maxScale = 28;
      const k = Math.max(1, Math.round(minScale + s * (maxScale - minScale)));
      const lw = Math.max(4, Math.round(W / k));
      const lh = Math.max(4, Math.round(H / k));
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, 0, 0, lw, lh);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(c, 0, 0, lw, lh, 0, 0, W, H);
    } else {
      // Apply blur / lighting via canvas filter
      let filter = "none";
      if (degradation === "Blur") {
        filter = `blur(${(s * 14).toFixed(2)}px)`;
      } else if (degradation === "Lighting") {
        const b = 1 - s * 0.7;
        const con = 1 - s * 0.55;
        filter = `brightness(${b.toFixed(2)}) contrast(${con.toFixed(2)})`;
      }
      ctx.filter = filter;
      ctx.drawImage(img, 0, 0, W, H);
      ctx.filter = "none";
    }

    // Noise overlay
    if (degradation === "Noise" && s > 0) {
      const id = ctx.getImageData(0, 0, W, H);
      const data = id.data;
      const amp = 110 * s;
      for (let i = 0; i < data.length; i += 4) {
        const n = (Math.random() - 0.5) * amp;
        data[i] = Math.max(0, Math.min(255, data[i] + n));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + (Math.random() - 0.5) * amp));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + (Math.random() - 0.5) * amp));
      }
      ctx.putImageData(id, 0, 0);
    }

    ctx.restore();
  }, [img, degradation, severity, training]);

  const confidence = useMemo(
    () => confidenceFor(degradation, severity, training),
    [degradation, severity, training]
  );

  const conf = confidence.toFixed(1);
  const low = confidence < 50;
  const degColor = DEG_COLOR[degradation];
  const arcLen = 2 * Math.PI * 56;
  const arcOffset = arcLen * (1 - confidence / 100);

  return (
    <section className="border-b border-rule" aria-labelledby="panel-heading">
      <div className="mx-auto max-w-[960px] px-5 py-12 sm:px-8 sm:py-16">
        <h2 id="panel-heading" className="sr-only">
          Interactive thesis demo
        </h2>
        <Plate number="01" label={t("panel.plate")} accent="blue" caption={t("panel.caption")} />
        <p className="mt-3 font-body text-base text-ink">{t("panel.lede")}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Image */}
            <div
              className="self-start border-2 bg-paper transition-colors duration-300"
              style={{ borderColor: degColor }}
            >
              <canvas
                ref={canvasRef}
                className="block aspect-square w-full"
                aria-label="Sample image with the selected degradation applied"
              />
              <div
                className="flex items-center justify-between border-t px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-ink"
                style={{ borderColor: degColor }}
              >
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="inline-block h-[6px] w-[6px] rounded-full"
                    style={{ background: degColor }}
                  />
                  {t("panel.sample")}
                </span>
                <span>{DEG_LABEL[degradation].toUpperCase()} · S={severity.toString().padStart(3, "0")}</span>
              </div>
              <p className="px-3 pb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-ink">
                {t("panel.thisisme")}
              </p>
            </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Controls */}
            <div className="border border-rule p-5">
              <fieldset>
                <legend className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-ink">
                  {t("panel.degradation")}
                </legend>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {TYPES.map((t) => {
                    const active = t === degradation;
                    const c = DEG_COLOR[t];
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setDegradation(t)}
                        aria-pressed={active}
                        className={`flex items-center gap-2 border px-3 py-2 text-left font-mono text-xs uppercase tracking-[0.12em] focus-visible:outline-2 focus-visible:outline-okabe-blue ${
                          active
                            ? "border-ink bg-ink text-paper"
                            : "border-rule bg-paper text-ink hover:border-ink"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className="inline-block h-[6px] w-[6px] rounded-full"
                          style={{ background: c }}
                        />
                        {DEG_LABEL[t]}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-6">
                <label
                  htmlFor="severity"
                  className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-ink"
                >
                  <span>{t("panel.severity")}</span>
                  <span className="text-ink">{severity}</span>
                </label>
                <input
                  id="severity"
                  type="range"
                  min={0}
                  max={100}
                  value={severity}
                  onChange={(e) => setSeverity(Number(e.target.value))}
                  className="mt-2 w-full accent-[var(--color-okabe-blue)]"
                />
              </div>

              <fieldset className="mt-6">
                <legend className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-ink">
                  {t("panel.training")}
                </legend>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  {(["Single-type training", "Mixed augmentation"] as Training[]).map((opt) => {
                    const active = opt === training;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setTraining(opt)}
                        aria-pressed={active}
                        className={`flex-1 border px-3 py-2 text-left font-mono text-xs uppercase tracking-[0.12em] focus-visible:outline-2 focus-visible:outline-okabe-blue ${
                          active
                            ? "border-ink bg-ink text-paper"
                            : "border-rule bg-paper text-ink hover:border-ink"
                        }`}
                      >
                        {TRAIN_LABEL[opt]}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </div>

            {/* Readout with confidence arc */}
            <div className="border border-rule bg-paper">
              <div className="flex items-center justify-between border-b border-rule px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-ink">
                <span>{t("panel.readout")}</span>
                <span className="text-okabe-green">{t("panel.live")}</span>
              </div>

              {/* Confidence arc */}
              <div className="flex items-center gap-5 border-b border-rule px-4 py-4">
                <svg
                  viewBox="0 0 140 140"
                  className="h-[120px] w-[120px] shrink-0"
                  aria-hidden="true"
                >
                  <circle
                    cx="70"
                    cy="70"
                    r="56"
                    fill="none"
                    stroke="var(--color-rule)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r="56"
                    fill="none"
                    stroke={low ? ACCENTS.vermillion : degColor}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={arcLen}
                    strokeDashoffset={arcOffset}
                    transform="rotate(-90 70 70)"
                    style={{ transition: "stroke-dashoffset 320ms ease-out, stroke 200ms" }}
                  />
                  <text
                    x="70"
                    y="76"
                    textAnchor="middle"
                    className="font-mono"
                    style={{
                      fontSize: "22px",
                      fontWeight: 700,
                      fill: low ? ACCENTS.vermillion : "var(--color-ink)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {conf}
                  </text>
                  <text
                    x="70"
                    y="94"
                    textAnchor="middle"
                    style={{
                      fontSize: "9px",
                      fill: "var(--color-muted-ink)",
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.18em",
                    }}
                  >
                    {t("panel.percent")}
                  </text>
                </svg>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-ink">
                  <div>{t("panel.predicted")}</div>
                  <div>{t("panel.confidence")}</div>
                  <div className="mt-2 text-ink">
                    {low ? t("panel.collapse") : confidence > 80 ? t("panel.stable") : t("panel.degraded")}
                  </div>
                </div>
              </div>

              <dl className="divide-y divide-[color:var(--color-rule)] font-mono text-xs">
                {[
                  [t("panel.field.model"), "ResNet-18"],
                  [t("panel.field.degradation"), DEG_LABEL[degradation]],
                  [t("panel.field.severity"), String(severity)],
                  [t("panel.field.training"), TRAIN_LABEL[training]],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between px-4 py-2.5">
                    <dt className="text-muted-ink">{k}</dt>
                    <dd className="text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="font-body text-xs text-muted-ink">{t("panel.note")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}